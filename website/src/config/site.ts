/**
 * Composition root for site data.
 *
 * Content now lives in src/content/ — this file assembles it and holds the
 * genuinely configuration-shaped values (canonical URL, SEO defaults, brand
 * colors).
 *
 * `siteConfig` keeps the exact shape components already consume, so this
 * reorganization required no component changes. Import from here for anything
 * a page renders; import from src/content/ directly when you need the richer
 * model (division status, services, localized fields).
 */

import { company, type ApproachPrinciple, type ContactDetails } from '../content/company';
import { activeDivisions, divisions as allDivisions, type Division } from '../content/divisions';
import { legal, nav, type NavItem } from '../content/navigation';

export type { ApproachPrinciple, ContactDetails, Division, NavItem };

// Re-exported so pages can reach the full model without a second import path.
export { allDivisions };
export { services, getServicesForDivision, type Service } from '../content/services';
export {
  getDivision,
  getDivisionBySlug,
  legalNameOf,
  legalNameArOf,
  type DivisionId,
  type DivisionStatus,
} from '../content/divisions';
export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_DIRECTION,
  hasContent,
  type Locale,
  type Localized,
} from '../content/i18n';

export interface BrandColors {
  /** Primary brand color */
  navy: string;

  /** Premium accent color */
  gold: string;
}

export interface SeoConfig {
  /** Home page <title>. Inner pages render "Page Title | NIVO Group". */
  defaultTitle: string;

  /** Meta and OpenGraph description. Kept under 160 characters. */
  metaDescription: string;

  /** BCP-47 locale of the site's primary language. */
  locale: string;

  /**
   * Site-root-relative path to the OpenGraph share image, or null until the
   * artwork exists. Null suppresses the og:image tag and downgrades the
   * Twitter card to `summary`, so the site never advertises a broken preview.
   */
  ogImage: string | null;
}

export interface SiteConfig {
  name: string;
  nameAr: string;
  url: string;

  description: string;

  philosophy: string;
  taglineAr: string;

  heroIntro: string;

  /** Footer signature line. */
  signature: string;

  colors: BrandColors;

  seo: SeoConfig;

  nav: readonly NavItem[];

  /** Secondary footer-only links. Never shown in the header. */
  legal: readonly NavItem[];

  approach: readonly ApproachPrinciple[];

  /**
   * Public divisions only. Divisions with status other than 'active' are
   * modeled in src/content/divisions.ts but never rendered — use
   * `allDivisions` to reach them.
   */
  divisions: readonly Division[];

  contact: ContactDetails;
}

export const siteConfig: SiteConfig = {
  name: company.name,
  nameAr: company.nameAr,
  url: company.url,

  description: company.description,

  philosophy: company.philosophy,
  taglineAr: company.taglineAr,

  heroIntro: company.heroIntro,

  signature: company.signature,

  colors: {
    navy: '#0B1F3A',
    gold: '#C8A951',
  },

  seo: {
    defaultTitle: 'NIVO Group | Advisory and Technology Divisions',

    metaDescription:
      'NIVO Group is a strategic group of specialized divisions in advisory and technology, supporting organizations with growth and operational excellence.',

    locale: 'en',

    // No approved share artwork yet — see README for the required asset.
    ogImage: null,
  },

  nav,
  legal,

  approach: company.approach,

  divisions: activeDivisions,

  contact: company.contact,
};
