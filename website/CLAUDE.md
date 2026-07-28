# NIVO Group Website — Project Instructions

## Project identity and scope

This repository is the corporate website for **NIVO Group** at
`nivogroup.ly`. NIVO Group is a parent holding group, not a single operating
company and not a division website.

Published divisions:

- **NIVO Advisory Services**
- **NIVO IT Services**

NIVO Finance is modeled as planned and must not be published until its scope,
content, and publication status are approved.

Detailed service delivery belongs to the division websites. The group site
introduces the group, its divisions, and routes visitors to the right
destination. Do not reintroduce any former project identity anywhere in this
project.

## Technology

- Astro 7, static output
- TypeScript
- Tailwind CSS v4
- npm

The site ships no client JavaScript. Prefer Astro components and native browser
features. Do not add React, hydration, or a new dependency unless the product
need cannot be met with the current stack; explain the reason first.

## Content architecture

Content ownership is deliberate:

- `src/content/company.ts`: group identity, approach, contact, mission, vision, values
- `src/content/divisions.ts`: division identity, publication status, and links
- `src/content/services.ts`: group-level service summaries only
- `src/content/pages.ts`: page metadata, status, SEO, and section composition
- `src/content/sections.ts`: every public page heading, paragraph, and CTA
- `src/content/navigation.ts`: navigation and legal links
- `src/content/seo.ts`: page-level SEO overrides
- `src/content/i18n.ts`: localization primitives
- `src/config/site.ts`: composition root, canonical URL, global SEO, and brand colors

Astro pages compose; components render; content modules own business copy. Do
not place business information in pages or components, duplicate page metadata,
or bypass safe content lookups.

Never invent business facts, services, capabilities, statistics, certifications,
partnerships, contact details, legal wording, or Arabic translations. Use the
existing null, empty, planned, and unpublished states until approved material is
provided.

## Naming and language

Use `company.name` rather than hardcoding the group name. Use the division
registry for public division names. Keep stable IDs and slugs unchanged unless a
routing change is explicitly required.

Arabic is rendered only where approved Arabic content already exists. Do not
create an Arabic page, switcher, or body translation without supplied,
reviewed translations.

## Design and accessibility

NIVO should feel like a premium international holding group: minimal, elegant,
and corporate. Use the established navy-and-gold system with restrained motion,
clear hierarchy, generous space, and no generic SaaS patterns.

Do not modify approved NIVO artwork, create alternate identities, or change
brand colors without approval. Brand assets belong under `public/brand/`;
incidental page imagery belongs under `public/images/`.

Preserve semantic headings, native interactive controls, keyboard access,
visible focus states, responsive behavior, and `prefers-reduced-motion`.
Prioritize static performance and avoid unnecessary runtime work.

## Public routes and publication

Published routes are `/`, `/about`, `/divisions`, `/contact`, `/privacy`,
`/terms`, and the no-index `/404` fallback. Planned routes stay unbuilt
until their required content is approved.

Do not remove existing functionality or publish empty pages. Keep canonical
URLs, sitemap behavior, and robots behavior intact.

## Workflow and quality

Before an architectural change, explain why it is needed and its tradeoffs.
Prefer extending existing components over adding new ones; add a component only
when it removes meaningful duplication or establishes a reusable pattern.

Keep commits focused and logically separated. Keep `README.md` and the
documents under `../docs/` synchronized with architecture and launch
decisions.

Before completing a phase, run:

```sh
npm run format
npm run check
npm run lint
npm run build
```

Resolve errors before completion. Treat the site as production code and retain
the existing content-first architecture unless a demonstrated improvement
outweighs the migration cost.
