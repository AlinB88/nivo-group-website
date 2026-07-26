# NIVO Group — Corporate Website

The corporate website for NIVO Group ([nivogroup.ly](https://nivogroup.ly)).

This repository contains **only** the parent group site. Each division has its own
separate project:

| Site          | Domain                                     |
| :------------ | :----------------------------------------- |
| NIVO Group    | `nivogroup.ly` — this repository           |
| NIVO Advisory | `advisory.nivogroup.ly` — separate project |
| NIVO IT       | `it.nivogroup.ly` — separate project       |

Do not add division-specific pages or service content here. This site introduces the
group and links out to each division.

## Stack

Astro (static output) · Tailwind CSS v4 · TypeScript

No UI framework. The build ships **zero JavaScript** — the mobile menu is a native
`<details>` element. Keep it that way unless something genuinely needs it.

## Project structure

```text
src/
├── assets/       build-processed imports (empty)
├── components/   BrandMark, Header, Footer, PageHero, DivisionCard, ApproachCard
│   └── loading/  NivoLoader.astro — placeholder shell for the 3D experience
├── config/
│   └── site.ts   composition root — assembles content, holds SEO + colors
├── content/      the content model
│   ├── company.ts     parent identity, approach, contact
│   ├── divisions.ts   divisions + publication gate
│   ├── services.ts    service catalogue (empty by design)
│   ├── sections.ts    page body copy — authoritative
│   ├── pages.ts       page metadata registry — authoritative
│   ├── seo.ts         per-page SEO overrides — wired into BaseLayout
│   ├── navigation.ts  nav + legal links
│   └── i18n.ts        bilingual primitives
├── layouts/      BaseLayout.astro — HTML shell, SEO, canonical, OpenGraph
├── pages/        index, contact, privacy, terms, robots.txt.ts
└── styles/       global.css — brand tokens, base layer, button components

public/
├── favicon.svg / favicon.ico / apple-touch-icon.png
├── brand/        NIVO brand assets, served as-is (empty)
│   ├── logo/     wordmark and mark files
│   ├── mascot/   NIVO 3D mascot — nivo-mascot.glb
│   ├── loading/  loading-experience assets
│   └── social/   share images — og-image.png
└── images/
    └── sections/ non-brand page imagery (empty)
```

Brand assets live under `public/brand/`, never under `public/images/`. `images/` is
only for incidental page photography.

### Content rules

The rule in one line:

> **Content is authored in `src/content`. Pages consume structured content.
> Components never contain business copy.**

`src/config/site.ts` composes the content modules into `siteConfig` and holds the
genuinely configuration-shaped values — canonical URL, SEO defaults, brand colors.

Import from `config/site` for anything a page renders. Import from `content/`
directly when you need the richer model — division status, services, sections,
page metadata, localized fields.

#### Data ownership

| Data                                     | Owner                   |
| :--------------------------------------- | :---------------------- |
| Group identity, mission, values, contact | `content/company.ts`    |
| Division identity, status, capabilities  | `content/divisions.ts`  |
| Services                                 | `content/services.ts`   |
| Page titles, descriptions, page status   | `content/pages.ts`      |
| Page body copy — every rendered sentence | `content/sections.ts`   |
| UI microcopy — button and field labels   | the component itself    |
| Per-page SEO overrides                   | `content/seo.ts`        |
| Nav and legal links                      | `content/navigation.ts` |
| Canonical URL, site SEO defaults, colors | `config/site.ts`        |
| Markup, layout, styling                  | `components/`, `pages/` |

A component that needs a new string does not get a hardcoded one — the string goes in
`content/`, and the component reads it.

#### Component rules

Astro files are responsible for **layout composition, component placement, and passing
data**. They must not own business text.

In practice that means a page file contains: imports, section lookups in the
frontmatter, and markup that references `section.heading.en`, `paragraph.en`,
`link.href`. If you find yourself typing a sentence into a `.astro` file, it belongs
in `content/` instead.

#### pages.ts is authoritative

**`src/content/pages.ts` owns page metadata.** Every shipped route reads its title,
description, and SEO from the registry — the `.astro` files render that data, they do
not own it. To change a page's title or description, edit `pages.ts`, not markup.

Each page passes its route to the layout:

```astro
<BaseLayout slug="/contact" />
```

`BaseLayout` resolves metadata most-specific-first:

1. an explicit `title` / `description` prop (escape hatch)
2. `page.seo.title` / `page.seo.description` — absolute overrides
3. the root page → `siteConfig.seo.defaultTitle`
4. `page.title` → rendered as `Title | NIVO Group`
5. no registry entry → site-level defaults, plus a build warning

Step 5 is deliberate: a missing entry **must not fail the build**. `getPage()` returns
`undefined`, the layout falls back to site defaults, and the build log carries
`[BaseLayout] No entry in content/pages.ts for "…"`.

Safe getters, none of which throw:

| Helper                     | Returns                                |
| :------------------------- | :------------------------------------- |
| `getPage(slug)`            | `PageDefinition \| undefined`          |
| `getPublishedPages()`      | pages with a live route                |
| `getPlannedPages()`        | pages awaiting content, w/ `blockedBy` |
| `getPageDescription(slug)` | description, or `''`                   |

#### SEO resolution

`seo.ts` is wired into `BaseLayout`. Per-page `SeoMeta` overrides site defaults for
title, description, canonical path, and share image.

Two fields are emitted **conditionally**, so pages stay clean:

- **robots** — only when restrictive. `index,follow` is what crawlers assume with no
  tag at all, so emitting it would add noise to every page for zero effect. Set
  `noindexSeo()` on a page to opt it out of search.
- **keywords** — only when non-empty. Never invented; populate only with terms NIVO
  genuinely uses.

`canonicalPath` overrides the route-derived canonical URL. It is `null` everywhere
today, which is correct for every current page.

#### sections.ts owns page body copy

**Every sentence in a page body lives in `src/content/sections.ts`.** No heading,
paragraph, or CTA label is written in a `.astro` file.

Sections are a discriminated union on `kind` — `hero`, `text`, `cta`, `legal`,
plus `featureList`, `timeline`, and `stats` which are modeled but unused. A renderer
can switch exhaustively and the compiler flags any unhandled variant.

Pages resolve their own sections by id:

```astro
const legal = getSectionOfKind('privacy.body', 'legal');
```

`getSectionOfKind()` returns `undefined` when the id is unknown **or** when the
section is not the expected kind, so one section type can never be mis-rendered as
another. Lookups never throw:

| Helper                       | Returns                                          |
| :--------------------------- | :----------------------------------------------- |
| `getSection(id)`             | `Section \| undefined`                           |
| `getSectionOfKind(id, kind)` | narrowed section, or `undefined`                 |
| `getSections(ids)`           | resolved sections, missing ids dropped           |
| `getPageSections(slug)`      | a page's sections in order, `[]` if unregistered |

A content gap renders less; it never fails the build.

##### What stays in markup

**UI microcopy** — button labels (`Visit Website`, `Coming Soon`), field labels
(`Email`, `Phone`, `Location`), empty states (`To be provided`), and column headings
(`Explore`, `Follow`). These are interface strings, not business content, and belong
with the component that renders them. They are also the natural first candidates for
extraction if a UI-string catalogue is ever needed for localization.

##### Whitespace and byte-identical output

Astro collapses whitespace runs to a single space and strips newline-indentation at
tag boundaries. Two consequences when moving copy:

- Store strings **whitespace-collapsed** — the form Astro emits, not the wrapped form
  from the source file.
- Inline spaces inside a tag are **significant**. `<a ...> Label </a>` renders with
  spaces around the label; putting the expression on its own line silently removes
  them.

Verify any copy migration with a `dist/` diff, not by eye.

#### Future page generation

Planned pages are described in `pages.ts` with a `status` of `planned` and a
`blockedBy` note explaining what content is missing. **No planned page has a route** —
creating one now would ship an empty page, which is worse than no page for both users
and indexing.

The intended path: author content in `content/`, flip `status` to `published`, then
add the route that reads its `PageDefinition` and renders its `sectionIds`. Division
slugs are already fixed (`advisory`, `it`, `finance`), so those routes can be
generated without renaming anything.

#### Content workflow

1. Identify the owning module from **Data ownership** above.
2. Author or amend the content there — body copy in `sections.ts`, page metadata in
   `pages.ts`, business facts in `company.ts` / `divisions.ts` / `services.ts`.
3. Leave unavailable content as a placeholder — `pendingContent()`, `null`, or `[]`.
   **Never invent** a mission, value, service, capability, statistic, credential, or
   contact detail.
4. Publish by flipping a `status` field, not by editing markup.
5. Run `npm run format && npm run check && npm run lint && npm run build`.
6. For any copy move, diff `dist/` against the previous build. Byte-identical output
   is the only reliable proof that a refactor changed nothing.

Brand colors are the one deliberate duplication: they exist in both `site.ts` and
`src/styles/global.css`, because CSS cannot import from TypeScript at build time.
Keep the two in sync.

#### Division naming convention

Four separate identifiers per division. Changing one never forces a change to the
others.

| Field       | Purpose                    | Rendered where                       |
| :---------- | :------------------------- | :----------------------------------- |
| `id`        | Stable data key            | Never — internal only                |
| `slug`      | URL segment (`/advisory`)  | Routes                               |
| `name`      | **Public brand name**      | Headings, nav, cards, marketing, SEO |
| `legalName` | **Full registered entity** | Contracts, legal pages               |
| `nameAr`    | Arabic name as published   | Cards, footer                        |

Current values:

| id         | name          | legalName               | nameAr                  |
| :--------- | :------------ | :---------------------- | :---------------------- |
| `advisory` | NIVO Advisory | NIVO Advisory Solutions | نيفو للخدمات الاستشارية |
| `it`       | NIVO IT       | _not confirmed_         | نيفو لتقنية المعلومات   |
| `finance`  | NIVO Finance  | _not confirmed_         | نيفو للخدمات المالية    |

`legalName` is `null` where no registered name has been supplied — none is invented.
Use `legalNameOf(division)`, which falls back to `name`. `legalNameArOf()` does the
same for Arabic.

**Open question — English/Arabic asymmetry.** English `name` is now the short brand
form (_NIVO Advisory_), but `nameAr` is the fuller form (_نيفو للخدمات الاستشارية_,
"NIVO for Advisory Services"), which corresponds to the legal name rather than the
brand. Arabic short-brand forms have not been supplied and were not invented. Decide
whether Arabic should follow the brand/legal split, and if so populate `nameAr` with
the short form and move the current values to `legalNameAr`.

#### Division publication gate

Divisions carry a `status`. **Only `active` divisions render** — `siteConfig.divisions`
is pre-filtered. A division can be modeled long before it is announced; publishing it
means flipping its status, nothing else.

| Division      | Status    | Rendered |
| :------------ | :-------- | :------- |
| NIVO Advisory | `active`  | yes      |
| NIVO IT       | `active`  | yes      |
| NIVO Finance  | `planned` | no       |

Use `allDivisions` to reach every division regardless of status.

#### Placeholder fields

These are typed and empty. **Nothing renders them**, so empty values cannot reach the
site. No mission, vision, values, or service list has been supplied, and none has been
invented.

- `company.mission`, `company.vision`, `company.values`
- `division.overview`, `division.longDescription`, `division.capabilities`,
  `division.targetClients`, `division.serviceIds`
- `services` — empty array
- `sections` — empty array
- `pages[].titleAr` and `pages[].sectionIds`; `description` on planned pages
- every `SeoMeta` — all fields null/empty, inheriting site defaults

**No statistics exist.** `sections.ts` defines a `stats` section type, but no figure
has been supplied for NIVO Group and none may be invented. `StatItem.value` is a
string so real figures arrive verbatim from the business.

#### Bilingual structure

`src/content/i18n.ts` defines `Localized<T>` (`{ en, ar }`), locale direction, and
future route prefixes. **Structure only** — no language switcher, no `/en` or `/ar`
routes, no translated pages.

Two conventions coexist on purpose. Legacy short fields use an `Ar` suffix
(`name` / `nameAr`) and are consumed by shipped components; new long-form fields use
`Localized`. Collapsing the first into the second is mechanical but touches every
component, so it belongs in its own phase.

## Commands

| Command                | Action                                 |
| :--------------------- | :------------------------------------- |
| `npm install`          | Install dependencies                   |
| `npm run dev`          | Dev server at `localhost:4321`         |
| `npm run build`        | Production build to `./dist/`          |
| `npm run preview`      | Preview the production build locally   |
| `npm run check`        | `astro check` — TypeScript diagnostics |
| `npm run lint`         | ESLint                                 |
| `npm run format`       | Prettier, write                        |
| `npm run format:check` | Prettier, check only                   |

All of `check`, `lint`, `format:check`, and `build` must pass before a change is complete.

## Required brand assets

The following assets are **not yet available** and are placeholders or absent. No
substitute artwork has been generated — each needs the approved NIVO mark.

| Asset                                 | Status                                                                             |
| :------------------------------------ | :--------------------------------------------------------------------------------- |
| `public/favicon.svg`                  | **Placeholder.** Navy field, gold keyline. Not a logo. Replace with the NIVO mark. |
| `public/favicon.ico`                  | **Placeholder.** 32×32, same device. Replace with the NIVO mark.                   |
| `public/apple-touch-icon.png`         | **Placeholder.** 180×180, same device. Replace with the NIVO mark.                 |
| `public/brand/social/og-image.png`    | **Missing.** 1200×630 social share image.                                          |
| Header/footer logo                    | Text wordmark with a gold keyline stands in for the NIVO mark.                     |
| `public/brand/mascot/nivo-mascot.glb` | **Missing.** The NIVO 3D mascot — see below.                                       |
| `public/brand/logo/`                  | **Empty.** Awaits the approved wordmark and mark files.                            |

Once the share image exists, set `seo.ogImage` in `src/config/site.ts` to
`/brand/social/og-image.png`. While it is `null`, `BaseLayout` omits the `og:image` tag
and uses the `summary` Twitter card, so no broken preview is advertised.

## Planned page hierarchy

Shipped today: `/`, `/contact`, `/privacy`, `/terms`, plus `robots.txt` and the
generated sitemap.

Planned pages and what blocks each are recorded in `src/content/pages.ts` — that
registry, not this table, is the source of truth:

| Route       | Status    | Blocked by                                      |
| :---------- | :-------- | :---------------------------------------------- |
| `/`         | published | —                                               |
| `/contact`  | published | —                                               |
| `/privacy`  | published | —                                               |
| `/terms`    | published | —                                               |
| `/about`    | planned   | `company.mission`, `vision`, `values` are empty |
| `/advisory` | planned   | division overview, capabilities, services empty |
| `/it`       | planned   | division overview, capabilities, services empty |
| `/finance`  | planned   | division status is `planned`; scope unconfirmed |
| `/services` | planned   | services registry is empty                      |
| `/insights` | planned   | no editorial decision or articles               |

Division route segments are already fixed by `Division.slug` (`advisory`, `it`,
`finance`), so those pages can be generated from the content model without renaming
anything.

Localized routes (`/en`, `/ar`) are a routing change and are out of scope until the
bilingual content actually exists.

## NIVO 3D loading experience (not implemented)

Groundwork only. **No 3D library is installed and no 3D code exists** — Three.js and
the mascot assets arrive in the final visual phase.

What is in place:

| Piece             | Location                                        |
| :---------------- | :---------------------------------------------- |
| Loader shell      | `src/components/loading/NivoLoader.astro`       |
| Integration point | `BaseLayout` prop `loader` — defaults `false`   |
| Mascot model      | `public/brand/mascot/nivo-mascot.glb` — missing |
| Loading assets    | `public/brand/loading/` — empty                 |

The shell is **inert**: its root carries the `hidden` attribute, so it never paints
and cannot trap the viewport. That is deliberate. The build currently emits zero
JavaScript, so a visible overlay would have nothing to dismiss it and would cover the
site permanently. Whoever removes `hidden` must add the dismiss logic in the same
change.

Stable hooks for the future script — do not rename:

- `[data-nivo-loader]` — root overlay
- `[data-nivo-loader-stage]` — canvas / mascot mount point

Two constraints for that phase:

- **Do not re-add React.** React was removed in Phase 7 and the site ships no JS. A
  plain Astro `<script>` is sufficient to drive a Three.js scene.
- **Keep the no-JS path working.** If the script fails or never runs, the loader must
  stay hidden and the page must remain fully usable. Honour
  `prefers-reduced-motion`.

Everything under `public/brand/` is served as-is and fetched at runtime by URL, which
is what a `.glb` loader wants. The mascot belongs at exactly
`public/brand/mascot/nivo-mascot.glb` — the future loader script should reference that
path.

## Language

The site is currently English-first, with Arabic used for brand-level content: the
group's Arabic name, the Arabic tagline, and each division's Arabic name. Arabic text
is marked with `lang="ar" dir="rtl"`, and `global.css` resets the negative heading
letter-spacing for Arabic since the script joins its letters.

A full Arabic locale (translated body copy, an `/ar` route, `hreflang` alternates) is
not implemented and remains an open decision.
