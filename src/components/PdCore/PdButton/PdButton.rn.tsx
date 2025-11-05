import React from 'react'
import { TouchableOpacity } from 'react-native'
import { parseAtomicClasses } from '@/styles'

interface PdButtonProps {
  className?: string
  style?: any
  children?: React.ReactNode
  onPress?: (e?: any) => void
  onClick?: (e?: any) => void
  [key: string]: any
}

const PdButton: React.FC<PdButtonProps> = ({ className, style, children, onPress, onClick, ...rest }) => {
  const rnStyle = [parseAtomicClasses(className), style].filter(Boolean)
  const handlePress = onPress ?? onClick
  return (
    <TouchableOpacity style={rnStyle} onPress={handlePress} {...rest}>
      {children}
    </TouchableOpacity>
  )
}

PdButton.displayName = 'PdButton'

export default PdButton
