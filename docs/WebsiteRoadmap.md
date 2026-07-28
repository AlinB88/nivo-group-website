# NIVO Group Website Roadmap

## Purpose

This roadmap governs the parent NIVO Group website at `nivogroup.ly`. It does
not replace the roadmaps for NIVO Advisory Services or NIVO IT Services, which
are separate websites.

## Current baseline

Completed through Phase 15:

- content-first Astro architecture and safe data lookups
- premium responsive visual system
- approved NIVO logo and dimensional marks integrated into the public experience
- public home, divisions, contact, privacy, terms, and 404 pages
- public About page built from the approved group narrative and approach
- sitemap, robots, canonical URLs, and no-index 404 handling
- reusable division card, hero, and group CTA components

The project is technically stable. A public launch still requires approved
legal text and brand assets; these cannot be completed in code without
verified inputs.

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

## Phase 15 — Content-backed public pages

Completed:

- published `/about` from the already-approved group description and
  organizational approach
- promoted the shared group narrative and approach sections so the homepage and
  About page cannot drift

Still blocked:

- mission, vision, and values remain unpublished until approved
- detailed division and services pages remain unpublished until their
  narratives and scope are supplied

## Phase 16 — Brand, legal, and language readiness

Completed:

- browser theme and application metadata now read from the approved NIVO navy
  token;
- a minimal WebSite structured-data record uses only the existing group name,
  URL, and site description; and
- source artwork was reviewed and remains unpublished pending brand approval.

Still blocked:

- approved wordmark, favicon, social share image, and optional imagery;
- reviewed Privacy and Terms wording; and
- a decision on English-only launch or approved Arabic translations.

## Phase 17 — Deployment and launch hardening

Completed:

- GitHub Actions validates formatting, Astro and TypeScript checks, linting,
  and production builds for website changes.

Still blocked:

- production configuration, security headers, redirects, and domain verification;
- final manual accessibility, mobile, and share-preview checks in production.

Hosting is already selected and the live-domain deployment is owned by the
project owner. Website work must remain independent of that operational step.

## Remaining delivery phases

| Phase | Focus | Dependency | Completion condition |
| :---- | :---- | :--------- | :------------------- |
| 15 | Content-backed public pages | Approved division narratives | Publish only pages supported by approved records. |
| 16 | Brand, legal, and language readiness | Approved assets, legal wording, localization decision | Replace placeholders and complete the agreed public language scope. |
| 17 | Deployment and launch hardening | Hosting owner and final public content | Production deployment, headers, redirects, manual QA, and release sign-off. |

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
