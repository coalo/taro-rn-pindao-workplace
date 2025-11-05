export default defineAppConfig({
  pages: [
    // 'pages/work/index',
    // 'pages/task/index',
    'pages/demo-gy/index',
    'pages/demo-lp/index',
    'pages/demo-zy/index',
    // 'pages/mine/index'
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
      // {
      //   pagePath: 'pages/work/index',
      //   text: '工作'
      // },
      // {
      //   pagePath: 'pages/task/index',
      //   text: '任务中心'
      // },
      {
        pagePath: 'pages/demo-gy/index',
        text: '组件演示-gy'
      },
      {
        pagePath: 'pages/demo-lp/index',
        text: '组件演示-lp'
      },
      {
        pagePath: 'pages/demo-zy/index',
        text: '组件演示-zy'
      },
      
      // {
      //   pagePath: 'pages/mine/index',
      //   text: '我的'
      // }
    ]
  }
})
