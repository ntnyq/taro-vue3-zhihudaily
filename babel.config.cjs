/**
 * @see {@link https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md}
 */

module.exports = {
  plugins: [],
  presets: [
    [
      'taro',
      {
        framework: 'vue3',
        ts: true,
      },
    ],
  ],
}
