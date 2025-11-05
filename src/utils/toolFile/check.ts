import Taro from '@tarojs/taro'

/**
 * 与原生 check 保持同名导出
 */
const check = {
  isMember(): boolean {
    try {
      const userInfo = Taro.getStorageSync('userInfo')
      return !!(userInfo && (userInfo.isMember || userInfo.member === true))
    } catch {
      return false
    }
  }
}

export default check
