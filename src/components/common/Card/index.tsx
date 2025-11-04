/**
 * 通用卡片组件
 * 跨端可复用组件示例
 */

import { View, Text } from '@tarojs/components'
import { getPlatformStyle } from '../../../utils/platform'
if (process.env.TARO_ENV !== 'rn') {
  require('./index.scss')
}

interface CardProps {
  title?: string
  children?: React.ReactNode
  extra?: React.ReactNode
  bordered?: boolean
  hoverable?: boolean
  onClick?: () => void
}

// RN 样式
const rnStyles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardBordered: {
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHoverable: {
    // RN 中的 hover 效果通过其他方式实现
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
}

export default function Card(props: CardProps) {
  const {
    title,
    children,
    extra,
    bordered = true,
    hoverable = false,
    onClick
  } = props

  const cardStyle = getPlatformStyle(
    {
      ...rnStyles.card,
      ...(bordered && rnStyles.cardBordered),
    },
    `card ${bordered ? 'card-bordered' : ''} ${hoverable ? 'card-hoverable' : ''}`
  )

  const headerStyle = getPlatformStyle(rnStyles.header, 'card-header')
  const titleStyle = getPlatformStyle(rnStyles.title, 'card-title')
  const bodyStyle = getPlatformStyle(rnStyles.body, 'card-body')

  return (
    <View {...cardStyle} onClick={onClick}>
      {(title || extra) && (
        <View {...headerStyle}>
          {title && <Text {...titleStyle}>{title}</Text>}
          {extra && <View>{extra}</View>}
        </View>
      )}
      <View {...bodyStyle}>{children}</View>
    </View>
  )
}
