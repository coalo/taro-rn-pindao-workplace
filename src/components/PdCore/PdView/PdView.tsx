import React from 'react'
import { View as TaroView } from '@tarojs/components'

interface PdViewProps {
  className?: string
  style?: any
  children?: React.ReactNode
  [key: string]: any
}

const PdView: React.FC<PdViewProps> = ({ className, style, children, ...rest }) => {
  // H5/小程序端：className 透传，style 仅用于按需内联覆盖
  return (
    <TaroView className={className} style={style} {...rest}>
      {children}
    </TaroView>
  )
}

PdView.displayName = 'PdView'

export default PdView
