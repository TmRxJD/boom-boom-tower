# Boom Boom Tower

Svelte 5 / Vite landing page for the Windows playtest, deployed with GitHub Pages.

The page includes gameplay captures, manually started GIF loops, quick-start documentation, and a feedback issue form. The Windows download is a GitHub Release asset. `public/play/` is the browser build of the same game (see below). Ten original tracks include audio; other music is supplied by players. Apart from those ten tracks, which the browser build must serve itself, no music or player data belongs in this site repository.

Use Node 22: `npm ci`, then `npm run build` (Svelte diagnostics and production build). `npm run dev` runs locally. The Vite base is `/boom-boom-tower/`.

Content: `src/App.svelte`; release/feedback links: `src/site.json`; media and downloadable guide: `public/`; Pages workflow: `.github/workflows/pages.yml`. Gameplay GIF sources are recorded native frames; icon art is generated artwork, labeled separately from gameplay.

Before changing a download URL, publish and verify its corresponding release asset. Keep GIFs opt-in, offscreen images lazy, and keyboard focus visible.

## Browser build

`public/play/` is the output of `cargo xtask web` in the source repository (`web/README.md` there): the game as WebAssembly, its data in `game.zip`, and the ten original tracks in `music/`. Replace the folder wholesale when the game changes; it is not edited by hand. Scores and settings stay in the player's browser. Opening `/play/` downloads about 80 MB the first time.
