import { TouchableOpacityProps } from 'react-native'

export interface ButtonProps extends Omit<TouchableOpacityProps, 'type' | 'size'> {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'ghost' | 'link'
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 子元素 */
  children?: React.ReactNode
}