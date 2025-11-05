import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Footer: React.FC = () => {
  const handleJumpBrand = () => {
    // TODO: 实现品牌跳转逻辑
    console.log('handleJumpBrand')
    Taro.showToast({ title: '品牌介绍', icon: 'none' })
  }

  return (
    <View className="footer-container">
      <View className="footer-content" onClick={handleJumpBrand}>
        <Text className="footer-text">© 33332024333223 55555奈雪的茶</Text>
      </View>
    </View>
  )
}

export default Footer
