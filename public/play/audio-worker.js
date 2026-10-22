// Decodes recordings off the page's main thread, with the same decoder the desktop game uses.
import init, { decode_audio } from "./pkg-worker/bbt_worker.js";
import { wasmResponse } from "./wasm.js";

const ready = init({ module_or_path: wasmResponse("./pkg-worker/bbt_worker_bg.wasm.gz") });

self.onmessage = async ({ data: { id, bytes, start, length } }) => {
  await ready;
  try {
    const decoded = decode_audio(new Uint8Array(bytes), start, length);
    const rate = decoded.sample_rate;
    const pcm = decoded.take_pcm();
    self.postMessage({ id, rate, pcm }, [pcm.buffer]);
  } catch (error) {
    self.postMessage({ id, error: String(error?.message ?? error) });
  }
};
