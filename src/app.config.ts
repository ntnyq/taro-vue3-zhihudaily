/**
 * @file App config
 */

export default defineAppConfig({
  pages: [
    `pages/detail/index`,
    `pages/index/index`,
    `pages/user/index`,
    `pages/author/index`,
    `pages/thank/index`,
    `pages/copy/index`,
  ],
  window: {
    backgroundTextStyle: `light`,
    navigationBarBackgroundColor: `#fff`,
    navigationBarTitleText: `喔喔日推`,
    navigationBarTextStyle: `black`,
  },
  tabBar: {
    color: `#bfbfbf`,
    selectedColor: `#ffd300`,
    backgroundColor: `#fff`,
    borderStyle: `white`,
    list: [
      {
        pagePath: `pages/index/index`,
        iconPath: `./assets/images/tabbar/news.png`,
        selectedIconPath: `./assets/images/tabbar/news_active.png`,
        text: `日推`,
      }, {
        pagePath: `pages/user/index`,
        iconPath: `./assets/images/tabbar/user.png`,
        selectedIconPath: `./assets/images/tabbar/user_active.png`,
        text: `个人`,
      },
    ],
  },
})
