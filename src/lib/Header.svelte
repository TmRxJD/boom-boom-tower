<script lang="ts">
  import site from '../site.json';
  const base = import.meta.env.BASE_URL;
</script>

<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <div class="container inner">
    <a class="brand" href="#top" aria-label="Boom Boom Tower, back to the top">
      <img src={`${base}media/icon-64.png`} alt="" width="40" height="40" />
      <span>Boom Boom <b>Tower</b></span>
    </a>
    <nav aria-label="Page sections">
      <ul>
        <li><a href="#gameplay">Gameplay</a></li>
        <li><a href="#how">How to play</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#music">Music</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a class="cta" href={`${base}play/`}>Play in browser</a></li>
      </ul>
    </nav>
  </div>
</header>

<style>
  .bar { position: sticky; top: 0; z-index: 10; background: rgba(6, 10, 20, 0.92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
  .inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding-block: 0.7rem; flex-wrap: wrap; }
  .brand { display: inline-flex; align-items: center; gap: 0.75rem; color: var(--text); text-decoration: none; font-weight: 700; font-size: 1.1rem; min-height: 44px; }
  .brand img { border-radius: 8px; }
  .brand b { color: var(--cyan); }
  ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 0.5rem; }
  nav a { display: inline-flex; align-items: center; min-height: 44px; padding: 0 0.8rem; color: var(--muted); text-decoration: none; font-weight: 600; border-radius: 8px; }
  nav a:hover { color: var(--text); background: rgba(255, 255, 255, 0.06); }
  nav a.cta { background: var(--cyan); color: var(--ink); }
  nav a.cta:hover { background: #a7f1ff; color: var(--ink); }
  @media (max-width: 720px) { .bar { position: static; } nav a { padding: 0 0.6rem; } }
</style>
