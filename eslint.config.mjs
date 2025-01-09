// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['./src/index.html'],
  vue: {
    overrides: {
      'vue/prefer-true-attribute-shorthand': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          ignores: [],
          registeredComponentsOnly: false,
        },
      ],
    },
  },
})
