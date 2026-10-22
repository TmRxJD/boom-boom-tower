<script lang="ts">
  import Header from './lib/Header.svelte';
  import Hero from './lib/Hero.svelte';
  import Showcase from './lib/Showcase.svelte';
  import HowTo from './lib/HowTo.svelte';
  import Features from './lib/Features.svelte';
  import Music from './lib/Music.svelte';
  import Feedback from './lib/Feedback.svelte';
  import Footer from './lib/Footer.svelte';
</script>

<svelte:head>
  <title>Boom Boom Tower — a fireworks rhythm game for desktop and the browser</title>
  <meta name="description" content="A four-button rhythm game where every song becomes a fireworks show. Play the free playtest in your browser or download it for Windows, Mac or Linux." />
  <meta property="og:title" content="Boom Boom Tower" />
  <meta property="og:description" content="Hit the melody. Light up the sky. Play in your browser or download the playtest for Windows, Mac or Linux." />
  <meta property="og:image" content="https://tmrxjd.github.io/boom-boom-tower/media/icon-art.webp" />
  <meta property="og:type" content="website" />
</svelte:head>

<Header />
<main id="main" tabindex="-1">
  <Hero />
  <Showcase />
  <HowTo />
  <Features />
  <Music />
  <Feedback />
</main>
<Footer />
