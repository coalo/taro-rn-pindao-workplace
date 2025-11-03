/**
 * RN 专属状态栏组件
 * 仅在 React Native 端使用
 */

import React from 'react'

interface StatusBarProps {
  barStyle?: 'default' | 'light-content' | 'dark-content'
  backgroundColor?: string
  hidden?: boolean
}

// 仅在 RN 环境下导入 StatusBar
let RNStatusBar: any

if (process.env.TARO_ENV === 'rn') {
  const { StatusBar } = require('react-native')
  RNStatusBar = StatusBar
}

export default function StatusBar(props: StatusBarProps) {
  const {
    barStyle = 'dark-content',
    backgroundColor = '#fff',
    hidden = false
  } = props

  // 如果不是 RN 环境，不渲染任何内容
  if (process.env.TARO_ENV !== 'rn' || !RNStatusBar) {
    return null
  }

  return (
    <RNStatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      hidden={hidden}
    />
  )
}
