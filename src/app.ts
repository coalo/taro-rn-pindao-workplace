import { Component, PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.scss'

function App(props: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // this.props.children 是将要会渲染的页面
  return props.children
}

export default App
