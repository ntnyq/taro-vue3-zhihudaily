import { ntnyq } from '@ntnyq/eslint-config'

export default ntnyq({
  ignores: ['./src/index.html'],
  vue: {
    overrides: {
      'vue/prefer-true-attribute-shorthand': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          registeredComponentsOnly: false,
          ignores: [],
        },
      ],
    },
  },
})
