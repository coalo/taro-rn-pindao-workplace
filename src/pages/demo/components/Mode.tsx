import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { tools, pathMap } from '@/utils'

interface ModeProps {
  homeUiInfo: any
  storeInfo: any
}

const Mode: React.FC<ModeProps> = ({ homeUiInfo, storeInfo }) => {
  useDidShow(() => {
    // TODO: 实现 sensors 埋点
    // getApp().sensors.track('BannerExposure', {
    //   banner_type: '首页就餐方式广告语',
    //   banner_name: homeUiInfo.homeDiningIcon?.selfDesc || '提前下单门店自提',
    //   banner_link: pathMap.menu
    // })
    // getApp().sensors.track('BannerExposure', {
    //   banner_type: '首页就餐方式广告语',
    //   banner_name: homeUiInfo.homeDiningIcon?.takeOutDesc || '会员周一免配送费',
    //   banner_link: pathMap.addressList
    // })
    console.log('Mode component show - 埋点曝光')
  })

  // 点击自取
  const handleGoTakeOwn = async () => {
    // TODO: 实现 dataSync 和路径跳转
    // await dataSync.updateChannel(2)
    // Taro.reLaunch({ url: pathMap.menu })

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '自取',
    //   element_type: '卡片',
    //   element_rank: 1,
    //   element_jump_link: pathMap.menu,
    //   page_title: '首页'
    // })
    console.log('handleGoTakeOwn')
    Taro.showToast({ title: '自取模式', icon: 'none' })
  }

  // 点击自取广告语
  const handleSensorsTakeOwn = async () => {
    // TODO: 实现 dataSync 和路径跳转
    // await dataSync.updateChannel(2)
    // Taro.reLaunch({ url: pathMap.menu })

    // getApp().sensors.track('BannerClick', {
    //   banner_type: '首页就餐方式广告语',
    //   banner_name: homeUiInfo.homeDiningIcon?.selfDesc || '提前下单门店自提',
    //   banner_link: pathMap.menu
    // })
    console.log('handleSensorsTakeOwn')
    Taro.showToast({ title: '自取广告语点击', icon: 'none' })
  }

  // 点击外卖
  const handleGoTakeOut = () => {
    // TODO: 实现 tools.loginIntercept 和路径跳转
    // tools.loginIntercept({ loginType: 'login', collect: { entrance_var: '首页-外卖' } }) &&
    //   Taro.navigateTo({ url: tools.splicePageUrl(pathMap.addressList, { referrer: 'home' }) })

    // getApp().sensors.track('KeyElementClick', {
    //   element_id: '',
    //   element_name: '外卖',
    //   element_type: '卡片',
    //   element_rank: 2,
    //   element_jump_link: pathMap.addressList,
    //   page_title: '首页'
    // })
    console.log('handleGoTakeOut')
    Taro.showToast({ title: '外卖模式', icon: 'none' })
  }

  // 点击外卖广告语
  const handleSensorsTakeOut = () => {
    // TODO: 实现 tools.loginIntercept 和路径跳转
    // tools.loginIntercept({ loginType: 'login', collect: { entrance_var: '首页-外卖' } }) &&
    //   Taro.navigateTo({ url: tools.splicePageUrl(pathMap.addressList, { referrer: 'home' }) })

    // getApp().sensors.track('BannerClick', {
    //   banner_type: '首页就餐方式广告语',
    //   banner_name: homeUiInfo.homeDiningIcon?.takeOutDesc || '会员周一免配送费',
    //   banner_link: pathMap.addressList
    // })
    console.log('handleSensorsTakeOut')
    Taro.showToast({ title: '外卖广告语点击', icon: 'none' })
  }

  return (
    <View className="mode-container">
      {/* 自取模式 */}
      <View className="mode-item" onClick={handleGoTakeOwn}>
        <View className="mode-icon">🏪</View>
        <Text className="mode-title">自取</Text>
        <Text
          className="mode-desc"
          onClick={(e) => {
            e.stopPropagation()
            handleSensorsTakeOwn()
          }}
        >
          {homeUiInfo.homeDiningIcon?.selfDesc || '提前下单门店自提'}
        </Text>
      </View>

      {/* 外卖模式 */}
      <View className="mode-item" onClick={handleGoTakeOut}>
        <View className="mode-icon">🚗</View>
        <Text className="mode-title">外卖</Text>
        <Text
          className="mode-desc"
          onClick={(e) => {
            e.stopPropagation()
            handleSensorsTakeOut()
          }}
        >
          {homeUiInfo.homeDiningIcon?.takeOutDesc || '会员周一免配送费'}
        </Text>
      </View>
    </View>
  )
}

export default Mode
