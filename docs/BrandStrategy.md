# NIVO Group Brand Strategy

## Brand role

NIVO Group is the parent group identity. The website should communicate a
premium international holding group: minimal, elegant, confident, and
long-lived. It should not read as a generic SaaS template or a standalone
division website.

The public divisions currently represented by the group site are:

- NIVO Advisory Services
- NIVO IT Services

NIVO Finance remains unpublished until its scope is approved.

## Visual direction

The established visual language is restrained corporate editorial design:

- deep navy as the primary field and authority color
- gold as a deliberate accent, separator, and emphasis color
- generous whitespace, disciplined grids, and strong typographic hierarchy
- restrained motion with clear purpose
- premium clarity over decoration

The intended reference point is the polish and restraint associated with
international product and consulting brands, not literal imitation of any
specific company.

## Asset governance

Do not redraw or modify approved NIVO artwork. Brand files belong in
`website/public/brand/`; incidental page imagery belongs in
`website/public/images/`.

The following launch assets still need approval or placement:

| Asset | Intended location | Status |
| :---- | :---------------- | :----- |
| Primary wordmark and mark | `public/brand/logo/` | Pending |
| Favicon and Apple touch icon | `public/` | Current placeholders only |
| Social sharing image | `public/brand/social/og-image.png` | Pending |
| Section imagery | `public/images/sections/` | Optional, pending approval |
| 3D mascot model | `public/brand/mascot/nivo-mascot.glb` | Optional, pending approval |

## Implementation rules

- Use the tokens in `website/src/styles/global.css`; keep the deliberate
  navy-and-gold duplication with `website/src/config/site.ts` synchronized.
- Keep the existing wordmark placeholder behind `BrandMark` until approved
  artwork is supplied.
- Do not use gold body text on light surfaces.
- Do not add imagery merely to make a section look busy.
- Treat the 3D mascot as optional enhancement work, never as a dependency for
  accessible or usable navigation.

## Brand approval gate

Before replacing a placeholder, confirm the source file, intended filename,
light/dark treatment, social crop, and rights to publish. Update the relevant
SEO configuration only after the approved file exists in the public path.
