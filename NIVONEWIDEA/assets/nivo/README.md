# Nivo 3D asset drop zone

The current source renders are already present alongside their web-ready cutouts:

- `nivo-base.png` and `nivo-base-cutout.png` — Base Nivo source and transparent Hero render.
- `nivo-advisor.png` and `nivo-advisor-cutout.png` — Advisor Nivo source and transparent Advisor render.
- `nivo-it.png` and `nivo-it-cutout.png` — IT Nivo source and transparent IT render.
- `nivo-logistics.png` and `nivo-logistics-cutout.png` — Logistics Nivo source and transparent Logistics render.

Place the exported Spline file here later as `nivo-scene.splinecode`.

Model the wardrobe as three approved states:

- Base Nivo — no accessories
- Advisor Nivo — glasses and tie
- IT Nivo — IT outfit

The Logistics wardrobe is now available visually. Its chapter copy still carries the Coming Soon label until the approved Logistics story is ready.

For scroll-linked control, expose a Spline Number variable named `scrollProgress` from `0` to `1`. Map it smoothly across the three wardrobe states rather than using discrete triggers.
