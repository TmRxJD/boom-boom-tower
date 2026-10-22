// The game's wasm modules ship gzipped. The page decompresses them itself, so they load the same
// whatever compression the host applies, and compilation still streams while they download.
export async function wasmResponse(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  const stream = response.body.pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream, { headers: { "Content-Type": "application/wasm" } });
}
