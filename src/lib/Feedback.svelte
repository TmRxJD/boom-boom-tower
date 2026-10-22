<script lang="ts">
  import site from '../site.json';
  const base = import.meta.env.BASE_URL;
</script>

<section class="feedback" aria-labelledby="feedback-title">
  <div class="container inner">
    <div>
      <p class="eyebrow">Feedback</p>
      <h2 id="feedback-title">Tell us how it played</h2>
      <p>Include the song, the difficulty, roughly when it happened, and what you saw.</p>
    </div>
    <div class="buttons">
      <a class="btn btn-gold" href={site.feedbackUrl}>Share feedback <span aria-hidden="true">↗</span></a>
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
