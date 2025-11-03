/**
 * RN 专属按钮组件
 * 仅在 React Native 端打包使用
 * 使用 RN 原生的 Pressable 和动画效果
 */

import React from 'react'
import { View, Text } from '@tarojs/components'

interface NativeButtonProps {
  children?: React.ReactNode
  type?: 'primary' | 'default' | 'danger'
  onPress?: () => void
}

// 仅在 RN 环境下导入原生组件
let Pressable: any
let Animated: any

if (process.env.TARO_ENV === 'rn') {
  const RN = require('react-native')
  Pressable = RN.Pressable
  Animated = RN.Animated
}

const styles = {
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
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
  text: {
    fontSize: 16,
    fontWeight: '600' as const,
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
}

export default function NativeButton(props: NativeButtonProps) {
  const { children, type = 'default', onPress } = props

  // 如果不是 RN 环境，返回普通 View
  if (process.env.TARO_ENV !== 'rn') {
    return (
      <View
        style={{
          ...styles.button,
          ...(type === 'primary' && styles.buttonPrimary),
          ...(type === 'default' && styles.buttonDefault),
          ...(type === 'danger' && styles.buttonDanger),
        }}
        onClick={onPress}
      >
        <Text
          style={{
            ...styles.text,
            ...(type === 'primary' && styles.textPrimary),
            ...(type === 'default' && styles.textDefault),
            ...(type === 'danger' && styles.textDanger),
          }}
        >
          {children}
        </Text>
      </View>
    )
  }

  // RN 环境使用 Pressable
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.button,
        type === 'primary' && styles.buttonPrimary,
        type === 'default' && styles.buttonDefault,
        type === 'danger' && styles.buttonDanger,
        {
          opacity: pressed ? 0.7 : 1,
          transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
        },
      ]}
    >
      <Text
        style={{
          ...styles.text,
          ...(type === 'primary' && styles.textPrimary),
          ...(type === 'default' && styles.textDefault),
          ...(type === 'danger' && styles.textDanger),
        }}
      >
        {children}
      </Text>
    </Pressable>
  )
}
