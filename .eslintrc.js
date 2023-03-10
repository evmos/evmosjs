const common = {
  env: {
    node: true,
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  plugins: ['jest', 'prettier'],
  extends: ['airbnb-base', 'plugin:jest/all', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest/expect-expect': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/no-test-return-statement': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'no-iterator': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.ts', '**/tests/**/*', 'jest.config.js'],
      },
    ],
  },
}

module.exports = {
  root: true,
  overrides: [
    {
      /*
      eslint-plugin-markdown only finds javascript code block snippet.
      For specific spec, refer to https://github.com/eslint/eslint-plugin-markdown
      */
      files: ['**/*.js', '**/*.md'],
      ...common,
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: './',
      },
      env: common.env,
      plugins: [
        ...common.plugins,
        '@typescript-eslint',
        'eslint-plugin-tsdoc',
        'import',
      ],
      extends: [
        ...common.extends,
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      rules: {
        ...common.rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        'tsdoc/syntax': 'warn',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            project: ['./tsconfig.json', 'packages/*/tsconfig.json'],
          },
          node: {
            project: ['./tsconfig.json', 'packages/*/tsconfig.json'],
          },
        },
      },
    },
  ],
}
