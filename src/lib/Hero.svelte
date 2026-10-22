<script lang="ts">
  import site from '../site.json';
  const base = import.meta.env.BASE_URL;
</script>

<section class="hero" id="top" aria-labelledby="title">
  <div class="container grid">
    <div class="copy">
      <p class="eyebrow">Free playtest · Windows and browser</p>
      <h1 id="title">Hit the melody.<br /><span>Light up the sky.</span></h1>
      <p class="lede">
        A four-button rhythm game where every song becomes a fireworks show. Learn the patterns,
        hold the long notes, and time your bonuses for the big finish.
      </p>
      <div class="actions">
        <a class="btn btn-primary" href={`${base}play/`}>Play in your browser <span aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href={site.downloadUrl}>Download for Windows <span aria-hidden="true">↓</span></a>
      </div>
      <ul class="facts" aria-label="At a glance">
        <li><b>4</b> colors, 4 difficulties</li>
        <li><b>10</b> original tracks included</li>
        <li><b>Any</b> keyboard, pad or touch</li>
      </ul>
    </div>
    <figure class="shot">
      <img
        src={`${base}media/hero.webp`}
        width="1280"
        height="720"
        alt="Colored rockets rising toward the target line below a glowing tower, with fireworks bursting overhead"
        fetchpriority="high"
      />
    </figure>
  </div>
</section>

<style>
  .hero { padding-block: clamp(2.5rem, 7vw, 5.5rem) clamp(3rem, 7vw, 5rem); background: radial-gradient(ellipse 70% 60% at 78% 20%, rgba(98, 228, 255, 0.16), transparent 70%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(255, 155, 214, 0.1), transparent 70%); }
  .grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); gap: clamp(2rem, 5vw, 4.5rem); align-items: center; }
  h1 { font-size: clamp(2.6rem, 6.2vw, 4.8rem); font-weight: 900; letter-spacing: -0.035em; }
  h1 span { color: var(--pink); }
  .actions { display: flex; flex-wrap: wrap; gap: 0.85rem; margin-top: 2rem; }
  .facts { list-style: none; padding: 0; margin-top: 2.2rem; display: flex; flex-wrap: wrap; gap: 0.5rem 1.8rem; color: var(--muted); }
  .facts b { color: var(--gold); font-size: 1.25rem; margin-right: 0.3rem; }
  .shot { border-radius: 14px; overflow: hidden; border: 1px solid var(--line); box-shadow: 0 30px 80px -20px rgba(98, 228, 255, 0.3), 0 0 0 6px rgba(255, 255, 255, 0.03); background: #000; }
  .shot img { width: 100%; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .shot { order: -1; } }
  @media (max-width: 480px) { .btn { width: 100%; } }
</style>
