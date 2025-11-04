import React from 'react'
import { View, Text } from '@tarojs/components'
import { Button } from '@/ui'
if (process.env.TARO_ENV !== 'rn') {
  require('./ui-demo.scss')
}

const UIDemo: React.FC = () => {
  return (
    <View className="ui-demo">
      <Text className="title">UI 组件演示</Text>
      
      <View className="section">
        <Text className="section-title">按钮类型</Text>
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="ghost">幽灵按钮</Button>
        <Button type="link">链接按钮</Button>
      </View>
      
      <View className="section">
        <Text className="section-title">按钮尺寸</Text>
        <Button size="small">小型按钮</Button>
        <Button size="medium">中型按钮</Button>
        <Button size="large">大型按钮</Button>
      </View>
      
      <View className="section">
        <Text className="section-title">按钮状态</Text>
        <Button disabled>禁用按钮</Button>
        <Button loading>加载中按钮</Button>
      </View>
    </View>
  )
}

export default UIDemo