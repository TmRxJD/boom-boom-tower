<script lang="ts">
  const features = [
    { title: 'Four difficulties', text: 'Easy to Expert on every song. Practice slows the music and cannot be failed; Endurance loops faster each lap; Autoplay shows a perfect run.' },
    { title: 'Hold notes and bonuses', text: 'Sustain long tones to charge Black Hole, build Golden Tower with clean hits, and fire both together for the big multiplier.' },
    { title: 'Playlists', text: 'Queue your favorites and move straight from one song to the next with a short breather in between.' },
    { title: 'Fireworks collection', text: 'Hit the marked rockets and finish songs to unlock new explosion shapes, then choose which ones appear.' },
    { title: 'Bring any song', text: 'Import compatible song packs, BeatSaver links or keys, and Beat Saber ZIPs. The game builds playable versions and asks before leaving any out.' },
    { title: 'Plays your way', text: 'Keyboard, game controller or touch. Rebind every key, and set the audio offset to match your setup.' },
  ];
</script>

<section class="section" id="features" aria-labelledby="features-title">
  <div class="container">
    <p class="eyebrow">Features</p>
    <h2 id="features-title">Everything a rhythm game needs,<br />and a few fireworks.</h2>
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
