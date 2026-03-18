import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
    },
  },
  {
    files: ['__tests__/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
    },
  },
];
