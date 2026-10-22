<script lang="ts">
  import { onMount } from 'svelte';
  const base = import.meta.env.BASE_URL;
  const media = `${base}media/`;
  let paused = $state<Record<string, boolean>>({});
  let videos: Record<string, HTMLVideoElement> = {};
  function toggle(id: string) {
    const video = videos[id];
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }
  // Videos start by themselves unless the system asks for less motion; the button always works.
  onMount(() => {
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    for (const [id, video] of Object.entries(videos)) {
      paused[id] = true;
      if (!still) void video.play().catch(() => {});
    }
  });
  const loops = [
    { id: 'rhythm', title: 'Follow the melody', text: 'Four colors, flowing patterns, a firework on every hit.', alt: 'Colored rockets rising toward the target line below a glowing tower' },
    { id: 'eclipse', title: 'Combine the bonuses', text: 'Fire Golden Tower and Black Hole together for a huge multiplier.', alt: 'A golden swirl of fireworks during a bonus run, with “Perfect” on screen' },
  ];
  const shots = [
    { file: 'songs', title: 'Pick a song', text: 'Browse your library and choose from four difficulties.', alt: 'The song list with a song card showing four difficulty buttons and play modes' },
    { file: 'playlists', title: 'Build playlists', text: 'Queue songs and play them back to back.', alt: 'The playlist screen with a queue of songs and a list of songs to add' },
    { file: 'collection', title: 'Collect fireworks', text: 'Unlock new explosions and choose which ones appear.', alt: 'The firework collection list with locked and unlocked fireworks' },
  ];
</script>

<section class="section" id="gameplay" aria-labelledby="gameplay-title">
  <div class="container">
    <header class="head">
      <div>
        <p class="eyebrow">Gameplay</p>
        <h2 id="gameplay-title">See it in action</h2>
      </div>
      <p>Recorded in the game. Each loop can be paused.</p>
    </header>
    <div class="loops">
      {#each loops as loop}
        <figure>
          <div class="frame">
            <video bind:this={videos[loop.id]} poster={`${media}${loop.id}.webp`} width="640" height="360" aria-label={loop.alt} muted loop playsinline preload="metadata" onplay={() => (paused[loop.id] = false)} onpause={() => (paused[loop.id] = true)}>
              <source src={`${media}${loop.id}.webm`} type="video/webm" />
              <source src={`${media}${loop.id}.mp4`} type="video/mp4" />
            </video>
          </div>
          <figcaption>
            <div>
              <h3>{loop.title}</h3>
              <p>{loop.text}</p>
            </div>
            <button class="btn btn-ghost" onclick={() => toggle(loop.id)} aria-label={`${(paused[loop.id] ?? true) ? 'Play' : 'Pause'} video: ${loop.title}`}>
              {(paused[loop.id] ?? true) ? 'Play' : 'Pause'}
            </button>
          </figcaption>
        </figure>
      {/each}
    </div>
    <div class="shots">
      {#each shots as shot}
        <figure>
          <a href={`${media}${shot.file}.webp`} aria-label={`View the full screenshot: ${shot.title}`}>
            <img src={`${media}${shot.file}.webp`} width="1280" height="720" alt={shot.alt} loading="lazy" />
          </a>
          <figcaption>
            <h3>{shot.title}</h3>
            <p>{shot.text}</p>
          </figcaption>
        </figure>
      {/each}
    </div>
  </div>
</section>

<style>
  .head { display: flex; justify-content: space-between; align-items: end; gap: 2rem; margin-bottom: 2.5rem; }
  .head > p { max-width: 36ch; }
  .loops { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.75rem; }
  figure { display: grid; gap: 1rem; }
  .frame { aspect-ratio: 16 / 9; background: #000; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
  .frame img, .frame video { width: 100%; height: 100%; object-fit: cover; }
  figcaption { display: flex; justify-content: space-between; align-items: start; gap: 1rem; }
  figcaption p { font-size: 0.95rem; margin-top: 0.3rem; }
  figcaption .btn { min-height: 44px; padding-inline: 1rem; flex-shrink: 0; font-size: 0.95rem; }
  .shots { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.75rem; margin-top: 3rem; }
  .shots a { display: block; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
  .shots a:hover { border-color: var(--cyan); }
  .shots figcaption { display: block; }
  @media (max-width: 900px) { .head { flex-direction: column; align-items: start; } .shots { grid-template-columns: 1fr; } }
  @media (max-width: 640px) { .loops { grid-template-columns: 1fr; } figcaption { flex-direction: column; } }
</style>
