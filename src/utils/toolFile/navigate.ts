import Taro from '@tarojs/taro'

/**
 * 与原生 navigate 保持同名导出
 */
const navigate = {
  to(url: string) {
    if (!url) return
    Taro.navigateTo({ url })
  },
  
  back(delta: number = 1) {
    Taro.navigateBack({ delta })
  },
  
  relaunch(url: string) {
    if (!url) return
    Taro.reLaunch({ url })
  }
}

export default navigate
