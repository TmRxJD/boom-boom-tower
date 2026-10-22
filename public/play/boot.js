import init, {
  load_pack, seed_file, start, drain_changes, declare_remote,
  take_audio_requests, begin_audio, push_audio, finish_audio, reject_audio, unlock_audio, read_held,
} from "./pkg/bbt_web.js";
import { wasmResponse } from "./wasm.js";

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
          if (cursor) { out.push([cursor.key, cursor.value]); cursor.continue(); } else resolve(out);
        };
        request.onerror = () => reject(request.error);
      });
    },
    save(changes) {
      return run("readwrite", (files) => {
        for (const [path, bytes] of changes) {
          if (bytes) files.put(bytes, path); else files.delete(path);
        }
      });
    },
  };
})();

function startSaving() {
  const flush = () => {
    const changes = drain_changes().filter(([path]) => path.startsWith("user/"));
    if (changes.length) store.save(changes).catch((error) => console.error("saving failed", error));
  };
  setInterval(flush, 1000);
  addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => { if (document.hidden) flush(); });
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
for (const type of ["pointerdown", "keydown", "touchend"]) addEventListener(type, unlock_audio, { capture: true });

const timing = new URLSearchParams(location.search).has("timing");
const mark = (name) => { performance.mark(name); if (timing) console.log(`[timing] ${name} ${performance.now().toFixed(0)} ms`); };

try {
  progress("Loading engine…", 0.1);
  const wasm = init({ module_or_path: wasmResponse("./pkg/bbt_web_bg.wasm.gz") });
  if (timing) wasm.then((exports) => { globalThis.bbtMemory = () => exports.memory.buffer.byteLength; });
  progress("Loading songs…", 0.3);
  const pack = fetchBytes("./game.zip");
  const saved = store.restore().catch(() => []);
  const music = fetch("./music/index.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  await wasm;
  mark("engine ready");
  load_pack(await pack);
  mark("songs unpacked");
  for (const [name, length] of Object.entries(await music)) declare_remote(`music/${name}`, length);
  for (const [path, bytes] of await saved) seed_file(path, bytes);
  progress("Starting…", 0.9);
  mark("starting");
  start(location.search);
  mark("started");
  startSaving();
  serveRecordings();
  status.classList.add("done");
  document.getElementById("bbt-canvas").focus();
} catch (error) {
  console.error(error);
  fail(error);
}
