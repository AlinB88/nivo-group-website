import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', '.astro/'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...astro.configs.recommended,

  // Must stay last: disables rules that conflict with Prettier formatting.
  prettier
);
