<section class="section" id="how" aria-labelledby="how-title">
  <div class="container split">
    <div>
      <p class="eyebrow">How to play</p>
      <h2 id="how-title">Three steps to your first song.</h2>
      <ol class="steps">
        <li>
          <h3>Pick a song and a difficulty</h3>
          <p>The ten original tracks are ready to play. Try Easy first; Practice mode slows the music and never fails you.</p>
        </li>
        <li>
          <h3>Match the rockets</h3>
          <p>Press the matching color as each rocket reaches the glowing line. Chords are two neighboring colors together. Hold long notes through their tails.</p>
        </li>
        <li>
          <h3>Save your bonuses</h3>
          <p>Regular hits fill Golden Tower. Holds charge Black Hole. Fire both together to multiply them.</p>
        </li>
      </ol>
    </div>
    <div class="controls" aria-labelledby="controls-title">
      <h3 id="controls-title">Four colors, both hands welcome</h3>
      <div class="keys" aria-hidden="true">
        <span class="yellow"><kbd>↑</kbd><small>Yellow</small></span>
        <span class="red"><kbd>→</kbd><small>Red</small></span>
        <span class="green"><kbd>↓</kbd><small>Green</small></span>
        <span class="blue"><kbd>←</kbd><small>Blue</small></span>
      </div>
      <dl>
        <div><dt>Rockets</dt><dd>Arrow keys, or W / D / S / A</dd></div>
        <div><dt>Golden Tower</dt><dd>Space or left Shift</dd></div>
        <div><dt>Black Hole</dt><dd>Left Ctrl or B</dd></div>
        <div><dt>Pause</dt><dd>Escape</dd></div>
        <div><dt>Controller</dt><dd>Face buttons play; shoulder buttons are the bonuses</dd></div>
        <div><dt>Touch</dt><dd>Tap the on-screen pads</dd></div>
      </dl>
      <p class="note">Every key can be rebound in Settings.</p>
    </div>
  </div>
</section>

<style>
  .split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
  .steps { list-style: none; padding: 0; margin-top: 2rem; display: grid; gap: 1.6rem; counter-reset: step; }
  .steps li { counter-increment: step; display: grid; grid-template-columns: 3.2rem 1fr; gap: 0 1rem; }
  .steps li::before { content: counter(step); grid-row: span 2; display: grid; place-items: center; width: 3.2rem; height: 3.2rem; border-radius: 50%; border: 2px solid var(--pink); color: var(--pink); font-weight: 800; font-size: 1.3rem; }
  .steps p { margin-top: 0.3rem; }
  .controls { background: var(--bg-raised); border: 1px solid var(--line); border-radius: 14px; padding: clamp(1.4rem, 3vw, 2.2rem); }
  .keys { display: flex; gap: 0.9rem; margin: 1.4rem 0 1.6rem; flex-wrap: wrap; }
  .keys span { display: grid; justify-items: center; gap: 0.4rem; }
  .keys kbd { display: grid; place-items: center; width: 3.7rem; height: 3.5rem; font-size: 1.8rem; border: 2px solid currentColor; border-radius: 10px; background: #0a1226; }
  .keys small { font-size: 0.85rem; color: var(--muted); }
  .yellow { color: #ffe066; } .red { color: #ff8a98; } .green { color: #7defa8; } .blue { color: #86bfff; }
  dl > div { display: grid; grid-template-columns: 8.5rem 1fr; gap: 1rem; padding: 0.75rem 0; border-top: 1px solid var(--line); }
  dt { font-weight: 700; }
  dd { color: var(--muted); }
  .note { margin-top: 1rem; font-size: 0.95rem; }
  @media (max-width: 900px) { .split { grid-template-columns: 1fr; } }
  @media (max-width: 480px) { dl > div { grid-template-columns: 1fr; gap: 0.15rem; } }
</style>
