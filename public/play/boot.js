import init, {
  load_pack, seed_file, start, drain_changes, declare_remote,
  take_audio_requests, begin_audio, push_audio, finish_audio, reject_audio, unlock_audio, read_held,
  setup_account, account_journal, receive_progress,
} from "./pkg/bbt_web.js";
import { wasmResponse } from "./wasm.js";
import { Account, bindAccountDialog } from "./account.js";

let account;
let accountMessage;
let storagePrefix = ""; // Existing unprefixed files remain the guest's files.
let savedJournal = "";

const message = document.getElementById("message");
const fill = document.getElementById("fill");
const status = document.getElementById("status");
const fatal = document.getElementById("fatal");

function progress(text, fraction) {
  message.textContent = text;
  fill.style.width = `${Math.round(fraction * 100)}%`;
}

function fail(error) {
  document.getElementById("fatal-text").textContent = `Boom Boom Tower stopped.\n\n${error?.message ?? error}`;
  fatal.style.display = "grid";
  status.classList.add("done");
}
document.getElementById("reload").addEventListener("click", () => location.reload());

addEventListener("bbt-error", (event) => fail(event.detail));
// A trap inside the engine (a Rust panic) surfaces as an uncaught error; the game cannot carry on.
addEventListener("error", (event) => {
  if (String(event.message).startsWith("ResizeObserver")) return;
  fail(event.error ?? event.message);
});
addEventListener("unhandledrejection", (event) => fail(event.reason));
addEventListener("bbt-exit", () => {
  document.getElementById("farewell").style.display = "grid";
});
document.getElementById("again").addEventListener("click", () => location.reload());

async function fetchBytes(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

// ---- Saved player files: everything the game writes under user/ survives reloads. ----

const store = (() => {
  const open = new Promise((resolve, reject) => {
    const request = indexedDB.open("boom-boom-tower", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const run = async (mode, work) => {
    const db = await open;
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", mode);
      const result = work(tx.objectStore("files"));
      tx.oncomplete = () => resolve(result?.result);
      tx.onerror = () => reject(tx.error);
    });
  };
  return {
    async restore() {
      const db = await open;
      return new Promise((resolve, reject) => {
        const out = [];
        const request = db.transaction("files").objectStore("files").openCursor();
        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            const key = String(cursor.key);
            if (storagePrefix ? key.startsWith(storagePrefix) : key.startsWith("user/")) out.push([key.slice(storagePrefix.length), cursor.value]);
            cursor.continue();
          } else resolve(out);
        };
        request.onerror = () => reject(request.error);
      });
    },
    save(changes) {
      return run("readwrite", (files) => {
        for (const [path, bytes] of changes) {
          const key = `${storagePrefix}${path}`;
          if (bytes) files.put(bytes, key); else files.delete(key);
        }
      });
    },
  };
})();

function startSaving() {
  const flush = async () => {
    const changes = drain_changes().filter(([path]) => path.startsWith("user/"));
    const journal = account_journal();
    if (journal && journal !== savedJournal) {
      changes.push(["user/account-progress.json", new TextEncoder().encode(journal)]);
    }
    if (changes.length) await store.save(changes);
    savedJournal = journal;
  };
  const persist = () => { flush().catch(error => { accountMessage.textContent = `Saving failed: ${error.message}`; }); };
  setInterval(persist, 1000);
  addEventListener("pagehide", persist);
  document.addEventListener("visibilitychange", () => { if (document.hidden) persist(); });
  return flush;
}

function startSyncing() {
  let busy = false;
  const sync = async () => {
    if (busy || !account.uid || !account.config.progressFunction) return;
    busy = true;
    try {
      const journal = JSON.parse(account_journal());
      // Rust applies remote pages only in menus. Never queue another page while playing.
      if (account.waiting(journal.cursor)) return;
      const page = await account.sync({ version: 1, after: journal.cursor, operation: journal.pending[0] ?? null }, journal.owner_id);
      receive_progress(JSON.stringify(page));
      accountMessage.textContent = "Progress synced to your account.";
    } catch (error) { accountMessage.textContent = error.message; }
    finally { busy = false; }
  };
  sync();
  setInterval(sync, 3000);
}

// ---- Recordings: fetched here, decoded in a worker, handed to the game in small pieces. ----

const worker = new Worker(new URL("./audio-worker.js", import.meta.url), { type: "module" });
const jobs = new Map();
let nextJob = 1;
const CHUNK = 1 << 17;

worker.onmessage = ({ data }) => {
  const job = jobs.get(data.id);
  jobs.delete(data.id);
  if (!job) return;
  const [path, startMs, lengthMs] = job;
  if (data.error) {
    reject_audio(path, startMs, lengthMs, data.error);
    return;
  }
  begin_audio(path, startMs, lengthMs, data.rate, data.pcm.length >> 1);
  let at = 0;
  const feed = () => {
    push_audio(data.pcm.subarray(at, at + CHUNK));
    at += CHUNK;
    if (at < data.pcm.length) setTimeout(feed, 0); else finish_audio();
  };
  feed();
};

async function serveRecording(path, startMs, lengthMs) {
  try {
    const bytes = read_held(path) ?? await fetchBytes(`./${path.split("/").map(encodeURIComponent).join("/")}`);
    const id = nextJob++;
    jobs.set(id, [path, startMs, lengthMs]);
    worker.postMessage({ id, bytes: bytes.buffer, start: startMs, length: lengthMs }, [bytes.buffer]);
  } catch (error) {
    reject_audio(path, startMs, lengthMs, String(error?.message ?? error));
  }
}

function serveRecordings() {
  setInterval(() => {
    for (const [path, startMs, lengthMs] of take_audio_requests()) serveRecording(path, startMs, lengthMs);
  }, 40);
}

// Browsers start audio only after a touch, click or key press.
// A phone hides the browser bars only while the page is fullscreen, which a browser grants only to a tap.
function fullscreenOnTouch() {
  const root = document.documentElement;
  if (!root.requestFullscreen) return;
  const enter = () => {
    if (document.fullscreenElement) return;
    root.requestFullscreen({ navigationUI: "hide" })
      .then(() => screen.orientation?.lock?.("landscape").catch(() => {}))
      .catch(() => {});
  };
  addEventListener("pointerup", enter, { capture: true });
}

for (const type of ["pointerdown", "keydown", "touchend"]) addEventListener(type, unlock_audio, { capture: true });

const timing = new URLSearchParams(location.search).has("timing");
const mark = (name) => { performance.mark(name); if (timing) console.log(`[timing] ${name} ${performance.now().toFixed(0)} ms`); };

try {
  const config = await fetch("./account-config.json").then(response => { if (!response.ok) throw new Error("Account configuration could not load"); return response.json(); });
  account = new Account(config);
  accountMessage = bindAccountDialog(account);
  try { await account.restore(); } catch (error) { accountMessage.textContent = error.message; }
  if (account.uid) storagePrefix = `account:${encodeURIComponent(account.uid)}:`;
  progress("Loading engine…", 0.1);
  const wasm = init({ module_or_path: wasmResponse("./pkg/bbt_web_bg.wasm.gz") });
  if (timing) wasm.then((exports) => { globalThis.bbtMemory = () => exports.memory.buffer.byteLength; });
  progress("Loading songs…", 0.3);
  const pack = fetchBytes("./game.zip");
  const saved = store.restore();
  const music = fetch("./music/index.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  await wasm;
  mark("engine ready");
  load_pack(await pack);
  mark("songs unpacked");
  for (const [name, length] of Object.entries(await music)) declare_remote(`music/${name}`, length);
  const restored = await saved;
  for (const [path, bytes] of restored) seed_file(path, bytes);
  if (account.uid) {
    const journal = restored.find(([path]) => path === "user/account-progress.json");
    const ownedText = path => {
      const entry = restored.find(([name]) => name === path);
      return entry ? new TextDecoder().decode(entry[1]) : "";
    };
    setup_account(account.uid, journal ? new TextDecoder().decode(journal[1]) : "", crypto.randomUUID(), ownedText("user/scores.json"), ownedText("user/settings.json"));
  }
  progress("Starting…", 0.9);
  mark("starting");
  start(location.search, matchMedia("(pointer: coarse)").matches);
  if (matchMedia("(pointer: coarse)").matches) fullscreenOnTouch();
  mark("started");
  account.beforeNavigate = startSaving();
  startSyncing();
  serveRecordings();
  status.classList.add("done");
  document.getElementById("bbt-canvas").focus();
} catch (error) {
  console.error(error);
  fail(error);
}
