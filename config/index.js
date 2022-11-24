/**
 * @file config
 */

// @ts-check

const path = require(`path`)
const { defineConfig } = require(`taro-define-config`)

const resolve = (...args) => path.resolve(__dirname, `..`, ...args)

const config = defineConfig({
  projectName: `starter-vue-wechat-app`,
  date: `2022-5-21`,
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: `src`,
  outputRoot: `dist`,
  plugins: [
    `@tarojs/plugin-html`,
    `taro-plugin-pinia`,
  ],
  compiler: `webpack5`,
  framework: `vue3`,
  cache: {
    enable: true,
  },
  jsMinimizer: `esbuild`,
  esbuild: {
    minify: {
      config: {
        target: [`es2015`, `chrome58`, `firefox75`, `safari11`],
        charset: `utf8`,
      },
    },
  },
  alias: {
    '@': resolve(`src`),
  },
  defineConstants: {
    API_HOST: `"https://news-at.zhihu.com/api/4"`,
  },
  copy: {
    patterns: [],
    options: {},
  },
  sass: {
    resource: [
      resolve(`src/assets/styles/core.scss`),
    ],
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [`nut-`],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: `module`, // 转换模式，取值为 global/module
          generateScopedName: `[name]__[local]___[hash:base64:5]`,
        },
      },
    },
  },
  h5: {
    publicPath: `/`,
    staticDirectory: `static`,
    esnextModules: [`nutui-taro`, `poster-builder`],
    postcss: {
      autoprefixer: {
        // @ts-expect-error type error
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: `module`, // 转换模式，取值为 global/module
          generateScopedName: `[name]__[local]___[hash:base64:5]`,
        },
      },
    },
  },
})

module.exports = function (merge) {
  if (process.env.NODE_ENV === `development`) {
    return merge({}, config, require(`./dev`))
  }
  return merge({}, config, require(`./prod`))
}
