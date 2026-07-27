/**
 * Page metadata registry — AUTHORITATIVE.
 *
 * Titles, descriptions, and SEO for every route are owned here. The `.astro`
 * files render this data; they do not declare it. A page that needs different
 * metadata is edited in this file, not in markup.
 *
 * `planned` pages have no route. They are described here so a future generator
 * can create them from data — but only once their content exists. Creating them
 * now would ship empty pages, which is worse than no page for users and for
 * indexing. `blockedBy` records what each one is waiting on.
 *
 * Imports `company` rather than `siteConfig` on purpose: config/site.ts
 * composes the content modules, so importing it here would create a cycle.
 */

import { company } from './company';
import { getSections, type Section } from './sections';
import { defaultSeo, noindexSeo, type SeoMeta } from './seo';

export type PageStatus = 'published' | 'planned';

export interface PageDefinition {
  /** Route path, leading slash, no trailing slash except root. */
  slug: string;

  /**
   * Page title, without the brand suffix — BaseLayout renders
   * "Title | NIVO Group". Set `seo.title` instead for an absolute title.
   */
  title: string;

  /** Arabic title. Empty where no Arabic title has been supplied. */
  titleAr: string;

  /** Meta description. Empty inherits the site-level description. */
  description: string;

  seo: SeoMeta;

  /** Section ids composing the page body — see sections.ts. */
  sectionIds: readonly string[];

  status: PageStatus;

  /** Why a planned page is not built yet. Empty for published pages. */
  blockedBy: string;
}

export const pages: readonly PageDefinition[] = [
  {
    slug: '/',
    title: company.name,
    titleAr: company.nameAr,
    // Empty: the home page inherits siteConfig.seo.metaDescription, and the
    // root title comes from siteConfig.seo.defaultTitle.
    description: '',
    seo: defaultSeo(),
    sectionIds: ['home.hero', 'home.about', 'home.approach', 'group.divisions', 'group.contact'],
    status: 'published',
    blockedBy: '',
  },
  {
    slug: '/contact',
    title: 'Contact',
    titleAr: '',
    description: `Contact ${company.name} about its advisory and technology divisions, or reach a division directly.`,
    seo: defaultSeo(),
    sectionIds: ['contact.hero', 'contact.details', 'contact.divisions'],
    status: 'published',
    blockedBy: '',
  },
  {
    slug: '/divisions',
    title: 'Divisions',
    titleAr: '',
    description: `Explore the specialized divisions of ${company.name}.`,
    seo: defaultSeo(),
    sectionIds: ['group.divisions', 'group.contact'],
    status: 'published',
    blockedBy: '',
  },
  {
    slug: '/privacy',
    title: 'Privacy',
    titleAr: '',
    description: `How the ${company.name} website handles visitor information.`,
    seo: defaultSeo(),
    sectionIds: ['privacy.body'],
    status: 'published',
    blockedBy: '',
  },
  {
    slug: '/terms',
    title: 'Terms',
    titleAr: '',
    description: `Terms covering use of the ${company.name} website.`,
    seo: defaultSeo(),
    sectionIds: ['terms.body'],
    status: 'published',
    blockedBy: '',
  },
  {
    // Astro emits this as the static fallback page. Keep it noindex so it is
    // available to visitors but never competes with a real destination.
    slug: '/404',
    title: 'Page not found',
    titleAr: '',
    description: `The requested ${company.name} page could not be found.`,
    seo: noindexSeo(),
    sectionIds: ['not-found.hero'],
    status: 'published',
    blockedBy: '',
  },

  {
    slug: '/about',
    title: 'About',
    titleAr: '',
    description: '',
    seo: defaultSeo(),
    sectionIds: [],
    status: 'planned',
    blockedBy: 'company.mission, company.vision and company.values are empty',
  },
  {
    slug: '/advisory',
    title: 'NIVO Advisory Services',
    titleAr: '',
    description: '',
    seo: defaultSeo(),
    sectionIds: [],
    status: 'planned',
    blockedBy: 'division overview, capabilities and services are empty',
  },
  {
    slug: '/it',
    title: 'NIVO IT Services',
    titleAr: '',
    description: '',
    seo: defaultSeo(),
    sectionIds: [],
    status: 'planned',
    blockedBy: 'division overview, capabilities and services are empty',
  },
  {
    slug: '/finance',
    title: 'NIVO Finance',
    titleAr: '',
    description: '',
    seo: defaultSeo(),
    sectionIds: [],
    status: 'planned',
    blockedBy: 'division status is planned; scope not confirmed',
  },
  {
    slug: '/services',
    title: 'Services',
    titleAr: '',
    description: '',
    seo: defaultSeo(),
    sectionIds: [],
    status: 'planned',
    blockedBy: 'services registry is empty',
  },
  {
    slug: '/insights',
    title: 'Insights',
    titleAr: '',
    description: '',
    seo: defaultSeo(),
    sectionIds: [],
    status: 'planned',
    blockedBy: 'no editorial decision or articles',
  },
];

/**
 * Look up a page. Returns undefined for an unregistered slug rather than
 * throwing — a metadata gap must not fail the build. BaseLayout falls back to
 * site-level defaults and warns during the build instead.
 */
export const getPage = (slug: string): PageDefinition | undefined =>
  pages.find((page) => page.slug === slug);

/** Pages with a live route today. */
export const getPublishedPages = (): readonly PageDefinition[] =>
  pages.filter((page) => page.status === 'published');

/** Pages awaiting content. Each carries a `blockedBy` reason. */
export const getPlannedPages = (): readonly PageDefinition[] =>
  pages.filter((page) => page.status === 'planned');

/** A page's description, or empty when unregistered. Never throws. */
export const getPageDescription = (slug: string): string => getPage(slug)?.description ?? '';

/**
 * Sections composing a page, in order. Returns an empty array for an
 * unregistered slug, and silently drops ids with no matching section — a
 * content gap renders less, it never fails the build.
 */
export const getPageSections = (slug: string): readonly Section[] =>
  getSections(getPage(slug)?.sectionIds ?? []);
