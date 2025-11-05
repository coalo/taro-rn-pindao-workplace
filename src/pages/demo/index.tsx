import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { getPlatform } from '@/utils/platform'

// 仅在非 RN 环境引入 SCSS
if (process.env.TARO_ENV !== 'rn') {
  require('./index.scss')
}



export default function Demo() {
  useLoad(() => {
    console.log('Demo page loaded.')
  })

  const platform = getPlatform()
  console.log('Current platform:', platform)
  const isRN = process.env.TARO_ENV === 'rn'

  const handleButtonClick = (type: string) => {
    Taro.showToast({
      title: `点击了${type}按钮`,
      icon: 'none'
    })
  }

  return (
    <ScrollView className="demo-page">
      <View className="demo-content">
        {/* 页面标题 */}
        <View className="demo-header">
          <Text className="demo-title">组件演示</Text>
          <Text className="demo-platform">当前平台: {platform}</Text>
        </View>

        <View className="demo-section">
          <Text className="section-desc">组件库已清空，待重新组织</Text>
        </View>

        <View className="demo-footer">
          <Text className="footer-text">组件重构中...</Text>
        </View>
      </View>
    </ScrollView>
  )
}
