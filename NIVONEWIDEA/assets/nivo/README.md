# Nivo 3D asset drop zone

The current temporary renders are already present:

- `nivo-base.png` — the base Nivo render used in the Hero and IT chapters.
- `nivo-advisor.png` — the glasses-and-tie render used in the Advisor chapter.
- `nivo-it.png` — the supplied IT source render, retained unchanged.
- `nivo-it-cutout.png` — the transparent IT render used in the IT and Logistics chapters.

Place the exported Spline file here later as `nivo-scene.splinecode`.

Model the wardrobe as three approved states:

- Base Nivo — no accessories
- Advisor Nivo — glasses and tie
- IT Nivo — IT outfit

Keep Logistics unmodelled for now. The website intentionally retains the IT wardrobe during that chapter and shows a Coming Soon label.

For scroll-linked control, expose a Spline Number variable named `scrollProgress` from `0` to `1`. Map it smoothly across the three wardrobe states rather than using discrete triggers.
