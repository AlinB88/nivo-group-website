/**
 * Page body sections — AUTHORITATIVE.
 *
 * Every sentence rendered in a page body lives here. `.astro` files compose
 * layout and place components; they do not own business text.
 *
 * A section is a discriminated union on `kind`, so a renderer can switch
 * exhaustively and the compiler flags any unhandled variant.
 *
 * Strings that name the company interpolate `company.name` rather than
 * spelling it out, so a rename propagates. Values are stored in their
 * whitespace-collapsed form — the same form Astro emits — so moving copy out
 * of markup does not alter a single byte of output.
 *
 * Arabic is empty on body copy: none has been supplied and none is invented.
 * The one exception is the home hero, whose Arabic tagline is real and comes
 * from company.ts.
 */

import { company } from './company';
import type { Localized } from './i18n';
import { nav } from './navigation';

export type SectionKind = 'hero' | 'text' | 'featureList' | 'cta' | 'timeline' | 'stats' | 'legal';

interface SectionBase {
  /** Stable key, referenced from PageDefinition.sectionIds. */
  id: string;
  kind: SectionKind;
}

export interface SectionLink {
  label: Localized;
  href: string;
  /** Emphasized styling when the renderer supports it. */
  primary?: boolean;
}

export interface HeroSection extends SectionBase {
  kind: 'hero';
  headline: Localized;
  subheadline: Localized;
  /** Supporting paragraph below the subheadline. */
  intro: Localized;
  links: readonly SectionLink[];
}

export interface TextSection extends SectionBase {
  kind: 'text';
  heading: Localized;
  /** Paragraphs, in order. */
  body: readonly Localized[];
}

export interface FeatureItem {
  title: Localized;
  description: Localized;
}

export interface FeatureListSection extends SectionBase {
  kind: 'featureList';
  heading: Localized;
  intro: Localized;
  items: readonly FeatureItem[];
}

export interface CtaSection extends SectionBase {
  kind: 'cta';
  heading: Localized;
  body: Localized;
  link: SectionLink;
}

export interface TimelineEntry {
  /** Free-form so it can hold a year, a quarter, or a phase label. */
  period: string;
  title: Localized;
  description: Localized;
}

export interface TimelineSection extends SectionBase {
  kind: 'timeline';
  heading: Localized;
  entries: readonly TimelineEntry[];
}

/**
 * A single figure.
 *
 * NOTE: no statistics have been supplied for NIVO Group, and none may be
 * invented. `value` is a string so real figures arrive verbatim from the
 * business — never computed or estimated here.
 */
export interface StatItem {
  value: string;
  label: Localized;
}

export interface StatsSection extends SectionBase {
  kind: 'stats';
  heading: Localized;
  items: readonly StatItem[];
}

/** A heading-and-body clause within a legal document. */
export interface LegalClause {
  heading: Localized;
  body: Localized;
}

export interface LegalSection extends SectionBase {
  kind: 'legal';
  /** Standing notice shown above the clauses. Empty to omit. */
  notice: Localized;
  clauses: readonly LegalClause[];
}

export type Section =
  | HeroSection
  | TextSection
  | FeatureListSection
  | CtaSection
  | TimelineSection
  | StatsSection
  | LegalSection;

/** English-only body copy. Arabic pending, never invented. */
const en = (value: string): Localized => ({ en: value, ar: '' });

const contactHref = nav.find((item) => item.cta)?.href ?? '/contact';

/**
 * Standing notice on both legal pages. One constant so the two cannot drift.
 * Remove it only when reviewed copy replaces the placeholder wording.
 */
const LEGAL_NOTICE = en(
  'Placeholder wording pending review. It describes current practice in plain terms and is not a legal agreement.'
);

export const sections: readonly Section[] = [
  // ---------------------------------------------------------------- home
  {
    id: 'home.hero',
    kind: 'hero',
    headline: { en: company.name, ar: company.nameAr },
    // Both languages are real here — see company.tagline.
    subheadline: company.tagline,
    intro: en(company.heroIntro),
    links: [
      { label: en('Explore Divisions'), href: '#divisions', primary: true },
      { label: en('Contact Us'), href: contactHref, primary: false },
    ],
  },
  {
    id: 'home.about',
    kind: 'text',
    heading: en(`About ${company.name}`),
    body: [en(company.description)],
  },
  {
    id: 'home.approach',
    kind: 'text',
    heading: en('Our Approach'),
    body: [en(`The principles that shape how ${company.name} works, across every division.`)],
  },
  {
    id: 'home.divisions',
    kind: 'text',
    heading: en('Our Divisions'),
    body: [
      en(
        `Each division operates in its own field while sharing the standards, expertise, and vision of ${company.name}.`
      ),
    ],
  },
  {
    id: 'home.contact',
    kind: 'cta',
    heading: en(`Work with ${company.name}`),
    body: en(
      'Tell us what your organization is working toward, and we will connect you with the division best suited to support your goals.'
    ),
    link: { label: en('Contact Us'), href: contactHref, primary: true },
  },

  // ------------------------------------------------------------- contact
  {
    id: 'contact.hero',
    kind: 'hero',
    headline: en(`Contact ${company.name}`),
    subheadline: en(''),
    intro: en(
      'Tell us what your organization is working toward and we will direct your enquiry to the division best suited to help. If you already know which division you need, reaching it directly is faster.'
    ),
    links: [],
  },
  {
    id: 'contact.details',
    kind: 'text',
    heading: en('Group contact information'),
    // Shown only while every contact field is null.
    body: [
      en(
        'Group contact channels are being finalized. Until they are published, each division below can be reached through its own website.'
      ),
    ],
  },
  {
    id: 'contact.divisions',
    kind: 'text',
    heading: en('Which division to contact'),
    body: [
      en(
        `${company.name} operates through specialized divisions. Enquiries are handled by the division that owns the work, so contacting one directly avoids a hand-off.`
      ),
    ],
  },

  // ------------------------------------------------------------- privacy
  {
    id: 'privacy.body',
    kind: 'legal',
    notice: LEGAL_NOTICE,
    clauses: [
      {
        heading: en('Scope'),
        body: en(
          `This notice describes how the ${company.name} website handles visitor information. Each division operates its own website under its own notice.`
        ),
      },
      {
        heading: en('Information we collect'),
        body: en(
          'This website is published as static pages. It does not host accounts, forms, or payment functionality, and it does not ask visitors to submit personal information.'
        ),
      },
      {
        heading: en('Hosting and technical records'),
        body: en(
          'Like most websites, the hosting provider may record standard technical information such as requested pages, approximate location, and browser type. These records are used to keep the site available and secure.'
        ),
      },
      {
        heading: en('Correspondence'),
        body: en(
          'If you contact us, we use the details you provide to respond to your enquiry and to route it to the appropriate division.'
        ),
      },
      {
        heading: en('Third-party sites'),
        body: en(
          'Links to division websites and other external sites are provided for convenience. Once you leave this site, the destination site governs how your information is handled.'
        ),
      },
      {
        heading: en('Questions'),
        body: en('Questions about this notice can be raised through the contact page.'),
      },
    ],
  },

  // --------------------------------------------------------------- terms
  {
    id: 'terms.body',
    kind: 'legal',
    notice: LEGAL_NOTICE,
    clauses: [
      {
        heading: en('Using this website'),
        body: en(
          `This website introduces ${company.name} and its divisions. You are welcome to read, reference, and share its pages.`
        ),
      },
      {
        heading: en('Purpose of the content'),
        body: en(
          'The material here is general information about the group and how it is organized. It is not advice, and it is not an offer to provide services.'
        ),
      },
      {
        heading: en('Division websites'),
        body: en(
          'Each division publishes its own website covering its services and engagement terms. Where those terms differ from this page, the division site applies to work with that division.'
        ),
      },
      {
        heading: en('Accuracy'),
        body: en(
          'Content is reviewed periodically and may change without notice. We aim to keep it current but do not guarantee that every page is complete or up to date at all times.'
        ),
      },
      {
        heading: en('Brand and content'),
        body: en(
          `The ${company.name} name, division names, and the material on this site belong to the group. Please ask before reproducing them commercially.`
        ),
      },
      {
        heading: en('Questions'),
        body: en('Questions about these terms can be raised through the contact page.'),
      },
    ],
  },
];

/** Look up a section. Returns undefined rather than throwing. */
export const getSection = (id: string): Section | undefined =>
  sections.find((section) => section.id === id);

/** Resolve ids to sections, silently dropping any that are missing. */
export const getSections = (ids: readonly string[]): readonly Section[] =>
  ids.map(getSection).filter((section): section is Section => section !== undefined);

/**
 * Narrowing lookup. Returns undefined when the id is unknown OR when the
 * section is not of the expected kind, so a caller can never mis-render one
 * section type as another.
 */
export const getSectionOfKind = <K extends SectionKind>(
  id: string,
  kind: K
): Extract<Section, { kind: K }> | undefined => {
  const section = getSection(id);
  return section?.kind === kind ? (section as Extract<Section, { kind: K }>) : undefined;
};
