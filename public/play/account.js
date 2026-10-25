// Authentication/transport only. Rust owns progress types, diffs, and merges.
export function acceptsBridge(event, parent, origin, nonce) {
  return origin !== "null" && event.source === parent && event.origin === origin
    && event.data?.type === "bbt:token" && event.data.nonce === nonce;
}

export class Account {
  constructor(config, { request = (...args) => globalThis.fetch(...args), host = globalThis.window } = {}) {
    if (config.version !== 1 || new URL(config.endpoint).protocol !== "https:" || !config.project
      || !Array.isArray(config.parentOrigins) || !Array.isArray(config.callbacks)) throw new Error("Invalid account configuration");
    this.config = config;
    this.request = request;
    this.host = host;
    this.uid = null;
    this.jwt = null;
    this.generation = 0;
    this.expires = 0;
    this.sessionKey = `bbt-session-${config.project}`;
    this.boundUid = null;
    this.bridgeNonce = null;
    this.parentUid = null;
    this.awaitingCursor = null;
    this.beforeNavigate = async () => {};
    this.reportError = () => {};
    this.host?.addEventListener?.("message", async event => {
      const origin = this.parentOrigin();
      if (origin && event.source === this.host.parent && event.origin === origin
        && event.data?.type === "bbt:account-changed" && event.data.nonce === this.bridgeNonce) {
        this.clear();
        try { await this.beforeNavigate(); this.host.location.reload(); }
        catch (error) { this.reportError(error); }
      }
    });
  }

  async api(path, { method = "GET", body, jwt = false } = {}) {
    // Appwrite Web SDK's documented cookie transport, scoped to this game's origin.
    const cookies = jwt ? null : this.host?.localStorage?.getItem(this.sessionKey);
    const response = await this.request(`${this.config.endpoint}${path}`, {
      method, credentials: jwt ? "omit" : "include",
      headers: { "Content-Type": "application/json", "X-Appwrite-Project": this.config.project,
        ...(jwt ? { "X-Appwrite-JWT": this.jwt } : {}), ...(cookies ? { "X-Fallback-Cookies": cookies } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000),
    });
    const fallback = response.headers.get("X-Fallback-Cookies");
    if (!jwt && fallback) this.host?.localStorage?.setItem(this.sessionKey, fallback);
    const data = response.status === 204 ? {} : await response.json();
    if (!response.ok) { const error = new Error(data.message || `Sign-in failed (HTTP ${response.status})`); error.status = response.status; throw error; }
    return data;
  }

  clear() { this.generation++; this.jwt = null; this.uid = null; this.expires = 0; this.awaitingCursor = null; this.parentUid = null; }

  parentOrigin() {
    if (this.host.parent === this.host) return null;
    // The deployment selects one parent. Referrer policy is not an authentication channel.
    return this.config.parentOrigins.length === 1 ? this.config.parentOrigins[0] : null;
  }

  async bridge(origin) {
    const nonce = crypto.randomUUID();
    this.bridgeNonce = nonce;
    return new Promise((resolve, reject) => {
      const cleanup = () => { clearTimeout(timer); this.host.removeEventListener("message", receive); };
      const receive = event => {
        if (!acceptsBridge(event, this.host.parent, origin, nonce)) return;
        cleanup();
        if (event.data.error) reject(new Error("Sign in on the Tracker to use shared progress."));
        else if (event.data.jwt === null && event.data.owner_id === null) {
          this.parentUid = null;
          resolve(null);
        } else if (typeof event.data.jwt === "string" && event.data.jwt
          && typeof event.data.owner_id === "string" && event.data.owner_id.length > 0 && event.data.owner_id.length <= 128) {
          this.parentUid = event.data.owner_id;
          resolve(event.data.jwt);
        } else reject(new Error("The Tracker returned an invalid sign-in response."));
      };
      const timer = setTimeout(() => { cleanup(); reject(new Error("The Tracker did not answer. Open Account to retry.")); }, 10000);
      this.host.addEventListener("message", receive);
      this.host.parent.postMessage({ type: "bbt:request-token", nonce }, origin);
    });
  }

  async refresh() {
    const generation = this.generation;
    const origin = this.parentOrigin();
    const jwt = origin ? await this.bridge(origin) : (await this.api("/account/jwts", { method: "POST" })).jwt;
    if (generation !== this.generation) throw new Error("Account changed during sign-in");
    if (!jwt) { this.clear(); return null; }
    this.jwt = jwt;
    let user;
    try { user = await this.api("/account", { jwt: true }); }
    catch (error) { if (generation === this.generation) this.clear(); throw error; }
    if (generation !== this.generation) throw new Error("Account changed during sign-in");
    if (typeof user.$id !== "string" || !user.$id) { this.clear(); throw new Error("Your account identity could not be verified. Sign in again."); }
    if (origin && user.$id !== this.parentUid) { this.clear(); throw new Error("Your Tracker account changed. Reload to continue."); }
    if (this.boundUid && this.boundUid !== user.$id) { this.clear(); const error = new Error("Your account changed. Reload to continue."); error.code = "ACCOUNT_CHANGED"; throw error; }
    this.uid = user.$id;
    this.boundUid = user.$id;
    this.expires = Date.now() + 12 * 60 * 1000;
    if (origin) this.host.parent.postMessage({ type: "bbt:account-ready", nonce: this.bridgeNonce, owner_id: this.uid }, origin);
    return this.uid;
  }

  async restore() {
    const url = new URL(this.host.location.href);
    const userId = url.searchParams.get("userId");
    const secret = url.searchParams.get("secret");
    const state = url.searchParams.get("bbt_oauth_state");
    let linkingOwner = null;
    if (userId || secret) {
      // Clear the one-time secret before any network work or error UI.
      for (const key of ["userId", "secret", "expire", "bbt_oauth_state"]) url.searchParams.delete(key);
      this.host.history.replaceState(null, "", url.href);
      if (!userId || !secret || !state || state !== this.host.sessionStorage.getItem("bbt-oauth-pending")) throw new Error("Sign-in callback was not started on this device.");
      this.host.sessionStorage.removeItem("bbt-oauth-pending");
      linkingOwner = this.host.sessionStorage.getItem("bbt-oauth-owner");
      this.host.sessionStorage.removeItem("bbt-oauth-owner");
      await this.api("/account/sessions/token", { method: "POST", body: { userId, secret } });
      if (linkingOwner) this.boundUid = linkingOwner;
    }
    if (this.host.sessionStorage.getItem("bbt-guest-mode")) return null;
    try { return await this.refresh(); } catch (error) {
      if (linkingOwner && error.code === "ACCOUNT_CHANGED") {
        await this.api("/account/sessions/current", { method: "DELETE" });
        this.host.localStorage.removeItem(this.sessionKey);
        throw new Error("Discord returned a different account. Sign in to your original account to link it.");
      }
      if (error.status === 401) return null;
      throw error;
    }
  }

  async password(email, password, create = false) {
    this.clear();
    if (create) await this.api("/account", { method: "POST", body: { userId: "unique()", email, password } });
    await this.api("/account/sessions/email", { method: "POST", body: { email, password } });
    return this.refresh();
  }

  async discord() {
    const callback = new URL(this.host.location.pathname, this.host.location.origin).href;
    if (!this.config.callbacks.includes(callback)) throw new Error("Discord sign-in is not configured for this page yet.");
    await this.beforeNavigate();
    const nonce = crypto.randomUUID();
    this.host.sessionStorage.setItem("bbt-oauth-pending", nonce);
    if (this.uid) this.host.sessionStorage.setItem("bbt-oauth-owner", this.uid);
    else this.host.sessionStorage.removeItem("bbt-oauth-owner");
    this.host.sessionStorage.removeItem("bbt-guest-mode");
    const success = new URL(callback);
    success.searchParams.set("bbt_oauth_state", nonce);
    const params = new URLSearchParams({ project: this.config.project, success: success.href, failure: callback });
    this.host.location.assign(`${this.config.endpoint}/account/tokens/oauth2/discord?${params}`);
  }

  async logout() {
    await this.beforeNavigate();
    this.clear();
    if (this.parentOrigin()) this.host.sessionStorage.setItem("bbt-guest-mode", "1");
    else {
      await this.api("/account/sessions/current", { method: "DELETE" });
      this.host.localStorage.removeItem(this.sessionKey);
    }
  }

  async sync(input, owner) {
    if (this.waiting(input.after)) throw new Error("Progress is waiting for the next menu");
    if (!this.config.progressFunction) throw new Error("Account sync is not configured yet. Your progress stays on this device.");
    if (Date.now() >= this.expires) await this.refresh();
    if (!this.uid || !this.jwt) throw new Error("Sign in to sync progress");
    if (owner !== this.uid || owner !== this.boundUid) throw new Error("Progress belongs to a different account");
    const generation = this.generation;
    const capturedOwner = this.uid;
    let execution;
    try {
      execution = await this.api(`/functions/${encodeURIComponent(this.config.progressFunction)}/executions`, {
        method: "POST", jwt: true, body: { body: JSON.stringify(input), async: false, method: "POST", headers: { "x-bbt-account-jwt": this.jwt } },
      });
    } catch (error) { if (error.status === 401) this.clear(); throw error; }
    if (generation !== this.generation || capturedOwner !== this.uid) throw new Error("Account changed during sync");
    const page = JSON.parse(execution.responseBody);
    if (execution.responseStatusCode === 401) { this.clear(); throw new Error(page.error); }
    if (execution.responseStatusCode !== 200) throw new Error(page.error || "Progress sync failed");
    if (page.owner_id !== capturedOwner) throw new Error("Progress belongs to a different account");
    this.awaitingCursor = page.cursor;
    return page;
  }

  waiting(cursor) { return this.awaitingCursor !== null && cursor < this.awaitingCursor; }
}

export function bindAccountDialog(account) {
  const dialog = document.getElementById("account-dialog");
  const message = document.getElementById("account-message");
  const form = document.getElementById("account-form");
  account.reportError = error => { message.textContent = error.message; };
  let releaseGuard = false;
  const run = async action => {
    const buttons = [...dialog.querySelectorAll("button")];
    buttons.forEach(button => { button.disabled = true; });
    try { await action(); } catch (error) { message.textContent = error.message; }
    finally { buttons.forEach(button => { button.disabled = false; }); form.elements.password.value = ""; }
  };
  const open = () => {
    if (!message.textContent) message.textContent = account.uid ? "Signed in. Progress sync uses this account." : "Sign in to keep your progress across devices. Guest progress stays on this device.";
    form.hidden = Boolean(account.uid) || Boolean(account.parentOrigin());
    document.getElementById("account-logout").hidden = !account.uid;
    document.getElementById("account-logout").textContent = account.parentOrigin() ? "Play as guest on this device" : "Sign out";
    document.getElementById("account-tracker").hidden = !account.parentOrigin();
    document.getElementById("account-link-discord").hidden = !account.uid || Boolean(account.parentOrigin());
    dialog.showModal();
    globalThis.bbtAccountDialogOpen = true;
  };
  addEventListener("bbt-account-open", open);
  // Keep canvas input from receiving credentials or dialog navigation.
  for (const event of ["keydown", "keyup", "pointerdown", "pointerup"]) dialog.addEventListener(event, e => e.stopPropagation());
  dialog.addEventListener("close", () => { releaseGuard = true; document.getElementById("bbt-canvas").focus(); });
  document.getElementById("account-close").onclick = () => dialog.close();
  form.onsubmit = event => { event.preventDefault(); run(async () => { await account.beforeNavigate(); await account.password(form.elements.email.value, form.elements.password.value, event.submitter?.value === "create"); await account.beforeNavigate(); location.reload(); }); };
  document.getElementById("account-discord").onclick = () => run(() => account.discord());
  document.getElementById("account-link-discord").onclick = () => run(() => account.discord());
  document.getElementById("account-logout").onclick = () => run(async () => { await account.logout(); await account.beforeNavigate(); location.reload(); });
  document.getElementById("account-tracker").onclick = () => run(async () => {
    await account.beforeNavigate();
    account.host.sessionStorage.removeItem("bbt-guest-mode");
    if (await account.refresh()) {
      await account.beforeNavigate();
      location.reload();
    } else {
      account.host.parent.postMessage({ type: "bbt:sign-in", nonce: account.bridgeNonce }, account.parentOrigin());
      message.textContent = "Continue signing in with Discord on the Tracker.";
    }
  });
  // Native text inputs retain browser keyboard entry; a pad navigates and activates controls.
  let previous = [];
  const pad = () => {
    const controller = [...(navigator.getGamepads?.() ?? [])].find(Boolean);
    const held = controller?.buttons.map(button => button.pressed) ?? [];
    if (!dialog.open && releaseGuard && held.every(pressed => !pressed)) {
      releaseGuard = false;
      globalThis.bbtAccountDialogOpen = false;
    }
    if (dialog.open) {
      const controls = [...dialog.querySelectorAll("input, button")].filter(control => !control.disabled && control.getClientRects().length);
      const pressed = index => held[index] && !previous[index];
      if (pressed(1)) dialog.close();
      else if (pressed(12) || pressed(13) || pressed(14) || pressed(15)) {
        const direction = pressed(12) || pressed(14) ? -1 : 1;
        const index = controls.indexOf(document.activeElement);
        controls[(index + direction + controls.length) % controls.length]?.focus();
      } else if (pressed(0)) {
        const control = document.activeElement;
        if (control?.tagName === "BUTTON") control.click(); else control?.focus();
      }
    }
    previous = held;
    requestAnimationFrame(pad);
  };
  requestAnimationFrame(pad);
  return message;
}
