/**
 * Single source of truth for NIVO Group information.
 *
 * All brand, company, and navigation data should originate here.
 * Components and pages consume this configuration instead of hardcoding
 * business information.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface BrandColors {
  /** Primary brand color */
  navy: string;

  /** Premium accent color */
  gold: string;
}

export interface Division {
  name: string;
  nameAr: string;
  description: string;
  url: string | null;
}

export interface SiteConfig {
  name: string;
  nameAr: string;
  url: string;

  description: string;

  philosophy: string;
  taglineAr: string;

  colors: BrandColors;

  nav: readonly NavItem[];

  divisions: readonly Division[];
}

export const siteConfig: SiteConfig = {
  name: 'NIVO Group',
  nameAr: 'مجموعة نيفو',

  url: 'https://nivogroup.ly',

  description:
    'NIVO Group is a diversified organization focused on building businesses, delivering strategic solutions, and creating sustainable value through expertise and innovation.',

  philosophy: 'Connecting expertise, innovation, and opportunity to create lasting value.',

  taglineAr: 'نربط الخبرة والابتكار والفرص لصناعة قيمة مستدامة',

  colors: {
    navy: '#0B1F3A',
    gold: '#C8A951',
  },

  nav: [
    {
      label: 'About',
      href: '#about',
    },
    {
      label: 'Divisions',
      href: '#divisions',
    },
    {
      label: 'Contact',
      href: '#contact',
    },
  ],
  divisions: [
    {
      name: 'NIVO Advisory Solutions',
      nameAr: 'نيفو للخدمات الاستشارية',

      description:
        'Strategic consulting and business advisory solutions designed to improve performance and support growth.',

      url: 'https://advisory.nivogroup.ly',
    },

    {
      name: 'NIVO IT Services',
      nameAr: 'نيفو لتقنية المعلومات',

      description:
        'Technology solutions, digital transformation, and modern IT services for organizations.',

      url: 'https://it.nivogroup.ly',
    },
  ],
};
