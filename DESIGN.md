# Design
Tower Arcade world: dark surfaces, readable system sans-serif (explicit user preference), JDEVO attribution. The page leads with the game itself: a real gameplay still, one primary action (play in the browser) and one secondary (download for Windows).

Tokens live in `src/app.css`: background #060a14, raised #0c1424, text #f1f4ff, muted #b6c1db, lines #2a3a5c, accents cyan #62e4ff (actions), pink #ff9bd6 (display), gold #ffd166 (focus, secondary CTA). Body 16px / 1.65, headings in the same system family, content max 1180px, text measure 62ch. Sections alternate rhythm with generous padding and hairline separators; cards are used only where items are parallel (features, steps).

Accessibility is a hard requirement: WCAG 2.2 AA, verified with axe-core at 1440, 820 and 390 px, 44px navigation and button targets, a gold focus ring on every interactive element, a skip link, landmarks, and no motion unless asked (gameplay loops start only on a button press; `prefers-reduced-motion` removes transitions). Images are real captures of the game, with descriptive alt text; no external fonts or media dependencies.
