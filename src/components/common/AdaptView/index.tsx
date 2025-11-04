import React from 'react'
import { View } from '@tarojs/components'
import type { ViewProps } from '@tarojs/components/types/View'
import { parseAtomicClasses } from '../../../styles/atomicClasses'

const isRN = process.env.TARO_ENV === 'rn'

export interface AdaptViewProps extends Omit<ViewProps, 'style'> {
  className?: string
  style?: Record<string, any> | null
}

// 跨端适配的 View：Web 端沿用 className；RN 端解析为 style
const AdaptView: React.FC<AdaptViewProps> = ({ className, style, children, ...rest }) => {
  if (isRN) {
    const rnStyle = parseAtomicClasses(className)
    const merged = Array.isArray(style) ? [{ ...rnStyle }, ...style] : { ...rnStyle, ...(style || {}) }
    return (
      <View {...rest} style={merged}>
        {children}
      </View>
    )
  }
  // 非 RN 端按原样使用 className
  return (
    <View {...rest} className={className} style={style || {}}>
      {children}
    </View>
  )
}

export default AdaptView
