# NIVO Group Project Instructions

## Canonical website

The production NIVO Group website lives in `website/`. It is a static Vite
project for `nivogroup.ly`. `NIVONEWIDEA` was a temporary prototype and must
not remain as a second source of truth after promotion.

## Product

Nivo is the group's visual guide: helper, mentor, friend, and partner. The
site is a premium bilingual English/Arabic journey with Base Nivo, NIVO
Advisory Services, NIVO IT Services, and a planned Logistics chapter.

## Working rules

- Keep business copy, metadata, and translated text in `website/content.js`.
- Keep markup in `index.html`, interaction in `main.js`, and presentation in
  `styles.css`.
- Do not invent business facts, services, claims, certifications, legal text,
  contact information, or translations.
- Preserve accessibility, responsive behavior, reduced-motion support, and
  the horizontal keyboard/touch/desktop-wheel journey.
- Do not add dependencies without a clear need, and do not create duplicate
  website implementations.
- Do not commit automatically.

## Validation

Run these from `website/` before completing work:

```sh
npm run format
npm run check
npm run lint
npm run build
```
