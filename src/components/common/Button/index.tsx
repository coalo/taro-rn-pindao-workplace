/**
 * 通用按钮组件
 * 跨端可复用组件示例
 */

import { View, Text } from '@tarojs/components'
import { getPlatformStyle } from '../../../utils/platform'
import './index.scss'

interface ButtonProps {
  children?: React.ReactNode
  type?: 'primary' | 'default' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
}

// RN 样式
const rnStyles = {
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  buttonPrimary: {
    backgroundColor: '#1890ff',
  },
  buttonDefault: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  buttonDanger: {
    backgroundColor: '#ff4d4f',
  },
  buttonSmall: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
  },
  textPrimary: {
    color: '#fff',
  },
  textDefault: {
    color: '#333',
  },
  textDanger: {
    color: '#fff',
  },
  textSmall: {
    fontSize: 12,
  },
  textLarge: {
    fontSize: 16,
  },
}

export default function Button(props: ButtonProps) {
  const {
    children,
    type = 'default',
    size = 'medium',
    disabled = false,
    onClick
  } = props

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  // 按钮样式
  const buttonStyle = getPlatformStyle(
    {
      ...rnStyles.button,
      ...(type === 'primary' && rnStyles.buttonPrimary),
      ...(type === 'default' && rnStyles.buttonDefault),
      ...(type === 'danger' && rnStyles.buttonDanger),
      ...(size === 'small' && rnStyles.buttonSmall),
      ...(size === 'large' && rnStyles.buttonLarge),
      ...(disabled && rnStyles.buttonDisabled),
    },
    `button button-${type} button-${size} ${disabled ? 'button-disabled' : ''}`
  )

  // 文本样式
  const textStyle = getPlatformStyle(
    {
      ...rnStyles.text,
      ...(type === 'primary' && rnStyles.textPrimary),
      ...(type === 'default' && rnStyles.textDefault),
      ...(type === 'danger' && rnStyles.textDanger),
      ...(size === 'small' && rnStyles.textSmall),
      ...(size === 'large' && rnStyles.textLarge),
    },
    `button-text button-text-${type} button-text-${size}`
  )

  return (
    <View {...buttonStyle} onClick={handleClick}>
      <Text {...textStyle}>{children}</Text>
    </View>
  )
}
