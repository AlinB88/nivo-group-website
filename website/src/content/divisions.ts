/**
 * NIVO Group divisions.
 *
 * NAMING MODEL — four distinct identifiers per division, so a change to one
 * never forces a change to the others:
 *
 *   id         stable data key. Never rendered, never changes.
 *   slug       URL segment. Mirrors id today, but kept separate so a route
 *              can be renamed without breaking every data reference.
 *   name       public brand name. Headings, navigation, cards, marketing.
 *   legalName  full registered entity. Contracts and legal pages only.
 *
 * `description` stays a plain string because DivisionCard and the contact page
 * already render it; renaming it would be a component refactor. Fields added
 * for future phases use Localized and are empty until real information is
 * supplied.
 *
 * PUBLICATION GATE: only divisions with `status: 'active'` are rendered. A
 * division can be modeled here long before it is announced. Nothing else needs
 * to change to publish one — flip its status.
 */

import type { ContactDetails } from './company';
import { pendingContent, type Localized } from './i18n';
import { defaultSeo, type SeoMeta } from './seo';

export type DivisionId = 'advisory' | 'it' | 'finance';

/**
 * - `active`   — announced and rendered on the site
 * - `planned`  — modeled but not published; rendered nowhere
 * - `retired`  — kept for history; rendered nowhere
 */
export type DivisionStatus = 'active' | 'planned' | 'retired';

export interface Division {
  /** Stable data key. Never rendered. */
  id: DivisionId;

  /** URL segment, e.g. /advisory. Mirrors `id` unless a route is renamed. */
  slug: string;

  /** Public brand name — headings, navigation, cards, marketing. */
  name: string;

  /**
   * Full registered entity name, for contracts and legal pages.
   * Null where the registered name has not been confirmed — consumers should
   * fall back to `name` via `legalNameOf()`.
   */
  legalName: string | null;

  /** Arabic name as currently published. */
  nameAr: string;

  /** Arabic registered entity name. Null until confirmed. */
  legalNameAr: string | null;

  /** Card-length summary. Rendered today. */
  description: string;

  /**
   * Opening paragraph for a future division page — a step longer than
   * `description`, shorter than `longDescription`. Not yet supplied.
   */
  overview: Localized;

  /** Full division narrative. Not yet supplied, renders nowhere. */
  longDescription: Localized;

  /**
   * What the division can do, as short phrases.
   *
   * Distinct from `serviceIds`: capabilities describe competence, services are
   * discrete offerings with their own records. Empty — no capability list has
   * been supplied and none is invented.
   */
  capabilities: readonly Localized[];

  /** Service ids owned by this division — see services.ts. */
  serviceIds: readonly string[];

  /** Sectors or organization types served. Not yet supplied. */
  targetClients: readonly Localized[];

  /** Division website, or null while it has none. */
  url: string | null;

  /** Division-level contact, independent of the group's. */
  contact: ContactDetails;

  status: DivisionStatus;

  /** SEO overrides for a future division page. Inherits site defaults today. */
  seo: SeoMeta;

  /** Open bag for future metadata so the interface need not change again. */
  meta: Readonly<Record<string, string>>;
}

const noContact: ContactDetails = {
  email: null,
  phone: null,
  location: null,
};

export const divisions: readonly Division[] = [
  {
    id: 'advisory',
    slug: 'advisory',

    name: 'NIVO Advisory Services',
    legalName: 'NIVO Advisory Solutions',

    nameAr: 'نيفو للخدمات الاستشارية',
    legalNameAr: null,

    description:
      'Strategy, organizational structure, and operational performance — advisory work that turns analysis into decisions an organization can act on.',

    overview: pendingContent(),
    longDescription: pendingContent(),
    capabilities: [],
    serviceIds: [],
    targetClients: [],

    url: 'https://advisory.nivogroup.ly',
    contact: noContact,
    status: 'active',
    seo: defaultSeo(),
    meta: {},
  },

  {
    id: 'it',
    slug: 'it',

    name: 'NIVO IT Services',
    // No distinct registered name supplied — none invented.
    legalName: null,

    nameAr: 'نيفو لتقنية المعلومات',
    legalNameAr: null,

    description:
      'Technology and digital infrastructure services, helping organizations modernize their systems and operate on dependable, well-governed technology.',

    overview: pendingContent(),
    longDescription: pendingContent(),
    capabilities: [],
    serviceIds: [],
    targetClients: [],

    url: 'https://it.nivogroup.ly',
    contact: noContact,
    status: 'active',
    seo: defaultSeo(),
    meta: {},
  },

  {
    id: 'finance',
    slug: 'finance',

    name: 'NIVO Finance',
    legalName: null,

    nameAr: 'نيفو للخدمات المالية',
    legalNameAr: null,

    // Placeholder: no scope, services, or positioning supplied for this
    // division yet. Deliberately generic — nothing is claimed.
    description: 'Financial services division. Scope and offering to be confirmed.',

    overview: pendingContent(),
    longDescription: pendingContent(),
    capabilities: [],
    serviceIds: [],
    targetClients: [],

    url: null,
    contact: noContact,
    status: 'planned',
    seo: defaultSeo(),
    meta: {},
  },
];

/** Divisions cleared for public display. */
export const activeDivisions: readonly Division[] = divisions.filter(
  (division) => division.status === 'active'
);

export const getDivision = (id: DivisionId): Division | undefined =>
  divisions.find((division) => division.id === id);

export const getDivisionBySlug = (slug: string): Division | undefined =>
  divisions.find((division) => division.slug === slug);

/** Registered name where confirmed, otherwise the public brand name. */
export const legalNameOf = (division: Division): string => division.legalName ?? division.name;

/** Arabic registered name where confirmed, otherwise the published Arabic name. */
export const legalNameArOf = (division: Division): string =>
  division.legalNameAr ?? division.nameAr;
