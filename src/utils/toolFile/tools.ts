import Taro from '@tarojs/taro'

type LoginInterceptOptions = {
  loginType?: 'login' | 'phone'
  collect?: Record<string, any>
  callback?: () => void
}

/**
 * 与原生 tools 保持同名导出
 */
const tools = {
  loginIntercept(options: LoginInterceptOptions = {}) {
    if (typeof options.callback === 'function') {
      options.callback()
    }
    return true
  },

  navigateToAppRoute(route: string, from?: string) {
    if (!route) return
    Taro.navigateTo({ url: route })
  },

  splicePageUrl(path: string, params?: Record<string, any>) {
    if (!params || Object.keys(params).length === 0) return path
    const query = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&')
    return `${path}?${query}`
  },

  getChannelCode(): string {
    return ''
  },

  getScanCode(): { regStoreCode: string } {
    return { regStoreCode: '' }
  },

  throttle<T extends (...args: any[]) => any>(fn: T, wait: number) {
    let last = 0
    return (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - last >= wait) {
        last = now
        fn(...args)
      }
    }
  }
}

export default tools
