# NIVO Group Website Instructions

## Scope

`website/` is the canonical public NIVO Group site for `nivogroup.ly`.
It is a static Vite project; the former Astro implementation is retired.
The active experience is a horizontal, four-chapter journey featuring Nivo as
the group's helper, mentor, friend, and partner.

## Architecture

- `content.js` owns all public English and Arabic copy, metadata, and labels.
- `index.html` owns the semantic document shell and visual asset placement.
- `main.js` owns language selection, chapter state, navigation, and interaction.
- `styles.css` owns the responsive visual system and motion.
- `assets/` owns approved visual assets only.

Keep business copy out of markup and behavior files. Do not duplicate content
or introduce a second website source folder.

## Content and language

Never invent business information, service capabilities, statistics,
certifications, partnerships, contact details, legal wording, or translations.
Arabic text currently in `content.js` is an explicitly approved draft and must
be reviewed before a final launch. Keep the NIVO wordmark as `NIVO` in every
locale.

## Experience requirements

The experience must remain premium, accessible, responsive, and performant.
Preserve native horizontal touch swiping, desktop wheel/trackpad support,
keyboard navigation, visible focus styles, and reduced-motion support. Keep
the Nivo scene clear of chapter copy, especially on small screens.

## Deployment and validation

`npm run build` produces the static `dist/` directory. Upload its contents to
the Hostinger document root for the intended domain. Do not commit automatically.

Before completing work, run:

```sh
npm run format
npm run check
npm run lint
npm run build
```
