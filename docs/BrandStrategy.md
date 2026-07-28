# NIVO Group Brand Strategy

## Brand role

NIVO Group is the parent group identity. The website should communicate a
premium international holding group: minimal, confident, and long-lived. It
must not read as a generic SaaS template or a standalone division website.

The public divisions currently represented by the group site are:

- NIVO Advisory Services
- NIVO IT Services

NIVO Finance remains unpublished until its scope is approved.

## Visual direction

The NIVO system is dark, editorial, and architectural:

- deep navy is the primary field and authority color;
- warm mineral surfaces give reading space without returning the site to a
  white-led interface;
- gold is reserved for direction, focus, separators, and key action;
- typography, generous spacing, and precise rules carry the hierarchy; and
- motion is short, optional, and removed for visitors who prefer reduced
  motion.

The intent is polish and restraint associated with international product and
consulting brands, not imitation of any specific company.

## Published assets

The current approved NIVO asset set is copied from assets/branding/ into the
public website directory without modifying the source artwork:

| Asset | Public path | Website role |
| :---- | :---------- | :----------- |
| NIVO logo | public/brand/logo/nivo-logo.png | Header and footer identity |
| Dimensional NIVO mark | public/brand/mascot/nivo-3d-mark.png | Decorative interior-page and approach artwork |
| Gold NIVO stamp | public/brand/mascot/nivo-stamp.png | Desktop home-hero focal point |

The assets are visual branding, not functional dependencies. The site remains
fully navigable and readable if an image does not load.

### Excluded source material

assets/branding/Nivo.Advisor/catalogue.png contains a former identity and must
never be published. The other files in Nivo.Advisor/ are reserved for that
division; they are not used by the NIVO Group website.

## Outstanding assets

| Asset | Intended location | Status |
| :---- | :---------------- | :----- |
| Favicon and Apple touch icon | public/ | Current placeholders; replace with a prepared NIVO mark export |
| Social sharing image | public/brand/social/og-image.png | Pending approved 1200 x 630 artwork |
| Section photography | public/images/sections/ | Optional, pending approval |
| 3D mascot model | public/brand/mascot/nivo-mascot.glb | Optional, pending approval |

## Implementation rules

- Use the tokens in website/src/styles/global.css; keep the deliberate
  navy-and-gold duplication with website/src/config/site.ts synchronized.
- Use BrandMark for the shared logo treatment. Do not re-create the mark with
  text or CSS elsewhere.
- Do not use gold body text on light surfaces.
- Do not add imagery merely to make a section look busy.
- Keep decorative marks out of the accessibility tree and maintain meaningful
  text contrast independently of the artwork.
- Treat the 3D mascot model as an optional enhancement, never a dependency
  for navigation or core content.

## Brand approval gate

Before adding a new asset, confirm its source file, intended filename,
light/dark treatment, social crop, and rights to publish. Update SEO
configuration only after the approved file exists at its public path.
