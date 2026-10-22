<script lang="ts">
  import site from '../site.json';
  const base = import.meta.env.BASE_URL;
</script>

<section class="feedback" aria-labelledby="feedback-title">
  <div class="container inner">
    <div>
      <p class="eyebrow">Help shape the next build</p>
      <h2 id="feedback-title">How did it feel?</h2>
      <p>A song, a difficulty, a rough timestamp and what happened are the most useful details. Awkward patterns, missing melody notes, controller navigation and slowdowns are all welcome.</p>
    </div>
    <div class="buttons">
      <a class="btn btn-gold" href={site.feedbackUrl}>Share feedback <span aria-hidden="true">↗</span></a>
      <a class="btn btn-ghost" href={`${base}play/`}>Play in your browser <span aria-hidden="true">→</span></a>
      <a class="btn btn-ghost" href={site.downloadUrl}>Download for Windows <span aria-hidden="true">↓</span></a>
    </div>
  </div>
</section>

<style>
  .feedback { background: linear-gradient(135deg, #0d1a33, #1a1030); border-block: 1px solid var(--line); padding-block: clamp(3rem, 7vw, 5rem); }
  .inner { display: flex; justify-content: space-between; align-items: center; gap: 2.5rem; flex-wrap: wrap; }
  .inner > div:first-child { max-width: 60ch; }
  .inner p:not(.eyebrow) { margin-top: 1rem; }
  .buttons { display: grid; gap: 0.8rem; min-width: min(100%, 17rem); }
</style>
