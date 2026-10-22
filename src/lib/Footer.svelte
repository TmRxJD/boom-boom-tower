<script lang="ts">
  const base = import.meta.env.BASE_URL;
</script>

<footer>
  <div class="container foot">
    <a href="https://tmrxjd.github.io/tower-game-hub/">Back to Tower Arcade</a>
    <p>Independent fan game inspired by The Tower and Boom Boom Rocket. Not affiliated with their creators.</p>
    <nav aria-label="Downloads and guides">
      <a href={`${base}guide.txt`}>Plain-text guide</a>
      <a href="https://github.com/TmRxJD/boom-boom-tower/releases">Release notes</a>
    </nav>
  </div>
</footer>

<style>
  footer { padding-block: 2rem 3rem; }
  .foot { display: flex; justify-content: space-between; align-items: start; gap: 1.5rem 2.5rem; flex-wrap: wrap; font-size: 0.92rem; }
  .foot p { font-size: 0.88rem; max-width: 52ch; }
  .foot nav { display: flex; gap: 1.2rem; }
  .foot a { display: inline-flex; min-height: 44px; align-items: center; }
</style>
