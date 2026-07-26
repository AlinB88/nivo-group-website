/**
 * Bilingual content primitives.
 *
 * STRUCTURE ONLY — no language switcher, no /en or /ar routes, and no
 * translated pages exist yet. This file defines the shape that future
 * localization will use so content authored now does not need reshaping later.
 *
 * Two conventions coexist deliberately:
 *
 *   - Legacy short fields use an `Ar` suffix (`name` / `nameAr`). These are
 *     consumed by shipped components and are left alone to avoid a refactor.
 *   - New long-form content uses `Localized<T>`.
 *
 * Collapsing the first into the second is a mechanical migration, but it
 * touches every component, so it belongs in its own phase.
 */

export const LOCALES = ['en', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Writing direction per locale — drives `dir` on future localized routes. */
export const LOCALE_DIRECTION: Readonly<Record<Locale, 'ltr' | 'rtl'>> = {
  en: 'ltr',
  ar: 'rtl',
};

/**
 * Future route prefix per locale. Unused today: the site serves English at the
 * root with no prefix. Adding `/en` and `/ar` is a routing change and is
 * explicitly out of scope for this phase.
 */
export const LOCALE_ROUTE_PREFIX: Readonly<Record<Locale, string>> = {
  en: '/en',
  ar: '/ar',
};

/** A value carried in every supported language. */
export type Localized<T = string> = Readonly<Record<Locale, T>>;

/**
 * English supplied, Arabic pending translation.
 *
 * An empty string is the agreed "not yet written" marker. Nothing renders
 * these fields today, so an empty Arabic value cannot surface on the site.
 */
export const pendingAr = (en: string): Localized => ({ en, ar: '' });

/** Neither language written yet. */
export const pendingContent = (): Localized => ({ en: '', ar: '' });

/** True when a localized value has content for the given locale. */
export const hasContent = (value: Localized, locale: Locale = DEFAULT_LOCALE): boolean =>
  value[locale].trim().length > 0;
