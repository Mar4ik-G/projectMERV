import eslintJs from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier'; // Keep prettier plugin

export default [
  {
    ignores: ['dist', 'node_modules', 'tailwind.config.js'],
  },
  eslintJs.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly', // Ensure document is recognized as a global
        window: 'readonly', // Ensure window is recognized as a global
        module: 'readonly', // Ensure module is recognized for CommonJS files
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      prettier: prettierPlugin, // Register prettier plugin
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'prettier/prettier': 'error', // Ensure prettier is being enforced
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
