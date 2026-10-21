# Boom Boom Tower

Svelte 5 / Vite landing page for the Windows playtest, deployed with GitHub Pages.

The page includes gameplay captures, muted autoplaying 30 FPS gameplay video loops, quick-start documentation, and a feedback issue form. The game download is a GitHub Release asset, not a browser game. Ten original tracks include audio; other music is supplied by players. No music or player data belongs in this site repository.

Use Node 22: `npm ci`, then `npm run build` (Svelte diagnostics and production build). `npm run dev` runs locally. The Vite base is `/boom-boom-tower/`.

Content: `src/App.svelte`; release/feedback links: `src/site.json`; media and downloadable guide: `public/`; Pages workflow: `.github/workflows/pages.yml`. Gameplay video sources are recorded native frames; icon art is generated artwork, labeled separately from gameplay.

Before changing a download URL, publish and verify its corresponding release asset. Keep gameplay loops muted and inline, offscreen images lazy, and keyboard focus visible.
