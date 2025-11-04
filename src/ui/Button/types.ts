import { ButtonProps as TaroButtonProps } from '@tarojs/components'
import { GestureResponderEvent } from 'react-native'

export interface ButtonProps extends Omit<TaroButtonProps, 'type' | 'size' | 'onClick'> {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'ghost' | 'link'
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 自定义类名 */
  className?: string
  /** 子元素 */
  children?: React.ReactNode
  /** 点击事件 */
  onClick?: (event: GestureResponderEvent) => void
}