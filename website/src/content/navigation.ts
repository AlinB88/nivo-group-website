/**
 * Site navigation.
 *
 * Homepage sections are addressed root-relative (/#about, not #about) so the
 * same nav resolves correctly from /contact and any future inner page.
 */

export interface NavItem {
  label: string;
  href: string;

  /** Rendered as the emphasized header CTA rather than a plain nav link. */
  cta?: boolean;
}

export const nav: readonly NavItem[] = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Approach',
    href: '/#approach',
  },
  {
    label: 'Divisions',
    href: '/divisions',
  },
  {
    label: 'Contact',
    href: '/contact',
    cta: true,
  },
];

/** Secondary footer-only links. Never shown in the header. */
export const legal: readonly NavItem[] = [
  {
    label: 'Privacy',
    href: '/privacy',
  },
  {
    label: 'Terms',
    href: '/terms',
  },
];
