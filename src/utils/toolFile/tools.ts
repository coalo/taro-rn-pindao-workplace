import Taro from '@tarojs/taro'
import hostMap from '../mapFile/hostMap'
import pathMap from '../mapFile/pathMap'
import navigate from './navigate'
import check from './check'

type LoginInterceptOptions = {
  loginType?: 'login' | 'phone'
  collect?: Record<string, any>
  callback?: () => void
}

/**
 * 小程序工具类 - 与原生 tools 保持同名导出
 */
class Tools {
  /**
   * 参数对象转换成网址参数字符串
   */
  parseParamsToUrlString(params: Record<string, any>): string {
    const str: string[] = []
    for (const i in params) {
      str.push(`${encodeURIComponent(i)}=${encodeURIComponent(params[i])}`)
    }
    return str.join('&')
  }

  /**
   * 网址参数字符串转换成参数对象
   */
  parseUrlStringToParams(params: string): Record<string, any> {
    const paramsArr = params.split('&')
    const paramsObj: Record<string, any> = {}
    paramsArr.forEach(str => {
      const kv = str.split('=')
      paramsObj[kv[0]] = decodeURIComponent(kv[1])
    })
    return paramsObj
  }

  /**
   * 解析URL生成参数对象
   */
  parseUrlParamsToObject(url: string): Record<string, any> {
    const paramsStr = String(url).split('?')[1] || ''
    const paramsArr = paramsStr ? paramsStr.split('&') : []
    const paramsObj: Record<string, any> = {}
    paramsArr.forEach(str => {
      const kv = str.split('=')
      paramsObj[kv[0]] = decodeURIComponent(kv[1])
    })
    return paramsObj
  }

  /**
   * 获取落地页面参数对象
   */
  getPageParamsObject(options: any): Record<string, any> {
    let paramObj: Record<string, any> = {}
    if (options.scene) {
      paramObj = this.parseUrlStringToParams(decodeURIComponent(options.scene))
    } else if (options.q) {
      paramObj = this.parseUrlParamsToObject(decodeURIComponent(options.q))
    } else {
      paramObj = options
    }
    return paramObj
  }

  /**
   * 拼接完整的页面跳转路径
   */
  splicePageUrl(path: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) return path
    return `${path}?${this.parseParamsToUrlString(params)}`
  }

  /**
   * 跳转到webView页面
   */
  navigateToWebView(path: string): void {
    const webUrl = `${hostMap.h5}${path}`
    const wxappUrl = `/pages/webView/index?url=${encodeURIComponent(webUrl)}`
    Taro.navigateTo({ url: wxappUrl })
  }

  /**
   * App路由方式跳转
   */
  navigateToAppRoute(appRoute: string, sourceFrom: string = ''): void {
    if (!appRoute) return

    appRoute = `${appRoute}${appRoute.includes('?') ? '&' : '?'}sf=${sourceFrom}`
    if (appRoute.startsWith('http')) {
      Taro.navigateTo({ url: `/pages/webView/index?url=${encodeURIComponent(appRoute)}` })
      return
    }
    if (appRoute.includes('nayuki://pindao.cn/mini/miniProgram')) {
      const params = this.parseUrlParamsToObject(appRoute)
      const miniProgram: any = { appId: params.aid }
      if (params.path) {
        miniProgram.path = decodeURIComponent(params.path)
      }
      ;(Taro as any).navigateToMiniProgram({ ...miniProgram, fail: (e: any) => e })
      return
    }

    const routeInfo = appRoute.split('?')
    const routeMap: Record<string, string> = {}
    const path = routeMap[routeInfo[0]]
    const params = routeInfo[1]
    const url = `${path}?${params}`
    
    if (path) {
      Taro.navigateTo({ url })
    }
  }

  /**
   * 登录拦截（页面需添加登录组件且组件ID为login）
   */
  loginIntercept(loginOpt: LoginInterceptOptions = {}): boolean {
    const loginType = loginOpt.loginType
    if (!loginType) return false

    if ((loginType === 'login' && !check.isLogin()) || (loginType === 'phone' && !check.isMember())) {
      if (typeof loginOpt.callback === 'function') {
        loginOpt.callback()
      }
      return false
    }
    if (!check.isBindUnionId()) {
      Taro.navigateTo({ url: '/pages/bindUnionId/index' })
      return false
    }
    return true
  }

  /**
   * 比较版本号
   */
  compareVersion(versionA: string = '', versionB: string = ''): number {
    let vA = versionA.split('.')
    let vB = versionB.split('.')
    const len = Math.max(vA.length, vB.length)
    while (vA.length < len) {
      vA.push('0')
    }
    while (vB.length < len) {
      vB.push('0')
    }

    for (let i = 0; i < len; i++) {
      const numA = parseInt(vA[i])
      const numB = parseInt(vB[i])

      if (numA > numB) {
        return 1
      } else if (numA < numB) {
        return -1
      }
    }
    return 0
  }

  /**
   * 调用页面栈内方法
   */
  callPageMethod(path: string, method: string, params: any = {}): void {
    if (!method) return
    const pages = Taro.getCurrentPages()
    pages.forEach((t: any) => {
      if (path.includes(t.route) && t[method]) {
        t[method](params)
      }
    })
  }

  /**
   * 后退到指定页面
   */
  navigateBackTargetPage(path: string): void {
    const pathMapObj: Record<string, string> = pathMap as any
    if (!pathMapObj[path]) return
    const pages = Taro.getCurrentPages()
    const pageIndex = pages.findIndex((t: any) => pathMapObj[path].includes(t.route))
    if (pageIndex !== -1) {
      Taro.navigateBack({ delta: pages.length - pageIndex - 1 })
    }
  }

  /**
   * 页面栈内是否存在指定页面
   */
  isStackExistTargetPage(path: string): boolean {
    const pathMapObj: Record<string, string> = pathMap as any
    if (!pathMapObj[path]) return false
    const pages = Taro.getCurrentPages()
    return pages.findIndex((t: any) => pathMapObj[path].includes(t.route)) !== -1
  }

  /**
   * 计算两经纬度之间距离（米）
   */
  getCoordinateDist(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const radLat1 = lat1 * Math.PI / 180.0
    const radLat2 = lat2 * Math.PI / 180.0
    const a = radLat1 - radLat2
    const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378137
    s = Math.round(s * 10000) / 10000
    return s
  }

  /**
   * 计算两经纬度之间距离字符串
   */
  getCoordinateDistStr(lat1: number, lng1: number, lat2: number, lng2: number): string {
    if (lat1 === undefined || lng1 === undefined || lat2 === undefined || lng2 === undefined) return ''
    const s = this.getCoordinateDist(lat1, lng1, lat2, lng2)
    return s < 1000 ? `${Math.round(s)}m` : `${Number(s / 1000).toFixed(1)}km`
  }

  /**
   * 计算店铺到用户的距离
   */
  getDistanceToUserForStoreInfo(storeInfo: any = {}): string {
    const positionInfo = Taro.getStorageSync('positionInfo') || {}
    return Object.keys(positionInfo).length
      ? this.getCoordinateDistStr(storeInfo.latitude, storeInfo.longitude, positionInfo.latitude, positionInfo.longitude)
      : ''
  }

  /**
   * 计算店铺列表到用户的距离
   */
  getDistanceToUserForStoreList(storeList: any[] = []): any[] {
    if (!Array.isArray(storeList)) return []

    const positionInfo = Taro.getStorageSync('positionInfo') || {}
    if (!Object.keys(positionInfo).length) return storeList

    storeList.forEach((t, n) => {
      storeList[n].distanceToUser = this.getCoordinateDistStr(t.latitude, t.longitude, positionInfo.latitude, positionInfo.longitude)
    })
    return storeList
  }

  /**
   * 加法模拟计算
   */
  numberAdd(arg1: number, arg2: number): number {
    const obj = this.numberTrans(arg1, arg2)
    const rM = Math.max(obj.r1, obj.r2)
    return this.numberScale(this.numberScale(obj.n1, rM) + this.numberScale(obj.n2, rM), -rM)
  }

  /**
   * 减法模拟计算
   */
  numberSub(arg1: number, arg2: number): number {
    const obj = this.numberTrans(arg1, arg2)
    const rM = Math.max(obj.r1, obj.r2)
    return this.numberScale(this.numberScale(obj.n1, rM) - this.numberScale(obj.n2, rM), -rM)
  }

  /**
   * 乘法模拟计算
   */
  numberMul(arg1: number, arg2: number): number {
    const obj = this.numberTrans(arg1, arg2)
    const rM = obj.r1 + obj.r2
    return this.numberScale(this.numberScale(obj.n1) * this.numberScale(obj.n2), -rM)
  }

  /**
   * 除法模拟计算
   */
  numberDiv(arg1: number, arg2: number): number {
    const obj = this.numberTrans(arg1, arg2)
    const rM = obj.r1 - obj.r2
    return this.numberScale(this.numberScale(obj.n1) / this.numberScale(obj.n2), -rM)
  }

  /**
   * 转换成计算对象
   */
  numberTrans(arg1: number, arg2: number): any {
    const obj: any = {}
    let tmp

    obj.n1 = Number(arg1)
    tmp = obj.n1.toString().split('.')
    obj.r1 = tmp[1] ? tmp[1].length : 0

    obj.n2 = Number(arg2)
    tmp = obj.n2.toString().split('.')
    obj.r2 = tmp[1] ? tmp[1].length : 0

    return obj
  }

  /**
   * 数值缩放
   */
  numberScale(num: number, pos?: number): number {
    if (pos === undefined) {
      return Number(num.toString().replace('.', ''))
    } else if (num === 0 || pos === 0) {
      return num
    }

    const parts = num.toString().split('.')
    const integerLen = parts[0].length
    const decimalLen = parts[1] ? parts[1].length : 0

    let zeros
    if (pos > 0) {
      zeros = pos - decimalLen
      while (zeros > 0) {
        zeros -= 1
        parts.push('0')
      }
    } else {
      zeros = Math.abs(pos) - integerLen
      while (zeros > 0) {
        zeros -= 1
        parts.unshift('0')
      }
    }

    const numLen = integerLen + pos
    let partsArr = parts.join('').split('')
    partsArr.splice(numLen > 0 ? numLen : 0, 0, '.')

    return Number(partsArr.join(''))
  }

  /**
   * 防抖函数
   */
  debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 0) {
    let timer: any
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }

  /**
   * 节流函数
   */
  throttle<T extends (...args: any[]) => any>(fn: T, interval: number = 0) {
    let last = 0
    return (...args: Parameters<T>) => {
      const current = new Date().getTime()
      if (current - last > interval) {
        fn(...args)
        last = current
      }
    }
  }

  /**
   * 获取导航条高度（单位px）
   */
  getNavigationBarHeight(): number {
    const systemInfo = Taro.getStorageSync('systemInfo') || {}
    const menuButtonInfo = (Taro as any).getMenuButtonBoundingClientRect ? (Taro as any).getMenuButtonBoundingClientRect() : { left: 0, height: 0, top: 0 }
    if (menuButtonInfo.left === 0) return systemInfo.platform === 'android' ? 46 : 40
    return menuButtonInfo.height + (menuButtonInfo.top - systemInfo.statusBarHeight) * 2
  }

  /**
   * 获取导航区域右边距（单位px）
   */
  getMenuButtonRight(): number {
    const systemInfo = Taro.getStorageSync('systemInfo') || {}
    const menuButtonInfo = (Taro as any).getMenuButtonBoundingClientRect ? (Taro as any).getMenuButtonBoundingClientRect() : { left: 0, width: 0, right: 0 }
    if (menuButtonInfo.left === 0) return systemInfo.platform === 'android' ? 112 : 101
    return menuButtonInfo.width + (systemInfo.screenWidth - menuButtonInfo.right) * 2
  }

  /**
   * 校验https, 过滤出门店code
   */
  filterHttpsStoreCode(url: string): string {
    if (!url) return ''
    const decodeUrl = decodeURIComponent(url || '')
    // 简化版本，实际需要根据scanMap进行处理
    return ''
  }

  /**
   * 获取扫描二维码/卡片参数
   */
  getScanCode(): { regStoreCode?: string; regChannelCode?: string; inviteCode?: string } {
    const queryInfo = Taro.getStorageSync('queryInfo') || {}
    // 简化版本，返回空对象
    return { regStoreCode: '' }
  }

  /**
   * 获取channelCode渠道码/门店码
   */
  getChannelCode(): string {
    const codes = this.getScanCode() || {}
    let channel = codes.regChannelCode && codes.regChannelCode.split('|')[0]
    channel = channel && channel.length > 2 ? channel : ''
    return channel || codes.regStoreCode || ''
  }

  /**
   * 获取推广渠道
   */
  getChannel(): string {
    const codes = this.getScanCode() || {}
    return (codes.regChannelCode && codes.regChannelCode.split('|')[0]) || ''
  }

  /**
   * 获取门店码渠道码
   */
  getStoreCode(): string {
    const codes = this.getScanCode() || {}
    return codes.regStoreCode || ''
  }

  /**
   * 获取公众号会话下发的消息id
   */
  getMessageId(options: any): string {
    const allowSceneList = [1020, 1035, 1043, 1074, 1082, 1091]
    const scene = options.scene || ''
    return (allowSceneList.some(t => t === scene) && options.query && options.query.msgid) || ''
  }

  /**
   * 获取AB测试埋点数据
   */
  getABTestPointList(pointList: any[]): any[] {
    return Array.isArray(pointList) ? pointList.map(t => {
      return {
        abLevelID: (t.level && t.level.id) || '',
        abLevelName: (t.level && t.level.name) || '',
        abExpID: (t.exp && t.exp.id) || '',
        abExpName: (t.exp && t.exp.name) || '',
        abExpGroupID: (t.expGroup && t.expGroup.id) || '',
        abExpGroupName: (t.expGroup && t.expGroup.name) || '',
        abSceneID: (t.scene && t.scene.id) || '',
        abSceneName: (t.scene && t.scene.name) || '',
        abBucketID: t.bucket || ''
      }
    }) : []
  }

  /**
   * 金额: 分转元
   */
  priceCalculation(price: number): string {
    const _price = isNaN(price) ? '0' : (price / 100).toFixed(2)
    const arr = _price.split('.')
    if (arr[arr.length - 1] === '00') {
      return arr[0]
    } else if (arr[arr.length - 1].split('')[arr.length - 1] === '0') {
      return _price.substring(0, _price.length - 1)
    } else {
      return _price
    }
  }

  /**
   * JSON转Form
   */
  json2Form(json: Record<string, any>): string {
    const str: string[] = []
    for (const p in json) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
    }
    return str.join('&')
  }

  /**
   * 深度转换
   */
  deepConvert(obj: Record<string, any> = {}, symbol: string = ':'): any[] {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return `${key}${symbol}${this.deepConvert(value)}`
      }
      return `${key}${symbol}${value}`
    })
  }
}

const tools = new Tools()
export default tools
