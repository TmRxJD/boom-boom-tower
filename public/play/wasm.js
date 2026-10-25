// The game's wasm modules ship gzipped. The page decompresses them itself, so they load the same
// whatever compression the host applies, and compilation still streams while they download.
export async function wasmResponse(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  // Fetch already decodes HTTP Content-Encoding. Static hosts such as Vite serve
  // this .gz file with that header; Pages serves it as an ordinary gzip payload.
  const decodedByFetch = response.headers.get("Content-Encoding")?.split(",")
    .some(encoding => encoding.trim().toLowerCase() === "gzip");
  const stream = decodedByFetch ? response.body : response.body.pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream, { headers: { "Content-Type": "application/wasm" } });
}
