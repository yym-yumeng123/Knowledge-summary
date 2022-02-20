export default defineAppConfig({
  pages: [
    "pages/about/index",
    "pages/swiper/index",
    "pages/person/index",
    "pages/viewpage/index",
    "pages/home/index",
    "pages/index/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: '#ff0000',
    position: 'top',
    list: [
      { text: "关于", pagePath: "pages/about/index" },
      { text: "个人中心", pagePath: "pages/person/index" },
    ],
  },
});
