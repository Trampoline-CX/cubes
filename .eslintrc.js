module.exports = {
  env: {
    es6: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  plugins: [
    'jsdoc',
    'jest',
    'import',
    '@typescript-eslint',
    'prefer-arrow',
    'prettier',
    'react',
    'react-native',
    'react-hooks',
  ],
  rules: {
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-jsdoc': 'off',
    'jest/expect-expect': ['warn', { assertFunctionNames: ['expect', 'expectObservable'] }],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            // Make sure to consider packages starting with @ as external packages
            // (for Typescript Path aliases, to match Typescript Organize Imports).
            pattern: '@**',
            group: 'external',
          },
        ],
      },
    ],
    'import/named': 'off', // As this is handled by Typescript
    'import/namespace': 'off', // As this is handled by Typescript
    'import/default': 'off', // As this is handled by Typescript
    'import/no-named-as-default-member': 'off', // As this is handled by Typescript
    'import/no-named-as-default': 'off', // Causing errors with Typescript
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
    ],
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/unified-signatures': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      { functions: false, classes: false, variables: false },
    ],
    '@typescript-eslint/no-namespace': 'off',
    'prefer-arrow/prefer-arrow-functions': 'error',
    'prettier/prettier': 'error',
    'arrow-body-style': 'warn',
    'constructor-super': 'error',
    curly: 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': ['error', 'any', 'Number', 'String', 'string', 'Boolean', 'boolean'],
    'id-match': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'no-eval': 'error',
    'no-new-wrappers': 'error',
    'no-shadow': [
      'error',
      {
        hoist: 'all',
      },
    ],
    'no-throw-literal': 'error',
    'no-undef': 'off', // We turn this off because it is having false positives in some typescript code. TODO Turn on when fixed.
    'no-undef-init': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    radix: 'error',

    'import/no-unresolved': ['error', { ignore: ['^plaid-link$'] }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-no-bind': 'error',
    'react/self-closing-comp': 'error',
    'react/prop-types': 'off', // Because we use Typescript, this is redundant
    'react/display-name': 'off',
    'react-native/sort-styles': 'off',
    'react-native/no-raw-text': [
      'error',
      {
        skip: [
          'Button',
          'DisplayText',
          'Heading',
          'BodyText',
          'Caption',
          'TextStyle',
          'Link',
          'LinkButton',
          'Badge',
          'HeaderActionButton',
          'Pill',
          'Alert',
        ],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off', // TODO: Temporary off because the auto-fixing of it causes too many issues. Please put at warn again with correct fix when this GitHub issue gets resolved: https://github.com/facebook/react/issues/15204
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'react/jsx-no-bind': 'off',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
}
