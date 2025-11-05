import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { tools } from '@/utils'

interface MarketProps {
  marketInfo: any[]
  storeInfo: any
}

const Market: React.FC<MarketProps> = ({ marketInfo, storeInfo }) => {
  // 防抖处理
  const throttleTimer = { current: null as any }

  const handleMarketClick = (item: any) => {
    if (throttleTimer.current) {
      return
    }

    throttleTimer.current = setTimeout(() => {
      throttleTimer.current = null
    }, 500)

    // TODO: 实现 tools 工具类
    // tools.loginIntercept({
    //   loginType: 'login',
    //   collect: { entrance_var: `首页-三宫格营销位${item.name}` }
    // }) && tools.navigateToAppRoute(item.route, `首页-三宫格营销位${item.name}`)

    // getApp().sensors.track('BannerClick', {
    //   banner_type: '首页底部营销位',
    //   banner_name: item.name,
    //   banner_link: item.route
    // })
    console.log('MarketClick:', item.name, item.route)
    Taro.showToast({
      title: `点击营销位: ${item.name}`,
      icon: 'none'
    })
  }

  if (!marketInfo || marketInfo.length === 0) {
    return null
  }

  return (
    <View className="market-container">
      <View className="market-grid">
        {marketInfo.map((item, index) => (
          <View
            key={index}
            className="market-item sensors-exposure-track1"
            onClick={() => handleMarketClick(item)}
            data-sensors-name={item.name}
            data-sensors-route={item.route}
          >
            <Image
              className="market-image"
              src={item.imageUrl || ''}
              mode="aspectFill"
            />
            <Text className="market-name">{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Market
