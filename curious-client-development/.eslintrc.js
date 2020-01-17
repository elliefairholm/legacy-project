module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
  ],
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/extensions': ['.js', '.tsx', '.jsx', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        'extensions': ['.js', '.tsx', '.jsx', '.ts'],
      }
    }
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.tsx'] }],
  },
}