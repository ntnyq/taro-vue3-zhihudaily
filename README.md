# starter-taro-vue

[![CI](https://github.com/ntnyq/starter-taro-vue/workflows/CI/badge.svg)](https://github.com/ntnyq/starter-taro-vue/actions)

> Wechat App starter kit based on Taro and Vue v3.

## Development

[pnpm](https://pnpm.io) is required.

```sh
# Install deps
$ pnpm install

# Build for development
$ pnpm run dev

# Build for production
$ pnpm run build
```

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [esbuild](https://github.com/evanw/esbuild), [Taro](https://taro-docs.jd.com/docs)
- 📦 Package manage via [pnpm](https://pnpm.io)
- 🍍 State Management via [Pinia](https://pinia.vuejs.org)
- 🔥 Use the new [`<script setup>`](https://github.com/vuejs/rfcs/pull/227) syntax
- 🦾 Strong typecheck via [TypeScript](https://www.typescriptlang.org)
- 🎨 UI components build on top of [NutUI](https://nutui.jd.com/#/zh-CN/component/button)
- 📥 Code style check before git commit via [husky](https://typicode.github.io/husky), [nano-staged](https://github.com/usmanyunusov/nano-staged), [eslint](https://eslint.org)
- 🦔 Use subPackage to avoid the 2MB limit of wechat app
