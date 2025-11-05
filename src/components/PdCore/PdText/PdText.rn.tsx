import React from 'react'
import { Text as RNText } from 'react-native'
import { parseAtomicClasses } from '@/styles'

interface PdTextProps {
  className?: string
  style?: any
  children?: React.ReactNode
  [key: string]: any
}

const PdText: React.FC<PdTextProps> = ({ className, style, children, ...rest }) => {
  const rnStyle = [parseAtomicClasses(className), style].filter(Boolean)
  return (
    <RNText style={rnStyle} {...rest}>
      {children}
    </RNText>
  )
}

PdText.displayName = 'PdText'

export default PdText
