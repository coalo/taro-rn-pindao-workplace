import React from 'react'
import { View, Text } from '@tarojs/components'
if (process.env.TARO_ENV !== 'rn') {
  require('./ui-demo.scss')
}

const UIDemo: React.FC = () => {
  return (
    <View className="ui-demo">
      <Text className="title">UI 组件演示</Text>
      
      <View className="section">
        <Text className="section-title">组件库已清空，待重新组织</Text>
      </View>
    </View>
  )
}

export default UIDemo