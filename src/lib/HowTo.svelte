<section class="section" id="how" aria-labelledby="how-title">
  <div class="container split">
    <div>
      <p class="eyebrow">How to play</p>
      <h2 id="how-title">How to play</h2>
      <ol class="steps">
        <li>
          <h3>Pick a song</h3>
          <p>Start with Easy. Practice mode slows the music and can't be failed.</p>
        </li>
        <li>
          <h3>Match the rockets</h3>
          <p>Press each rocket's color as it reaches the glowing line. Hold long notes until the end.</p>
        </li>
        <li>
          <h3>Use your bonuses</h3>
          <p>Hits fill Golden Tower and holds charge Black Hole. Fire both together for a bigger multiplier.</p>
        </li>
      </ol>
    </div>
    <div class="controls" aria-labelledby="controls-title">
      <h3 id="controls-title">Controls</h3>
      <div class="keys">
        <span class="yellow"><kbd aria-hidden="true">↑</kbd><small>Yellow · Up or W</small></span>
        <span class="red"><kbd aria-hidden="true">→</kbd><small>Red · Right or D</small></span>
        <span class="green"><kbd aria-hidden="true">↓</kbd><small>Green · Down or S</small></span>
        <span class="blue"><kbd aria-hidden="true">←</kbd><small>Blue · Left or A</small></span>
      </div>
      <dl>
        <div><dt>Golden Tower</dt><dd>Space or left Shift</dd></div>
        <div><dt>Black Hole</dt><dd>Left Ctrl or B</dd></div>
        <div><dt>Pause</dt><dd>Escape</dd></div>
        <div><dt>Controller</dt><dd>Face buttons play, shoulder buttons fire bonuses</dd></div>
        <div><dt>Touch</dt><dd>Tap the pads on screen</dd></div>
      </dl>
      <p class="note">Keys can be changed in Settings.</p>
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
  .keys small { font-size: 0.85rem; color: var(--muted); text-align: center; max-width: 6.5rem; }
  .yellow { color: #ffe066; } .red { color: #ff8a98; } .green { color: #7defa8; } .blue { color: #86bfff; }
  dl > div { display: grid; grid-template-columns: 8.5rem 1fr; gap: 1rem; padding: 0.75rem 0; border-top: 1px solid var(--line); }
  dt { font-weight: 700; }
  dd { color: var(--muted); }
  .note { margin-top: 1rem; font-size: 0.95rem; }
  @media (max-width: 900px) { .split { grid-template-columns: 1fr; } }
  @media (max-width: 480px) { dl > div { grid-template-columns: 1fr; gap: 0.15rem; } }
</style>
