import type { APIRoute } from 'astro';

import { siteConfig } from '../config/site';

/**
 * Generated rather than kept as a static file so the sitemap URL derives from
 * siteConfig.url — the domain is never duplicated.
 *
 * `sitemap-index.xml` is the entry point emitted by @astrojs/sitemap.
 */
const body = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', siteConfig.url).href}
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
