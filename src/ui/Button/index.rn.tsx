import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native'
import { ButtonProps } from './types.rn'

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onPress: onClick,
  style,
  ...restProps
}) => {
  // 按钮样式
  const buttonStyles = [
    {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    },
    type === 'primary' ? {
      backgroundColor: disabled ? '#f5f5f5' : '#1890ff',
    } : {},
    type === 'secondary' ? {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? '#d9d9d9' : '#d9d9d9',
    } : {},
    size === 'small' ? {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 2,
    } : {},
    size === 'large' ? {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    } : {},
    disabled ? {
      opacity: 0.65,
    } : {},
    ...(style ? (Array.isArray(style) ? style : [style]) : []),
  ]

  // 文本样式
  const textStyles: TextStyle[] = [
    {
      fontSize: 14,
      textAlign: 'center',
    },
    type === 'primary' ? {
      color: '#fff',
    } : {},
    type === 'secondary' ? {
      color: disabled ? '#ccc' : '#333',
    } : {},
    size === 'small' ? {
      fontSize: 12,
    } : {},
    size === 'large' ? {
      fontSize: 16,
    } : {},
  ]

  // 过滤掉与 TouchableOpacity 不兼容的属性
  const touchableProps = restProps;
  
  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      onPress={onClick}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'primary' ? '#fff' : '#1890ff'} 
        />
      ) : (
        typeof children === 'string' ? (
          <Text style={textStyles}>{children}</Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  )
}

export default Button