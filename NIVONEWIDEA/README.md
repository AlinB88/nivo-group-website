# NIVO — New Idea

A self-contained static website prototype for a scroll-led Nivo character experience.

## Run it locally

1. Install packages with `npm install`.
2. Start the local preview with `npm run dev`.
3. Create the deployment files with `npm run build`. Upload the contents of `dist/` to Hostinger.

## Project structure

```text
NIVONEWIDEA/
├── assets/
│   ├── nivo/             # Real Spline scene and wardrobe notes
│   └── lottie/           # Optional approved Lottie JSON files
├── index.html            # Semantic page structure
├── styles.css            # Visual system and wardrobe fallback
├── main.js               # Scroll, Lenis, GSAP, Spline and Lottie wiring
└── package.json          # Local development and production build commands
```

## Add the real 3D Nivo character

1. Export the Nivo scene from Spline as a `.splinecode` file.
2. Put it at `assets/nivo/nivo-scene.splinecode`.
3. In `main.js`, change `NIVO_SCENE_URL` from `null` to `'/assets/nivo/nivo-scene.splinecode'`.
4. In Spline, add a Number variable called `scrollProgress`, ranging from `0` to `1`. Use it to drive the Base, Advisor, and IT wardrobe states.

The supplied Base and Advisor renders stay visible until that scene loads, so the page never presents an empty space. Logistics deliberately retains the IT visual treatment until its real wardrobe is supplied.

## Optional Lottie motion

Put an approved JSON animation in `assets/lottie/`, then set `LOTTIE_ASSET_URL` in `main.js`. No placeholder animation is shipped because it should not imply an approved brand asset.

## Quality checks

```text
npm run format
npm run check
npm run lint
npm run build
```
