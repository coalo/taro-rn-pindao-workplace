import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { tools } from '@/utils'

interface ArticleProps {
  articleInfo: any
  storeInfo: any
}

const Article: React.FC<ArticleProps> = ({ articleInfo, storeInfo }) => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    // TODO: 实现 sensors 曝光埋点
    // if (articleInfo.length) {
    //   getApp().sensors.modules['Exposure'].addObserverByClassName('sensors-exposure-track2', {
    //     area_rate: 0.5,
    //     stay_duration: 0,
    //     repeated: true,
    //     component: this
    //   })
    // }
    console.log('Article component mounted - 埋点监听')
  }, [articleInfo])

  const handleChange = (e: any) => {
    setCurrent(e.detail.current)
  }

  const handleArticleItemClick = (item: any) => {
    // TODO: 实现 tools.navigateToAppRoute
    // tools.navigateToAppRoute(item.imageList[0].route, '首页-会员新鲜事')

    // getApp().sensors.track('BannerClick', {
    //   banner_type: '首页底部广告',
    //   banner_name: item.title || '',
    //   banner_link: item.imageList[0].route
    // })
    console.log('ArticleClick:', item.title)
    Taro.showToast({
      title: `查看文章: ${item.title}`,
      icon: 'none'
    })
  }

  if (!articleInfo || !articleInfo.imageList || articleInfo.imageList.length === 0) {
    return null
  }

  return (
    <View className="article-container">
      <View className="article-title">
        <Text>{articleInfo.title || '会员新鲜事'}</Text>
      </View>
      <Swiper
        className="article-swiper sensors-exposure-track2"
        indicatorDots
        autoplay
        interval={5000}
        duration={500}
        circular
        current={current}
        onChange={handleChange}
      >
        {articleInfo.imageList.map((item: any, index: number) => (
          <SwiperItem
            key={index}
            onClick={() => handleArticleItemClick(item)}
          >
            <Image
              className="article-image"
              src={item.imageUrl || ''}
              mode="aspectFill"
            />
            <View className="article-info">
              <Text className="article-item-title">{item.title || ''}</Text>
              <Text className="article-item-desc">{item.desc || ''}</Text>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default Article
