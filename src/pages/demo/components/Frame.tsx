import { View } from '@tarojs/components'
import { useState, useEffect, ReactNode } from 'react'

interface FrameProps {
  homeUiInfo: any
  bannerInfo: any[]
  bannerIndex: number
  children?: ReactNode
}

const Frame: React.FC<FrameProps> = ({ homeUiInfo, bannerInfo, bannerIndex, children }) => {
  const [bannerBackgroundColor, setBannerBackgroundColor] = useState('')
  const [defaultBackgroundColor, setDefaultBackgroundColor] = useState('')

  useEffect(() => {
    if (homeUiInfo && homeUiInfo.homeColor) {
      setDefaultBackgroundColor(homeUiInfo.homeColor.background?.color || '')
    }
  }, [homeUiInfo])

  useEffect(() => {
    if (bannerInfo && bannerInfo.length > 0 && bannerInfo[bannerIndex]) {
      setBannerBackgroundColor(bannerInfo[bannerIndex].backgroundColor || '')
    }
  }, [bannerInfo, bannerIndex])

  return (
    <View
      className="frame-container"
      style={{
        backgroundColor: bannerBackgroundColor || defaultBackgroundColor || '#F9FAF9'
      }}
    >
      {children}
    </View>
  )
}

export default Frame
