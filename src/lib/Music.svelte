<section class="section" id="music" aria-labelledby="music-title">
  <div class="container split">
    <div>
      <p class="eyebrow">Your music</p>
      <h2 id="music-title">Your music</h2>
      <p class="lede">
        The ten original tracks include their music. For every other song, add a recording you have
        permission to play. The game shows what to search for.
      </p>
    </div>
    <ol class="flow">
      <li><b>Pick a song</b><span>Choose Add audio on its card.</span></li>
      <li><b>Choose a file</b><span>A local file keeps timing steadiest. YouTube links work too.</span></li>
      <li><b>Confirm the match</b><span>The game compares it with the song and asks if it is unsure.</span></li>
    </ol>
  </div>
</section>

<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container faq">
    <h2 id="faq-title">FAQ</h2>
    <div class="answers">
      <details open>
        <summary>Can I play in my browser?</summary>
        <p>Yes. It is the same game, but new and rough in places. Scores and settings stay in your browser. The first load is about 80 MB. Use a wide screen.</p>
      </details>
      <details>
        <summary>Can I import more songs?</summary>
        <p>Yes. Use Import for chart files, BeatSaver links and Beat Saber ZIPs. Bombs, obstacles and arcs are skipped.</p>
      </details>
      <details>
        <summary>Where are my scores?</summary>
        <p>On your device only. Windows keeps them in the user folder beside the game, so keep it when you update. The browser keeps them in that browser. There are no online scores.</p>
      </details>
      <details>
        <summary>What does the Windows build need?</summary>
        <p>A 64-bit Windows 10 or 11 PC with a recent graphics driver. If a VCRUNTIME DLL is missing, install the <a href="https://aka.ms/vs/17/release/vc_redist.x64.exe">Microsoft Visual C++ x64 runtime</a>. YouTube playback also needs <a href="https://developer.microsoft.com/microsoft-edge/webview2/">WebView2</a>. The build is unsigned, so Windows may warn you.</p>
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
