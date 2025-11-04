import React from 'react'
import { Button as TaroButton } from '@tarojs/components'
import { ButtonProps } from './types'
import './style.scss'

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  ...restProps
}) => {
  const buttonClass = `ui-button ui-button--${type} ui-button--${size} ${disabled ? 'ui-button--disabled' : ''} ${className}`

  return (
    <TaroButton
      className={buttonClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...restProps}
    >
      {loading ? 'Loading...' : children}
    </TaroButton>
  )
}

export default Button