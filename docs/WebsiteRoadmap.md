# NIVO Group Website Roadmap

## Purpose

This roadmap governs the parent NIVO Group website at `nivogroup.ly`. It does
not replace the roadmaps for NIVO Advisory Services or NIVO IT Services, which
are separate websites.

## Current baseline

Completed through Phase 13:

- content-first Astro architecture and safe data lookups
- premium responsive visual system
- public home, divisions, contact, privacy, terms, and 404 pages
- sitemap, robots, canonical URLs, and no-index 404 handling
- reusable division card, hero, and group CTA components

The project is technically stable but is not launch-complete while approved
content, legal text, brand assets, and hosting decisions are outstanding.

## Phase 14 — Governance and approved inputs

This phase prepares the project for content-backed publication without
inventing information.

Completed:

- current NIVO Group project instructions
- public naming: NIVO Advisory Services and NIVO IT Services
- roadmap, brand, and motion guidance

Required before public-content expansion:

1. Approved group mission, vision, and values.
2. Approved group contact details, or a decision that division contact is the
   only public route.
3. Reviewed Privacy and Terms wording.
4. Approved logo, favicon, social share artwork, and any page imagery.
5. A decision on English-only launch versus approved Arabic translations.
6. A hosting owner and production deployment plan.

## Remaining delivery phases

| Phase | Focus | Dependency | Completion condition |
| :---- | :---- | :--------- | :------------------- |
| 15 | Content-backed public pages | Approved group and division narratives | Publish only pages supported by approved records. |
| 16 | Brand, legal, and language readiness | Approved assets, legal wording, localization decision | Replace placeholders and complete the agreed public language scope. |
| 17 | Deployment and launch hardening | Hosting access and final public content | Production deployment, headers, redirects, manual QA, and release sign-off. |

Services, NIVO Finance, detailed division pages, and a 3D mascot experience are
not release requirements. They remain unpublished or optional until their own
content and scope are approved.

## Launch checklist

- Every public sentence has an approved owner in `website/src/content/`.
- No placeholder legal text, contact field, logo, icon, or social image remains
  on a launch-critical route.
- `npm run format`, `npm run check`, `npm run lint`, and `npm run build`
  pass.
- Production hosting serves HTTPS, redirects, a working 404 response, and
  suitable security headers.
- Sitemap, robots, canonical URLs, share previews, keyboard navigation, and
  mobile layouts are manually checked in production.
