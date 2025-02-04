# taro-vue3-zhihudaily

> ZhihuDaily wechat app based on Taro and Vue v3.

[![CI](https://github.com/ntnyq/taro-vue3-zhihudaily/workflows/CI/badge.svg)](https://github.com/ntnyq/taro-vue3-zhihudaily/actions)
[![LICENSE](https://img.shields.io/github/license/ntnyq/taro-vue3-zhihudaily.svg)](https://github.com/ntnyq/taro-vue3-zhihudaily/blob/main/LICENSE)

## Development

[pnpm v10](https://pnpm.io) and **node >= v18.18.0** is required.

```shell
# Install deps
pnpm install

# Build for development
pnpm run dev

# Build for production
pnpm run build
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

## QRCode

![](./res/qr_code.jpg)

## License

[MIT](./LICENSE) License © 2022 to PRESENT [ntnyq](https://github.com/ntnyq)
