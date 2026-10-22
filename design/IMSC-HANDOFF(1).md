# IMSC 2027 homepage: build brief

Build the homepage from `imsc-homepage.dc.html` (design source, in this folder) as a Next.js (App Router) page with React components. Match the design exactly: layout, spacing, type scale, colours and copy.

The design file uses a small template syntax. Translate it as follows:
- `{{value}}` placeholders and `<sc-for>` / `<sc-if>` tags are template loops and conditions → turn them into normal JSX.
- The `class Component extends DCLogic` script holds the data (topics, FAQ, menus, keynotes) and the state (menu open, FAQ open, keynote index, Split clock) → move it into components and hooks.
- Ignore `support.js`, `<x-dc>`, `<helmet>` and `data-props`.

## Tokens
- Navy `#004185` · Ink `#071B33` · Cyan `#00AEEF` · Pale cyan `#B9E5FB` · Ground `#F5F7FA` · Line `#C9D3DE` · Muted text `#4A5A6E` · Accent (coral) `#FF6B4A`
- Fonts: Inter Tight 400/500/600 (everything), IBM Plex Mono 400/500 (labels, numbers). Load via `next/font/google`.
- Headlines: weight 500, tight tracking (−0.04em), line-height ~0.92, fluid `clamp()` sizes as in the file.
- Content max-width 1440px, side padding `clamp(16px, 4vw, 48px)`.

## Structure
1. Navy main-menu strip (site-wide): links, "All pages" button (opens a full-screen menu), "Submit abstract"
2. Page header: logo (inline SVG) + numbered on-this-page links + "Register"
3. Hero: full-bleed fluted-glass hero (see below) with the headline, date/venue and CTAs on top
4. Ticker marquee
6. (01) About + stats · past-editions image strip
7. (02) 20 topics list · (03) Keynote slider · (04) Key dates
8. (05) Venue: full-bleed image, Split clock, info
9. Partner marquee · (06) News cards · (07) FAQ accordion
10. Closing CTA (navy) · Footer with "You've scrolled X cm"

Make the header strip and footer shared layout components; inner pages reuse them.

## Fluted-glass hero
Use the supplied `FlutedGlass.jsx` exactly as it is. It's a self-contained WebGL shader component with no dependencies, and it replaces the CSS rib rack in the design file. Don't rebuild the effect in CSS.
- Copy it to `components/FlutedGlass.jsx`.
- Render it as the hero background: `<FlutedGlass className="absolute inset-0" />` inside the `position: relative` hero. Keep the bottom fade gradient and the content on top. Drop the CSS ribs and the SVG grain; the shader draws its own grain.
- Default scene `bands`: black with soft blue bands centred behind diagonal ribs of uneven width and a liquid wobble. This matches the reference look. `scene="lighthouse"` brings back the navy lighthouse scene, and `src="/images/hero.jpg"` puts a photo behind the glass.
- Since the hero background is now near-black, change the hero's bottom fade to `linear-gradient(180deg, transparent, rgba(0,2,8,0.85))`.
- Props: scene, colors, background, spread, flutes, angle, refraction, fluid, aberration, edges, shadow, highlight, light, vary, contrast, roughness, grain, pattern (`lines` | `waves` | `zigzag`), waveAmp, waveFreq, mouse, speed. The defaults are tuned to the reference; don't change them unless asked.
- It pauses when off-screen, caps the device pixel ratio at 1.5, and shows a still frame under reduced motion.

## Animation (GSAP + ScrollTrigger + SplitText, Lenis smooth scroll)
Elements carry `data-anim` hooks. Replace the CSS scroll-driven stand-ins in the file with GSAP:
- `hero` (h1): SplitText lines, yPercent 100→0, stagger 0.08, on load
- `glass` (hero background): add a slight parallax on scroll (canvas y 0→15%, scrub). The beam sweep and mouse refraction already run inside the shader.
- `parallax`: image layer yPercent −7→7, scale 1.16, scrub
- `split` (h2s): lines rise in, start "top 85%"
- `reveal`: y 56→0, opacity 0→1
- `stagger`: children reveal, stagger 0.06
- `data-count`: count up from 0 on enter
- `hscroll` (past-editions strip): pinned horizontal scroll on desktop, native swipe on mobile
- Marquees: speed follows scroll velocity
- Wrap everything in `gsap.matchMedia()` and do nothing under `prefers-reduced-motion`.

## Content
Anything in [BRACKETS] is a placeholder. Keep it visible; don't invent values. Image slots are placeholders for real photos (use `next/image`).
