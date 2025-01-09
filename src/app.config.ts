/**
 * @file App config
 */

export default defineAppConfig({
  lazyCodeLoading: 'requiredComponents',
  pages: ['pages/index/index', 'pages/detail/index', 'pages/user/index'],
  subPackages: [
    {
      pages: ['author/index', 'copy/index', 'thank/index', 'favorite/index'],
      root: 'packages/user',
      // name: `user`,
      // independent: true,
    },
  ],
  tabBar: {
    backgroundColor: '#fff',
    borderStyle: 'white',
    color: '#bfbfbf',
    selectedColor: '#ffd300',
    list: [
      {
        iconPath: './assets/images/tabbar/news.png',
        pagePath: 'pages/index/index',
        selectedIconPath: './assets/images/tabbar/news_active.png',
        text: '日推',
      },
      {
        iconPath: './assets/images/tabbar/user.png',
        pagePath: 'pages/user/index',
        selectedIconPath: './assets/images/tabbar/user_active.png',
        text: '个人',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: '喔喔日推',
  },
})
