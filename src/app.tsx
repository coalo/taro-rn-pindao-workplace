import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { useLaunch } from '@tarojs/taro'
import { store } from './store'
import './app.scss'

function App(props: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // this.props.children 是将要会渲染的页面
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
