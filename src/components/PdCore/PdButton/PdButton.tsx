import React from 'react'
import { Button as TaroButton } from '@tarojs/components'

interface PdButtonProps {
  className?: string
  style?: any
  children?: React.ReactNode
  onPress?: (e?: any) => void
  onClick?: (e?: any) => void
  [key: string]: any
}

const PdButton: React.FC<PdButtonProps> = ({ className, style, children, onPress, onClick, ...rest }) => {
  const handleClick = onClick ?? onPress
  return (
    <TaroButton className={className} style={style} onClick={handleClick} {...rest}>
      {children}
    </TaroButton>
  )
}

PdButton.displayName = 'PdButton'

export default PdButton
