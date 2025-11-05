import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import Taro, { useLaunch } from '@tarojs/taro'
import { store } from './store'
if (process.env.TARO_ENV !== 'rn') {
  require('./app.scss')
}

function App(props: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched.')
    Taro.switchTab({ url: '/pages/task/index' })
  })

  // this.props.children 是将要会渲染的页面
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
