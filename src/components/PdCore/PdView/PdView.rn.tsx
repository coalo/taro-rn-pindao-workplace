import React from 'react'
import { View as RNView } from 'react-native'
import { parseAtomicClasses } from '@/styles'

interface PdViewProps {
  className?: string
  style?: any
  children?: React.ReactNode
  [key: string]: any
}

const PdView: React.FC<PdViewProps> = ({ className, style, children, ...rest }) => {
  const rnStyle = [parseAtomicClasses(className), style].filter(Boolean)
  return (
    <RNView style={rnStyle} {...rest}>
      {children}
    </RNView>
  )
}

PdView.displayName = 'PdView'

export default PdView
