import { ntnyq, pluginVue } from '@ntnyq/eslint-config'

export default ntnyq([
  {
    ignores: ['./src/index.html'],
  },
  {
    plugins: {
      vue: pluginVue,
    },
    rules: {
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
])
