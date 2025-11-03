/**
 * 平台判断与API封装
 * 处理多端差异，提供统一的API接口
 */

/**
 * 判断当前运行环境
 */
export const isRN = process.env.TARO_ENV === 'rn'
export const isH5 = process.env.TARO_ENV === 'h5'
export const isWeapp = process.env.TARO_ENV === 'weapp'
export const isAlipay = process.env.TARO_ENV === 'alipay'

/**
 * 获取当前平台名称
 */
export const getPlatform = (): string => {
  return process.env.TARO_ENV || 'unknown'
}

/**
 * 平台特定的样式处理
 * @param rnStyle - React Native 样式对象
 * @param className - H5/小程序 className
 */
export const getPlatformStyle = (rnStyle: any, className: string) => {
  return {
    className: isRN ? '' : className,
    style: isRN ? rnStyle : {}
  }
}
