import React from 'react'
import { Text as TaroText } from '@tarojs/components'

interface PdTextProps {
  className?: string
  style?: any
  children?: React.ReactNode
  [key: string]: any
}

const PdText: React.FC<PdTextProps> = ({ className, style, children, ...rest }) => {
  return (
    <TaroText className={className} style={style} {...rest}>
      {children}
    </TaroText>
  )
}

PdText.displayName = 'PdText'

export default PdText
