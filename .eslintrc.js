module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'comma-dangle': 2,
    'import/prefer-default-export': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'max-len': [2, 100, 2, {
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'prefer-destructuring': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
