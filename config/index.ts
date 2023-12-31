/**
 * @file config
 */

import path from 'node:path'
import { defineConfig } from 'taro-define-config'

/**
 * resolve path
 * @param args
 * @returns resolved path
 */
const resolve = (...args: string[]) => path.resolve(__dirname, '..', ...args)

export default defineConfig({
  projectName: 'taro-vue3-zhihudaily',
  date: '2022-5-21',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    // @ts-expect-error not supported by defineConfig
    'taro-plugin-pinia',
  ],
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    },
    // prebundle: {
    //   exclude: ['@nutui/nutui-taro'],
    // },
  },
  framework: 'vue3',
  cache: {
    enable: false,
  },
  jsMinimizer: 'esbuild',
  esbuild: {
    minify: {
      config: {
        target: ['es2015', 'chrome58', 'firefox75', 'safari11'],
        charset: 'utf8',
      },
    },
  },
  alias: {
    '@': resolve('src'),
  },
  defineConstants: {
    API_HOST: '"https://news-at.zhihu.com/api/4"',
  },
  copy: {
    patterns: [],
    options: {},
  },
  sass: {
    resource: [resolve('src/assets/styles/core.scss')],
    data: '@import "@nutui/nutui-taro/dist/styles/variables.scss";',
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'poster-builder'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
    },
  },
})
