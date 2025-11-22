import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import json from 'eslint-plugin-json'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'playwright-report',
      'test-results',
      '.DS_Store',
      'package-lock.json',
    ],
  },

  // JS/TS Config
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    extends: [js.configs.recommended, eslintConfigPrettier],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },

  // TS Config
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // React Config
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // JSON Config
  {
    files: ['**/*.json'],
    plugins: {
      json,
    },
    processor: json.processors['.json'],
    rules: json.configs.recommended.rules,
  },
)
