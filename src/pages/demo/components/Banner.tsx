import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import { useState, useEffect, useRef } from 'react'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { config, tools } from '@/utils'

interface BannerProps {
  storeInfo: any
  bannerInfo: any[]
  onSyncBannerIndex?: (index: number) => void
}

const Banner: React.FC<BannerProps> = ({ storeInfo, bannerInfo, onSyncBannerIndex }) => {
  const [current, setCurrent] = useState(0)
  const gioImpList = useRef<boolean[]>([])
  const isPageShow = useRef(false)

  const homeBannerDefaultImg = config.homeBannerDefaultImg

  useEffect(() => {
    if (bannerInfo && bannerInfo.length !== 0) {
      const item = bannerInfo[current] || {}
      // TODO: 实现 sensors 埋点
      // getApp().sensors.track('BannerExposure', {
      //   banner_type: '首页顶部轮播图',
      //   banner_name: item.name,
      //   banner_link: item.route
      // })
      console.log('BannerExposure:', item.name)
      gioImpList.current = Array.from({ length: bannerInfo.length })
      gioImpList.current[current] = true
    }
  }, [bannerInfo, current])

  useDidShow(() => {
    isPageShow.current = true
  })

  useDidHide(() => {
    isPageShow.current = false
  })

  const handleChange = (e: any) => {
    const newCurrent = e.detail.current
    setCurrent(newCurrent)
    onSyncBannerIndex?.(newCurrent)

    if (!gioImpList.current[newCurrent] && isPageShow.current) {
      const item = bannerInfo[newCurrent] || {}
      // TODO: 实现 sensors 埋点
      // getApp().sensors.track('BannerExposure', {
      //   banner_type: '首页顶部轮播图',
      //   banner_name: item.name,
      //   banner_link: item.route
      // })
      console.log('BannerExposure (change):', item.name)
      gioImpList.current[newCurrent] = true
    }
  }

  const handleBannerClick = (item: any) => {
    tools.loginIntercept({ loginType: 'login', collect: { entrance_var: '首页-banner' } }) &&
      tools.navigateToAppRoute(item.route, '首页-banner')

    // TODO: 实现 sensors 埋点
    // getApp().sensors.track('BannerClick', {
    //   banner_type: '首页顶部轮播图',
    //   banner_name: item.name,
    //   banner_link: item.route
    // })
    console.log('BannerClick:', item.name, item.route)
  }

  if (!bannerInfo || bannerInfo.length === 0) {
    return (
      <View className="banner-container">
        <Image
          className="banner-default-image"
          src={homeBannerDefaultImg}
          mode="aspectFill"
        />
      </View>
    )
  }

  return (
    <View className="banner-container">
      <Swiper
        className="banner-swiper"
        indicatorDots
        autoplay
        interval={5000}
        duration={500}
        circular
        current={current}
        onChange={handleChange}
      >
        {bannerInfo.map((item, index) => (
          <SwiperItem key={index}>
            <Image
              className="banner-image"
              src={item.imageUrl || homeBannerDefaultImg}
              mode="aspectFill"
              onClick={() => handleBannerClick(item)}
            />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default Banner
