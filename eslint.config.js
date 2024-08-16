module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error', // Show Prettier errors as ESLint errors
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'react-hooks/rules-of-hooks': 'error', // Checks rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
