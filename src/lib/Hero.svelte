<script lang="ts">
  import site from '../site.json';
  const base = import.meta.env.BASE_URL;
</script>

<section class="hero" id="top" aria-labelledby="title">
  <div class="container grid">
    <div class="copy">
      <p class="eyebrow">Free playtest · Windows and browser</p>
      <h1 id="title">Hit the melody. <span>Light up the sky.</span></h1>
      <p class="lede">A four-button rhythm game where every song becomes a fireworks show.</p>
      <div class="actions">
        <a class="btn btn-primary" href={`${base}play/`}>Play in your browser <span aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href={site.downloadUrl}>Download for Windows <span aria-hidden="true">↓</span></a>
      </div>
      <p class="fine">Browser version: about 80 MB on first load. Windows version: ZIP of about 90 MB, unsigned.</p>
      <ul class="facts" aria-label="At a glance">
        <li>4 difficulties</li>
        <li>10 original tracks</li>
        <li>Keyboard, controller or touch</li>
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
  h1 { font-size: clamp(2.4rem, 4.6vw, 4rem); font-weight: 900; letter-spacing: -0.035em; text-wrap: balance; }
  .fine { font-size: 0.9rem; margin-top: 1rem; }
  h1 span { color: var(--pink); }
  .actions { display: flex; flex-wrap: wrap; gap: 0.85rem; margin-top: 2rem; }
  .facts { list-style: none; padding: 0; margin-top: 1.6rem; display: flex; flex-wrap: wrap; gap: 0.4rem 1.6rem; color: var(--muted); font-weight: 600; }
  .shot { border-radius: 14px; overflow: hidden; border: 1px solid var(--line); box-shadow: 0 30px 80px -20px rgba(98, 228, 255, 0.3), 0 0 0 6px rgba(255, 255, 255, 0.03); background: #000; }
  .shot img { width: 100%; }
  @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  @media (max-width: 480px) { .btn { width: 100%; } }
</style>
