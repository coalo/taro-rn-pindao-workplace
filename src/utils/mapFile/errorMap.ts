/**
 * 错误码映射
 */
const errorMap: Record<string, string> = {
  'NETWORK_ERROR': '网络错误，请稍后重试',
  'SYSTEM_ERROR': '系统繁忙，请稍后重试',
  'TOKEN_EXPIRED': '登录已过期，请重新登录',
  'TOKEN_INVALID': '登录态无效，请重新登录'
}

export default errorMap
