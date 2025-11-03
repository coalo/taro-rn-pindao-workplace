export default defineAppConfig({
  pages: [
    'pages/work/index',
    'pages/task/index',
    'pages/demo/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#1677ff',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/work/index',
        text: '工作'
      },
      {
        pagePath: 'pages/task/index',
        text: '任务中心'
      },
      {
        pagePath: 'pages/demo/index',
        text: '组件演示'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
