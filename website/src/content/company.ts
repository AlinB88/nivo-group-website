/**
 * NIVO Group parent identity.
 *
 * Fields consumed by shipped pages carry approved copy and are unchanged.
 * Fields added for future phases (mission, vision, values) are neutral
 * placeholders — no mission or value statement has been supplied, and none is
 * invented here. Nothing renders them, so the site's appearance is unaffected.
 *
 * Supports a future /about page. That page is not created: it would be empty
 * until mission, vision, and values are written.
 */

import { pendingContent, type Localized } from './i18n';

/**
 * Published contact details. Every field is null until real information is
 * supplied; pages render a "To be provided" placeholder rather than inventing
 * an address, number, or office.
 */
export interface ContactDetails {
  email: string | null;
  phone: string | null;
  location: string | null;
}

/** A named organizational value. Placeholder until values are approved. */
export interface CompanyValue {
  title: Localized;
  description: Localized;
}

/**
 * How the group operates. These are organizational principles, not a service
 * catalogue — services belong to divisions.
 */
export interface ApproachPrinciple {
  title: string;
  description: string;
}

export interface Company {
  name: string;
  nameAr: string;
  url: string;

  /**
   * The group's positioning line in both languages.
   *
   * `philosophy` and `taglineAr` below are the same two strings in the shape
   * shipped components already consume. All three read from one source, so
   * they cannot drift.
   */
  tagline: Localized;

  /** English tagline. Rendered in the hero. */
  philosophy: string;

  /** Arabic tagline. Rendered in the hero and footer. */
  taglineAr: string;

  /** Supporting hero paragraph. */
  heroIntro: string;

  /** About-section paragraph. */
  description: string;

  /** Footer signature line. */
  signature: string;

  /** Not yet supplied. Renders nowhere. */
  mission: Localized;

  /** Not yet supplied. Renders nowhere. */
  vision: Localized;

  /** Not yet supplied. Renders nowhere. */
  values: readonly CompanyValue[];

  approach: readonly ApproachPrinciple[];

  contact: ContactDetails;
}

/**
 * Single source for the positioning line, exposed below in both the
 * `Localized` shape and the flat fields components already read.
 */
const TAGLINE: Localized = {
  en: 'A strategic group of specialized divisions, built to help organizations grow with clarity and operate with confidence.',
  ar: 'مجموعة استراتيجية تضم قطاعات متخصصة، تدعم نمو المؤسسات وترتقي بكفاءتها التشغيلية',
};

export const company: Company = {
  name: 'NIVO Group',
  nameAr: 'مجموعة نيفو',

  url: 'https://nivogroup.ly',

  tagline: TAGLINE,
  philosophy: TAGLINE.en,
  taglineAr: TAGLINE.ar,

  heroIntro:
    'NIVO Group builds and supports specialized divisions, each focused on a distinct field of expertise and each accountable to the same standards.',

  description:
    'NIVO Group is a holding organization that builds and supports specialized business divisions. Each division operates in its own field, guided by shared standards of operational excellence and a commitment to long-term partnerships. The role of the group is to provide the structure, governance, and strategic direction that allow those divisions to grow and to serve their clients well.',

  signature: 'Built by NIVO',

  // Awaiting approved wording — see README.
  mission: pendingContent(),
  vision: pendingContent(),
  values: [],

  approach: [
    {
      title: 'Strategy',
      description:
        'Decisions are grounded in analysis and a clear view of what an organization is working toward.',
    },
    {
      title: 'Expertise',
      description:
        'Each division is built around a defined field rather than a general service offering.',
    },
    {
      title: 'Innovation',
      description:
        'New methods and technology are adopted where they improve outcomes, not for their own sake.',
    },
    {
      title: 'Partnership',
      description:
        'Engagements are structured for long-term working relationships rather than one-off delivery.',
    },
  ],

  contact: {
    email: null,
    phone: null,
    location: null,
  },
};
