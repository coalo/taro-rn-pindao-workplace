/**
 * 数据集工具类
 * 从原生小程序完整迁移，保持变量名与逻辑一致
 */
import Taro from '@tarojs/taro'
import apiMap from '../mapFile/apiMap'
import pathMap from '../mapFile/pathMap'
import request from './request'
import tools from '../toolFile/tools'
import check from '../toolFile/check'
import config from '../commonFile/config'
import theme from '../commonFile/theme'
import sensors from '../toolFile/sensors'

class DataSync {
  // 同步 accessToken 信息
  syncAccessToken() {
    return new Promise((resolve, reject) => {
      const canLogin = typeof (Taro as any).login === 'function'
      
      if (!canLogin) {
        console.warn('[dataSync] Taro.login not available, skipping')
        resolve({})
        return
      }
      
      ;(Taro as any).login({
        success: (res: any) => {
          if (!res.code) {
            resolve({})
            return
          }
          
          const data = {
            type: config.loginType,
            wxappCode: res.code,
            ...tools.getScanCode()
          }
          
          request(apiMap.loginVerify, data)
            .then((res: any) => {
              Taro.setStorageSync('accessToken', res.data.accessToken || '')
              Taro.setStorageSync('openId', res.data.openId || '')
              Taro.setStorageSync('unionId', res.data.unionId || '')
              resolve(res)
            })
            .catch((err: any) => {
              Taro.showToast({
                icon: 'none',
                title: err.message || '请求错误'
              })
              resolve(res)
            })
        }
      })
    })
  }

  // 更新 accessToken 信息
  updateAccessToken(accessToken: string = '') {
    return new Promise((resolve) => {
      Taro.setStorageSync('accessToken', accessToken)
      resolve(undefined)
    })
  }

  // 清除 accessToken 信息
  cleanAccessToken() {
    return new Promise((resolve) => {
      Taro.setStorageSync('accessToken', '')
      Taro.setStorageSync('hasSilentLogin', false)

      try {
        ;(sensors as any).logout && (sensors as any).logout()
        ;(sensors as any).resetAnonymousIdentity && (sensors as any).resetAnonymousIdentity()
      } catch {}

      resolve(undefined)
    })
  }

  // 更新购买渠道
  updateChannel(channel: number = 2) {
    return new Promise((resolve) => {
      Taro.setStorageSync('channel', channel)
      sensors.settingOrderForm && sensors.settingOrderForm()
      resolve(undefined)
    })
  }

  // 更新档口信息
  updateStallInfo(stallType?: string) {
    return new Promise((resolve) => {
      Taro.setStorageSync('stallType', stallType || '')
      resolve(undefined)
    })
  }

  // 同步用户信息
  syncUserInfo() {
    return new Promise((resolve, reject) => {
      request(apiMap.getUserInfo, {})
        .then((res: any) => {
          Taro.setStorageSync('userInfo', res.data)
          resolve(res)
        })
        .catch((err: any) => {
          Taro.showToast({
            icon: 'none',
            title: err.message || '请求错误'
          })
          reject(err)
        })
    })
  }

  // 更新用户信息
  updateUserInfo(userInfo: Record<string, any>) {
    return new Promise((resolve) => {
      Taro.setStorageSync('userInfo', userInfo)
      resolve(undefined)
    })
  }

  // 同步通用配置信息
  syncConfigInfo() {
    return new Promise((resolve, reject) => {
      request(apiMap.getCommonConfig, {})
        .then((res: any) => {
          const data = res.data || {}
          const configInfo = {
            loadingImage: data.loadingImage || '/images/loading.gif',
            currency: '¥'
          }
          Taro.setStorageSync('loadingImage', data.loadingImage)
          Taro.setStorageSync('configInfo', configInfo)
          resolve(res)
        })
        .catch((err: any) => {
          const fallback = {
            loadingImage: '/images/loading.gif',
            currency: '¥'
          }
          Taro.setStorageSync('configInfo', fallback)
          reject(err)
        })
    })
  }

  // 同步分享信息
  syncShareInfo() {
    return new Promise((resolve, reject) => {
      request(apiMap.getShareConfig, {})
        .then((res: any) => {
          const data = res.data || {}
          const shareInfo = {
            home: data.home || {},
            menu: data.menu || {},
            order: data.order || {}
          }
          Taro.setStorageSync('shareInfo', shareInfo)
          resolve(res)
        })
        .catch((err: any) => {
          Taro.setStorageSync('shareInfo', { home: {}, menu: {}, order: {} })
          reject(err)
        })
    })
  }

  // 同步用户分组信息
  syncStrategyInfo() {
    return new Promise((resolve, reject) => {
      request(apiMap.getStrategyInfo, {})
        .then((res: any) => {
          Taro.setStorageSync('strategyInfo', res.data.strategyInfo || '')
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 神策 AB 实验
  syncShenceABApi() {
    return new Promise((resolve, reject) => {
      request(apiMap.getABApi, { abNames: ['coupon_use', 'jjg', 'item_list'] })
        .then((res: any) => {
          Taro.setStorageSync('strategyGroup', res.data || {})
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 同步用户协议信息
  syncAgreementInfo() {
    return new Promise((resolve, reject) => {
      request(apiMap.getProtocols, {})
        .then((res: any) => {
          Taro.setStorageSync('agreementInfo', res.data.rules || [])
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 更新地址信息
  updateAddressInfo(addressInfo: Record<string, any> = {}) {
    return new Promise((resolve) => {
      Taro.setStorageSync('addressInfo', addressInfo)
      resolve(undefined)
    })
  }

  // 更新店铺信息
  updateStoreInfo(storeInfo: Record<string, any> = {}, silentSelectStore: boolean = false) {
    return new Promise((resolve) => {
      if (!silentSelectStore) {
        Taro.setStorageSync('hasSelectStore', true)
      }
      Taro.setStorageSync('storeInfo', storeInfo)
      
      const configInfo = Taro.getStorageSync('configInfo') || {}
      configInfo.currency = storeInfo.countryCurrencyTag
      Taro.setStorageSync('configInfo', configInfo)

      sensors.registerApp &&
        sensors.registerApp({
          store_id: () => {
            return storeInfo.storeId
          }
        })

      try {
        this.syncShenceABApi().then(() => {
          const strategyGroup = Taro.getStorageSync('strategyGroup') || {}
          sensors.registerApp &&
            sensors.registerApp({
              abTest: () => {
                return (
                  (strategyGroup &&
                    strategyGroup.coupon_use &&
                    strategyGroup.coupon_use.strategyInfo) ||
                  'coupon1B'
                )
              },
              abTests: () => {
                return strategyGroup || []
              }
            })
        })
      } catch (error) {
        console.log('----error: ', error)
      }
      resolve(undefined)
    })
  }

  // 拼单购物车拼单状态异常提示 仅类内部调用
  __pieceCartStatusHint(err: any) {
    switch (err.code) {
      case 531002:
        Taro.showModal({
          title: '提示',
          content: '拼单被取消，当前拼单已结束',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: theme.$themeColor,
          success: () => Taro.reLaunch({ url: pathMap.menu })
        })
        break
      case 531003:
        Taro.showModal({
          title: '提示',
          content: '拼单已锁定，无法修改商品',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: theme.$themeColor,
          success: () => {
            if (typeof (tools as any).navigateBackTargetPage === 'function') {
              ;(tools as any).navigateBackTargetPage('groupOrder')
            } else {
              Taro.navigateBack()
            }
          }
        })
        break
      case 531005:
        Taro.showModal({
          title: '提示',
          content: '拼单已结束',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: theme.$themeColor,
          success: () => Taro.reLaunch({ url: pathMap.menu })
        })
        break
      default:
        Taro.showToast({
          icon: 'none',
          title: err.message || '请求错误'
        })
    }
  }

  // 购物车活动超限提示 仅类内部调用
  __cartActivityLimitHint(data: any = {}) {
    data.failurePopInfo &&
      data.failurePopInfo.fromType === 2 &&
      Taro.showModal({
        title: '提示',
        content: data.failurePopInfo.message,
        showCancel: false,
        confirmText: '继续选购',
        confirmColor: theme.$themeColor
      })
  }

  // 购物车营销异常提示 仅类内部调用
  __cartMarketErrorHint(data: any = {}) {
    data.marketToast &&
      Taro.showToast({
        icon: 'none',
        title: data.marketToast
      })
  }

  // 常规购物车公共入参 仅类内部调用
  __normalCartCommonParams(data: Record<string, any>) {
    const commonParams: Record<string, any> = {
      cartType: 1,
      supportSlitFlag: true,
      hasSupIncrease: true
    }
    
    const couponInfo = Taro.getStorageSync('couponInfo') || {}
    const activeInfo = Taro.getStorageSync('activeInfo') || {}
    const normalCartInfo = Taro.getStorageSync('normalCartInfo') || {}
    
    if (typeof (check as any).isCouponProcess === 'function' && (check as any).isCouponProcess()) {
      commonParams.choiceCouponCode = couponInfo.couponCode
    }
    if (typeof (check as any).isActiveProcess === 'function' && (check as any).isActiveProcess()) {
      commonParams.promotionCode = activeInfo.activityId
    }
    if (typeof (check as any).isUseRecommendCoupon === 'function' && (check as any).isUseRecommendCoupon()) {
      commonParams.useRecommendCoupon = normalCartInfo.recommendUseCouponScene === 2
    }
    
    return { ...commonParams, ...data }
  }

  // 拼单购物车公共入参 仅类内部调用
  __pieceCartCommonParams(data: Record<string, any> = {}, item: Record<string, any> = {}) {
    const pieceInfo = Taro.getStorageSync('pieceInfo') || {}
    const commonParams: Record<string, any> = {
      pinId: pieceInfo.pinId,
      channel: pieceInfo.channel,
      storeId: pieceInfo.storeInfo?.storeId
    }
    Object.keys(item).length > 0 && (commonParams.item = item)
    return { ...commonParams, ...data }
  }

  // 拼单购物车出参处理 仅类内部调用
  __pieceCartResFormat(res: any = {}) {
    let pieceCartInfo = ((res.data || {}).childInfo || [])[0] || {}
    pieceCartInfo.selectedTotalCount = pieceCartInfo.totalCount
    res.data = pieceCartInfo
    return res
  }

  // 同步普通购物车信息
  syncNormalCart(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__normalCartCommonParams(data)
      request(apiMap.findNormalCartInfo, { ...data })
        .then((res: any) => {
          Taro.setStorageSync('normalCartInfo', res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          Taro.showToast({
            icon: 'none',
            title: err.message || '请求错误'
          })
          reject(err)
        })
    })
  }

  // 更新普通购物车信息
  updateNormalCartInfo(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__normalCartCommonParams(data)
      request(apiMap.updateNormalCartInfo, data, { loading: true })
        .then((res: any) => {
          Taro.setStorageSync('normalCartInfo', res.data)
          this.__cartMarketErrorHint(res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          Taro.showToast({
            icon: 'none',
            title: err.message || '请求错误'
          })
          reject(err)
        })
    })
  }

  // 修改普通购物车数量
  updateNormalCartCount(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__normalCartCommonParams(data)
      request(apiMap.updateNormalCartCount, { ...data }, { loading: true })
        .then((res: any) => {
          Taro.setStorageSync('normalCartInfo', res.data)
          this.__cartMarketErrorHint(res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          Taro.showToast({
            icon: 'none',
            title: err.message || '请求错误'
          })
          reject(err)
        })
    })
  }

  // 普通购物车列表商品勾选与取消
  updateNormalCartSelect(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__normalCartCommonParams(data)
      request(apiMap.updateNormalCartSelect, { ...data }, { loading: true })
        .then((res: any) => {
          Taro.setStorageSync('normalCartInfo', res.data)
          this.__cartMarketErrorHint(res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          Taro.showToast({
            icon: 'none',
            title: err.message || '请求错误'
          })
          reject(err)
        })
    })
  }

  // 清空普通购物车信息
  cleanNormalCartInfo() {
    return new Promise((resolve, reject) => {
      request(apiMap.cleanNormalCartInfo, { cartType: 1 })
        .then((res: any) => {
          Taro.setStorageSync('normalCartInfo', {})
          resolve(res)
        })
        .catch((err: any) => {
          Taro.showToast({
            icon: 'none',
            title: err.message || '请求错误'
          })
          reject(err)
        })
    })
  }

  // 同步拼单购物车信息
  syncPieceCart(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__pieceCartCommonParams(data)
      request(apiMap.findPieceCartInfo, { ...data })
        .then((res: any) => {
          res = this.__pieceCartResFormat(res)
          Taro.setStorageSync('pieceCartInfo', res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          this.__pieceCartStatusHint(err)
          reject(err)
        })
    })
  }

  // 更新拼单购物车信息
  updatePieceCartInfo(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__pieceCartCommonParams({}, data)
      request(apiMap.updatePieceCartInfo, { ...data }, { loading: true })
        .then((res: any) => {
          res = this.__pieceCartResFormat(res)
          Taro.setStorageSync('pieceCartInfo', res.data)
          this.__cartMarketErrorHint(res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          this.__pieceCartStatusHint(err)
          reject(err)
        })
    })
  }

  // 修改拼单购物车数量信息
  updatePieceCartCount(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__pieceCartCommonParams({}, data)
      request(apiMap.updatePieceCartCount, { ...data }, { loading: true })
        .then((res: any) => {
          res = this.__pieceCartResFormat(res)
          Taro.setStorageSync('pieceCartInfo', res.data)
          this.__cartMarketErrorHint(res.data)
          this.__cartActivityLimitHint(res.data)
          resolve(res)
        })
        .catch((err: any) => {
          this.__pieceCartStatusHint(err)
          reject(err)
        })
    })
  }

  // 清空拼单购物车信息
  cleanPieceCartInfo(data: Record<string, any> = {}) {
    return new Promise((resolve, reject) => {
      data = this.__pieceCartCommonParams({}, data)
      request(apiMap.cleanPieceCartInfo, { ...data })
        .then((res: any) => {
          Taro.setStorageSync('pieceCartInfo', {})
          resolve(res)
        })
        .catch((err: any) => {
          this.__pieceCartStatusHint(err)
          reject(err)
        })
    })
  }

  // 更新拼单信息
  updatePieceInfo(pieceInfo: Record<string, any> = {}) {
    return new Promise((resolve) => {
      Taro.setStorageSync('pieceInfo', pieceInfo)
      resolve(undefined)
    })
  }

  // 更新定位信息
  updatePositionInfo(positionInfo: Record<string, any> = {}) {
    return new Promise((resolve) => {
      Taro.setStorageSync('positionInfo', positionInfo)
      resolve(undefined)
    })
  }

  // 同步系统设备信息
  updateSystemInfo() {
    return new Promise((resolve) => {
      try {
        const systemInfo = Taro.getSystemInfoSync()
        Taro.setStorageSync('systemInfo', systemInfo)
      } catch {}
      resolve(undefined)
    })
  }

  // 更新弹层频率信息
  updatePopupInfo(popKey: string, popType: string, image: string) {
    return new Promise((resolve) => {
      const popupInfo = Taro.getStorageSync('popupInfo') || {}
      popupInfo[`${popKey}_${popType}`] = image
      Taro.setStorageSync('popupInfo', popupInfo)
      resolve(undefined)
    })
  }

  // 同步注册会员是否拦截信息
  updateLoginIntercept(isIntercept: boolean) {
    return new Promise((resolve) => {
      const popupInfo = Taro.getStorageSync('popupInfo') || {}
      popupInfo.loginIntercept = isIntercept
      Taro.setStorageSync('popupInfo', popupInfo)
      resolve(undefined)
    })
  }

  // 同步点餐页浮标信息
  updateMenuFloatImage(image: string) {
    return new Promise((resolve) => {
      const popupInfo = Taro.getStorageSync('popupInfo') || {}
      popupInfo.menuFloatImage = image
      Taro.setStorageSync('popupInfo', popupInfo)
      resolve(undefined)
    })
  }

  // 同步订单浮标信息
  updateOrderFloatImage(image: string) {
    return new Promise((resolve) => {
      const popupInfo = Taro.getStorageSync('popupInfo') || {}
      popupInfo.orderFloatImage = image
      Taro.setStorageSync('popupInfo', popupInfo)
      resolve(undefined)
    })
  }

  // 同步切前台参数信息
  updateQueryInfo(queryInfo: any) {
    return new Promise((resolve) => {
      Taro.setStorageSync('queryInfo', queryInfo)

      const scanCode: any = tools.getScanCode() || {}
      const regChannelCode = scanCode.regChannelCode || scanCode.regStoreCode || ''
      const scanSplit = regChannelCode.split('|') || []
      
      sensors.registerApp &&
        sensors.registerApp({
          promotion_channel_id: scanSplit[0] || '',
          store_channel_id: scanCode.regStoreCode || ''
        })

      resolve(undefined)
    })
  }

  // 同步券商品流程信息
  updateCouponInfo(couponInfo: Record<string, any> = {}) {
    return new Promise((resolve) => {
      Taro.setStorageSync('couponInfo', couponInfo)
      resolve(undefined)
    })
  }

  // 清空券商品流程信息
  cleanCouponInfo() {
    return new Promise((resolve) => {
      Taro.setStorageSync('couponInfo', {})
      resolve(undefined)
    })
  }

  // 同步活动商品流程信息
  updateActiveInfo(activeInfo: Record<string, any> = {}) {
    return new Promise((resolve) => {
      Taro.setStorageSync('activeInfo', activeInfo)
      resolve(undefined)
    })
  }

  // 清空活动商品流程信息
  cleanActiveInfo() {
    return new Promise((resolve) => {
      Taro.setStorageSync('activeInfo', {})
      resolve(undefined)
    })
  }
}

const dataSync = new DataSync()

export default dataSync
