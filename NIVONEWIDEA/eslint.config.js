import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['main.js'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-console': 'warn',
    },
  },
];
