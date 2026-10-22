<script lang="ts">
  const features = [
    { title: 'Four difficulties', text: 'Easy to Expert on every song, plus Practice, Endurance and Autoplay modes.' },
    { title: 'Holds and bonuses', text: 'Hold long notes to charge Black Hole. Clean hits build Golden Tower.' },
    { title: 'Playlists', text: 'Line up songs and play them in a row.' },
    { title: 'Firework collection', text: 'Unlock new explosion shapes and choose which ones appear.' },
    { title: 'Add your own songs', text: 'Import chart files, BeatSaver links or Beat Saber ZIPs, or build charts from any audio file.' },
    { title: 'Your controls', text: 'Keyboard, controller or touch, with remappable keys and an adjustable audio delay.' },
  ];
</script>

<section class="section" id="features" aria-labelledby="features-title">
  <div class="container">
    <p class="eyebrow">What you get</p>
    <h2 id="features-title">Features</h2>
    <ul class="grid">
      {#each features as feature}
        <li>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .grid { list-style: none; padding: 0; margin-top: 2.6rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
  li { background: var(--bg-raised); border: 1px solid var(--line); border-top: 3px solid var(--cyan); border-radius: 12px; padding: 1.5rem; }
  li:nth-child(3n + 2) { border-top-color: var(--pink); }
  li:nth-child(3n) { border-top-color: var(--gold); }
  li p { margin-top: 0.6rem; font-size: 0.98rem; }
  @media (max-width: 960px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
