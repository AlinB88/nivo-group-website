/**
 * Per-entity SEO metadata.
 *
 * Distinct from `siteConfig.seo`, which holds site-wide defaults and IS wired
 * into BaseLayout. This model describes overrides for an individual page or
 * division.
 *
 * MODEL ONLY — nothing here is read by BaseLayout yet. Wiring it would add
 * `<meta name="robots">` and `<meta name="keywords">` to rendered output, which
 * is a change to shipped pages and belongs in its own step. Until then, every
 * field is a null/empty placeholder and the site's existing SEO behaviour is
 * untouched.
 */

/** Standard robots directives. Anything else is a mistake waiting to happen. */
export type RobotsDirective =
  'index,follow' | 'noindex,follow' | 'index,nofollow' | 'noindex,nofollow';

export interface SeoMeta {
  /** Overrides the derived page title. Null = derive as today. */
  title: string | null;

  /** Overrides the description. Null = fall back to siteConfig.seo. */
  description: string | null;

  /**
   * Keywords are near-worthless for ranking and actively harmful when stuffed.
   * Empty by default; populate only with terms NIVO genuinely uses.
   */
  keywords: readonly string[];

  /** Site-root-relative share image. Null = fall back to siteConfig.seo. */
  ogImage: string | null;

  /**
   * Site-root-relative canonical path. Null = derive from the route, which is
   * what BaseLayout does today and is correct for every current page.
   */
  canonicalPath: string | null;

  robots: RobotsDirective;
}

/** Inherit everything from site-level defaults. */
export const defaultSeo = (): SeoMeta => ({
  title: null,
  description: null,
  keywords: [],
  ogImage: null,
  canonicalPath: null,
  robots: 'index,follow',
});

/** For pages that exist but must stay out of search results. */
export const noindexSeo = (): SeoMeta => ({
  ...defaultSeo(),
  robots: 'noindex,follow',
});
