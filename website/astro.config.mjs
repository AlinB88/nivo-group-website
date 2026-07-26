// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nivogroup.ly',

  // Auto-discovers static routes, so new pages enter the sitemap without a
  // code change. Build-time only — ships no runtime JavaScript.
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
