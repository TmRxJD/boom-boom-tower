<section class="section" id="music" aria-labelledby="music-title">
  <div class="container split">
    <div>
      <p class="eyebrow">Your music</p>
      <h2 id="music-title">Ten tracks included.<br />Bring the rest.</h2>
      <p class="lede">
        The ten original tracks come with their music. Recordings for the Tower OST, Boom Boom Rocket
        originals and custom songs are not distributed: bring a copy you have permission to play, and the
        game shows exact search terms with a Copy button.
      </p>
    </div>
    <ol class="flow">
      <li><b>Pick a song</b><span>Choose Add audio or Edit audio on its card.</span></li>
      <li><b>Choose your file</b><span>Local audio works best for steady timing. YouTube links work too, with a manual timing check.</span></li>
      <li><b>Confirm the match</b><span>The game compares the waveform and leading silence, and asks when it is unsure.</span></li>
    </ol>
  </div>
</section>

<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container faq">
    <h2 id="faq-title">Questions</h2>
    <div class="answers">
      <details open>
        <summary>Can I play in my browser?</summary>
        <p>Yes. The browser version is the same game, new and still rough in places. It keeps your scores and settings in the browser and downloads about 80 MB the first time. Landscape screens work best.</p>
      </details>
      <details>
        <summary>Can I import more songs?</summary>
        <p>Use Import for compatible song packs, BeatSaver links or keys, and supported Beat Saber ZIPs. Colored attacks are adapted; bombs, obstacles and saber-motion arcs are not.</p>
      </details>
      <details>
        <summary>Where are my scores?</summary>
        <p>On Windows, scores and settings live in the user folder beside the game; keep it when upgrading. In the browser they stay in that browser. This public playtest uses local scores only.</p>
      </details>
      <details>
        <summary>What does the Windows build need?</summary>
        <p>A 64-bit Windows 10 or 11 PC with a modern graphics driver. If a VCRUNTIME DLL is missing, install the <a href="https://aka.ms/vs/17/release/vc_redist.x64.exe">Microsoft Visual C++ x64 runtime</a>. YouTube playback also needs <a href="https://developer.microsoft.com/microsoft-edge/webview2/">WebView2</a>. This is an unsigned test build.</p>
      </details>
    </div>
  </div>
</section>

<style>
  .split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(2rem, 6vw, 5rem); align-items: center; }
  .flow { list-style: none; padding: 0; display: grid; gap: 1rem; counter-reset: n; }
  .flow li { counter-increment: n; display: grid; grid-template-columns: 2.6rem 1fr; gap: 0 1rem; background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 1.1rem 1.3rem; }
  .flow li::before { content: counter(n); grid-row: span 2; display: grid; place-items: center; width: 2.6rem; height: 2.6rem; border-radius: 50%; background: var(--gold); color: var(--ink); font-weight: 800; }
  .flow b { color: var(--text); }
  .flow span { color: var(--muted); }
  .faq { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
  details { border-top: 1px solid var(--line); padding: 0.4rem 0; }
  details:last-child { border-bottom: 1px solid var(--line); }
  summary { cursor: pointer; font-weight: 700; font-size: 1.08rem; min-height: 44px; display: flex; align-items: center; color: var(--text); }
  details p { padding-bottom: 1rem; }
  @media (max-width: 900px) { .split, .faq { grid-template-columns: 1fr; } }
</style>
