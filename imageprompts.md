# Image Prompts // HACK-O-FEST

This file maps every placeholder image in the site to the prompt you should
feed your generator of choice (Midjourney v6, Flux.1 dev, Stable Diffusion XL).
Drop the resulting file at the listed path and the site picks it up — no code
changes needed.

**Global style anchors** (paste into every prompt):

> cinematic comic-book homage, gritty halftone texture, deep cosmic blacks
> (#0A0A12) with electric crimson (#FF2D55), cosmic gold (#FFD23F), gamma
> green (#B4FF39), infinity purple (#7A3CFF), shock cyan (#00E5FF). Bold
> shapes, oversized geometric forms, dramatic rim light, volumetric haze, 35mm
> film grain. Wide compositions with intentional negative space. NO official
> Marvel logos, characters, or trademarks. Original geometric stones, shields,
> gauntlets.

**Aspect ratios**: most heroes are 16:9 or 1:1. Track cards are 4:5. Textures
are seamless 1024×1024.

---

## Hero (3 cinematic layers)

### `/public/img/hero/hero-1.jpg`
> **Aspect**: 16:9 · **Slot**: ASSEMBLE
> A cosmic void — a single luminous obsidian dodecahedron suspended in a deep
> black nebula. Faint star-fields, dust motes catching gold rim-light. Camera
> slightly below the object, looking up. Mood: birth-of-something quiet,
> imminent, unsettling. Empty center where future 3D model will be composited.
> No text.

### `/public/img/hero/hero-2.jpg`
> **Aspect**: 16:9 · **Slot**: INFINITY
> Deep infinity-purple gradient (#5a2bd0 → #1a0a3a). A floating geometric
> stone with internal lightning, suspended above a cracked cosmic plinth.
> Halftone dot texture across the lower third. Dust particles drifting right.
> Mood: charged, swelling, about to detonate.

### `/public/img/hero/hero-3.jpg`
> **Aspect**: 16:9 · **Slot**: MULTIVERSE
> Electric crimson explosion of fragmented mirrors — a single point of impact
> radiating outward into infinite reflective shards. Gamma-green vignette at
> the edges. Cinematic anamorphic flare across the horizontal. Mood: arrival,
> ignition, "we&apos;re in."

---

## Track cards (6 stones)

Each card is portrait 4:5. Card placement: as a background image inside
`components/tracks/TrackCard.tsx`. Override the gradient with a Next/Image when
ready.

### `/public/img/tracks/reality.jpg`
> **Color**: crimson (#FF2D55)
> A floating crimson stone wrapped in glitchy reality fragments — billboards,
> typography, AI-generated faces dissolving into pixels. Dramatic side-light.
> 4:5 portrait.

### `/public/img/tracks/power.jpg`
> **Color**: infinity purple (#7A3CFF)
> A purple stone radiating energy through chained metallic links. Cracked
> cosmic stone background. Backlit. 4:5 portrait.

### `/public/img/tracks/mind.jpg`
> **Color**: gamma green (#B4FF39)
> A gamma-green stone surrounded by orbiting neural webs and floating glyphs.
> Soft top-light. Dust. 4:5 portrait.

### `/public/img/tracks/time.jpg`
> **Color**: gold (#FFD23F)
> A gold stone embedded in a fractured analog clock face, hands frozen at
> different times. Sparks. 4:5 portrait.

### `/public/img/tracks/space.jpg`
> **Color**: cyan (#00E5FF)
> A shock-cyan stone in deep space, distant planets, a wormhole behind it.
> Rim light. 4:5 portrait.

### `/public/img/tracks/soul.jpg`
> **Color**: warm orange (#FF7A3C)
> An orange stone in a misty cathedral of light — soft volumetric beams,
> floating dust, reverent mood. 4:5 portrait.

---

## Themes (6 panel tiles)

Square panels, used as background fills in `components/themes/Themes.tsx`.

### `/public/img/themes/time-collapse.jpg`
> Layered chronograph dials disintegrating, infinity-purple glow. Square.

### `/public/img/themes/agents-unchained.jpg`
> Robotic puppet strings being severed by glowing gamma-green hands. Square.

### `/public/img/themes/off-world-ux.jpg`
> A holographic spatial interface floating on a Martian dune at golden hour. Square.

### `/public/img/themes/tiny-giants.jpg`
> A massive silver mech the size of a coin, shot macro on a circuit board. Square.

### `/public/img/themes/culture-stack.jpg`
> A vinyl record splitting into film strips and food photography, gold leaf
> accents. Square.

### `/public/img/themes/wild-card.jpg`
> A card mid-flip in zero gravity, splitting into mirror-shards reflecting
> different worlds. Square.

---

## Prizes

### `/public/img/prizes/podium-gold.jpg`
> **Aspect**: 9:16 (or 3:4)
> Texture: a tall golden monolith catching theatrical spotlight, halftone dust
> swirling, brushed metal finish.

### `/public/img/prizes/podium-silver.jpg`
> **Aspect**: 9:16
> Texture: a gamma-green monolith with subtle holographic surface and circuit
> etchings.

### `/public/img/prizes/podium-bronze.jpg`
> **Aspect**: 9:16
> Texture: a crimson monolith with embers and ash drifting upward.

---

## Textures / overlays (seamless 1024×1024)

### `/public/img/textures/halftone-paper.jpg`
> Seamless newsprint halftone — cream paper, dark dots, slight stain texture.
> 1024×1024 seamless.

### `/public/img/textures/gold-foil.jpg`
> Seamless brushed gold foil with micro-creases and warm highlights. 1024×1024.

### `/public/img/textures/comic-paper.jpg`
> Scratchy off-white comic-book interior paper with subtle yellowing and ink
> bleed. 1024×1024 seamless.

### `/public/img/textures/nebula-noise.jpg`
> A deep cosmic nebula texture — purple-to-black gradient with subtle red and
> gold star clusters. 1024×1024 seamless tileable.

---

## ID card backdrop

### `/public/img/id-card/cosmic-back.jpg`
> **Aspect**: 9:14 (matches 1080×1680 card)
> A cosmic gradient backdrop — infinity-purple core, void-black edges, sparse
> gold stars, halftone overlay across the lower third. No text. No characters.

---

## Manifesto / About atmosphere (optional, future)

### `/public/img/manifesto/halftone-band.jpg`
> Wide aspect 21:9 cream paper with bold halftone dot fade from left to right.
> Used as a subtle background band.

---

## Notes for whoever generates these

- Resist the urge to add text — every text element is rendered with the site&apos;s
  fonts.
- Keep faces vague or absent. We&apos;re a hackathon homage, not a casting call.
- Saturation: high contrast but not radioactive. The site is already loud.
- File size budget: ≤ 400KB per image (compress to AVIF/WEBP where possible).
- Match the palette anchors strictly — the page background color-morphs to each
  track&apos;s stone color and clashes will read as broken.
