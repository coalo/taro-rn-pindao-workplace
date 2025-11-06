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
        success: async (res: any) => {
          if (!res.code) {
            resolve({})
            return
          }
          
          const data = {
            type: config.loginType,
            wxappCode: res.code,
            ...tools.getScanCode()
          }
          
          try {
            const result: any = await request(apiMap.loginVerify, data)
            await Taro.setStorage({ key: 'accessToken', data: result.data.accessToken || '' })
            await Taro.setStorage({ key: 'openId', data: result.data.openId || '' })
            await Taro.setStorage({ key: 'unionId', data: result.data.unionId || '' })
            resolve(result)
          } catch (err: any) {
            Taro.showToast({
              icon: 'none',
              title: err.message || '请求错误'
            })
            resolve(res)
          }
        }
      })
    })
  }

  // 更新 accessToken 信息
  async updateAccessToken(accessToken: string = '') {
    await Taro.setStorage({ key: 'accessToken', data: accessToken })
    return Promise.resolve(undefined)
  }

  // 清除 accessToken 信息
  async cleanAccessToken() {
    await Taro.setStorage({ key: 'accessToken', data: '' })
    await Taro.setStorage({ key: 'hasSilentLogin', data: false })

    try {
      ;(sensors as any).logout && (sensors as any).logout()
      ;(sensors as any).resetAnonymousIdentity && (sensors as any).resetAnonymousIdentity()
    } catch {}

    return Promise.resolve(undefined)
  }

  // 更新购买渠道
  async updateChannel(channel: number = 2) {
    await Taro.setStorage({ key: 'channel', data: channel })
    sensors.settingOrderForm && sensors.settingOrderForm()
    return Promise.resolve(undefined)
  }

  // 更新档口信息
  async updateStallInfo(stallType?: string) {
    await Taro.setStorage({ key: 'stallType', data: stallType || '' })
    return Promise.resolve(undefined)
  }

  // 同步用户信息
  async syncUserInfo() {
    try {
      const res: any = await request(apiMap.getUserInfo, {})
      await Taro.setStorage({ key: 'userInfo', data: res.data })
      return res
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
      throw err
    }
  }

  // 更新用户信息
  async updateUserInfo(userInfo: Record<string, any>) {
    await Taro.setStorage({ key: 'userInfo', data: userInfo })
    return Promise.resolve(undefined)
  }

  // 同步通用配置信息
  async syncConfigInfo() {
    try {
      const res: any = await request(apiMap.getCommonConfig, {})
      const data = res.data || {}
      const configInfo = {
        loadingImage: data.loadingImage || '/images/loading.gif',
        currency: '¥'
      }
      await Taro.setStorage({ key: 'loadingImage', data: data.loadingImage })
      await Taro.setStorage({ key: 'configInfo', data: configInfo })
      return res
    } catch (err: any) {
      const fallback = {
        loadingImage: '/images/loading.gif',
        currency: '¥'
      }
      await Taro.setStorage({ key: 'configInfo', data: fallback })
      throw err
    }
  }

  // 同步分享信息
  async syncShareInfo() {
    try {
      const res: any = await request(apiMap.getShareConfig, {})
      const data = res.data || {}
      const shareInfo = {
        home: data.home || {},
        menu: data.menu || {},
        order: data.order || {}
      }
      await Taro.setStorage({ key: 'shareInfo', data: shareInfo })
      return res
    } catch (err: any) {
      await Taro.setStorage({ key: 'shareInfo', data: { home: {}, menu: {}, order: {} } })
      throw err
    }
  }

  // 同步用户分组信息
  async syncStrategyInfo() {
    try {
      const res: any = await request(apiMap.getStrategyInfo, {})
      await Taro.setStorage({ key: 'strategyInfo', data: res.data.strategyInfo || '' })
      return res
    } catch (err: any) {
      throw err
    }
  }

  // 神策 AB 实验
  async syncShenceABApi() {
    try {
      const res: any = await request(apiMap.getABApi, { abNames: ['coupon_use', 'jjg', 'item_list'] })
      await Taro.setStorage({ key: 'strategyGroup', data: res.data || {} })
      return res
    } catch (err: any) {
      throw err
    }
  }

  // 同步用户协议信息
  async syncAgreementInfo() {
    try {
      const res: any = await request(apiMap.getProtocols, {})
      await Taro.setStorage({ key: 'agreementInfo', data: res.data.rules || [] })
      return res
    } catch (err: any) {
      throw err
    }
  }

  // 更新地址信息
  async updateAddressInfo(addressInfo: Record<string, any> = {}) {
    await Taro.setStorage({ key: 'addressInfo', data: addressInfo })
    return Promise.resolve(undefined)
  }

  // 更新店铺信息
  async updateStoreInfo(storeInfo: Record<string, any> = {}, silentSelectStore: boolean = false) {
    if (!silentSelectStore) {
      await Taro.setStorage({ key: 'hasSelectStore', data: true })
    }
    await Taro.setStorage({ key: 'storeInfo', data: storeInfo })
    
    const configInfoRes = await Taro.getStorage({ key: 'configInfo' }).catch(() => ({ data: {} }))
    const configInfo = configInfoRes.data || {}
    configInfo.currency = storeInfo.countryCurrencyTag
    await Taro.setStorage({ key: 'configInfo', data: configInfo })

    sensors.registerApp &&
      sensors.registerApp({
        store_id: () => {
          return storeInfo.storeId
        }
      })

    try {
      await this.syncShenceABApi()
      const strategyGroupRes = await Taro.getStorage({ key: 'strategyGroup' }).catch(() => ({ data: {} }))
      const strategyGroup = strategyGroupRes.data || {}
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
    } catch (error) {
      console.log('----error: ', error)
    }
    return Promise.resolve(undefined)
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
  async __normalCartCommonParams(data: Record<string, any>) {
    const commonParams: Record<string, any> = {
      cartType: 1,
      supportSlitFlag: true,
      hasSupIncrease: true
    }
    
    const couponInfoRes = await Taro.getStorage({ key: 'couponInfo' }).catch(() => ({ data: {} }))
    const activeInfoRes = await Taro.getStorage({ key: 'activeInfo' }).catch(() => ({ data: {} }))
    const normalCartInfoRes = await Taro.getStorage({ key: 'normalCartInfo' }).catch(() => ({ data: {} }))
    const couponInfo = couponInfoRes.data || {}
    const activeInfo = activeInfoRes.data || {}
    const normalCartInfo = normalCartInfoRes.data || {}
    
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
  async __pieceCartCommonParams(data: Record<string, any> = {}, item: Record<string, any> = {}) {
    const pieceInfoRes = await Taro.getStorage({ key: 'pieceInfo' }).catch(() => ({ data: {} }))
    const pieceInfo = pieceInfoRes.data || {}
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
  async syncNormalCart(data: Record<string, any> = {}) {
    try {
      data = await this.__normalCartCommonParams(data)
      const res: any = await request(apiMap.findNormalCartInfo, { ...data })
      await Taro.setStorage({ key: 'normalCartInfo', data: res.data })
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
      throw err
    }
  }

  // 更新普通购物车信息
  async updateNormalCartInfo(data: Record<string, any> = {}) {
    try {
      data = await this.__normalCartCommonParams(data)
      const res: any = await request(apiMap.updateNormalCartInfo, data, { loading: true })
      await Taro.setStorage({ key: 'normalCartInfo', data: res.data })
      this.__cartMarketErrorHint(res.data)
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
      throw err
    }
  }

  // 修改普通购物车数量
  async updateNormalCartCount(data: Record<string, any> = {}) {
    try {
      data = await this.__normalCartCommonParams(data)
      const res: any = await request(apiMap.updateNormalCartCount, { ...data }, { loading: true })
      await Taro.setStorage({ key: 'normalCartInfo', data: res.data })
      this.__cartMarketErrorHint(res.data)
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
      throw err
    }
  }

  // 普通购物车列表商品勾选与取消
  async updateNormalCartSelect(data: Record<string, any> = {}) {
    try {
      data = await this.__normalCartCommonParams(data)
      const res: any = await request(apiMap.updateNormalCartSelect, { ...data }, { loading: true })
      await Taro.setStorage({ key: 'normalCartInfo', data: res.data })
      this.__cartMarketErrorHint(res.data)
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
      throw err
    }
  }

  // 清空普通购物车信息
  async cleanNormalCartInfo() {
    try {
      const res: any = await request(apiMap.cleanNormalCartInfo, { cartType: 1 })
      await Taro.setStorage({ key: 'normalCartInfo', data: {} })
      return res
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
      throw err
    }
  }

  // 同步拼单购物车信息
  async syncPieceCart(data: Record<string, any> = {}) {
    try {
      data = await this.__pieceCartCommonParams(data)
      let res: any = await request(apiMap.findPieceCartInfo, { ...data })
      res = this.__pieceCartResFormat(res)
      await Taro.setStorage({ key: 'pieceCartInfo', data: res.data })
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      this.__pieceCartStatusHint(err)
      throw err
    }
  }

  // 更新拼单购物车信息
  async updatePieceCartInfo(data: Record<string, any> = {}) {
    try {
      data = await this.__pieceCartCommonParams({}, data)
      let res: any = await request(apiMap.updatePieceCartInfo, { ...data }, { loading: true })
      res = this.__pieceCartResFormat(res)
      await Taro.setStorage({ key: 'pieceCartInfo', data: res.data })
      this.__cartMarketErrorHint(res.data)
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      this.__pieceCartStatusHint(err)
      throw err
    }
  }

  // 修改拼单购物车数量信息
  async updatePieceCartCount(data: Record<string, any> = {}) {
    try {
      data = await this.__pieceCartCommonParams({}, data)
      let res: any = await request(apiMap.updatePieceCartCount, { ...data }, { loading: true })
      res = this.__pieceCartResFormat(res)
      await Taro.setStorage({ key: 'pieceCartInfo', data: res.data })
      this.__cartMarketErrorHint(res.data)
      this.__cartActivityLimitHint(res.data)
      return res
    } catch (err: any) {
      this.__pieceCartStatusHint(err)
      throw err
    }
  }

  // 清空拼单购物车信息
  async cleanPieceCartInfo(data: Record<string, any> = {}) {
    try {
      data = await this.__pieceCartCommonParams({}, data)
      const res: any = await request(apiMap.cleanPieceCartInfo, { ...data })
      await Taro.setStorage({ key: 'pieceCartInfo', data: {} })
      return res
    } catch (err: any) {
      this.__pieceCartStatusHint(err)
      throw err
    }
  }

  // 更新拼单信息
  async updatePieceInfo(pieceInfo: Record<string, any> = {}) {
    await Taro.setStorage({ key: 'pieceInfo', data: pieceInfo })
    return Promise.resolve(undefined)
  }

  // 更新定位信息
  async updatePositionInfo(positionInfo: Record<string, any> = {}) {
    await Taro.setStorage({ key: 'positionInfo', data: positionInfo })
    return Promise.resolve(undefined)
  }

  // 同步系统设备信息
  async updateSystemInfo() {
    try {
      const systemInfo = Taro.getSystemInfoSync()
      await Taro.setStorage({ key: 'systemInfo', data: systemInfo })
    } catch {}
    return Promise.resolve(undefined)
  }

  // 更新弹层频率信息
  async updatePopupInfo(popKey: string, popType: string, image: string) {
    const popupInfoRes = await Taro.getStorage({ key: 'popupInfo' }).catch(() => ({ data: {} }))
    const popupInfo = popupInfoRes.data || {}
    popupInfo[`${popKey}_${popType}`] = image
    await Taro.setStorage({ key: 'popupInfo', data: popupInfo })
    return Promise.resolve(undefined)
  }

  // 同步注册会员是否拦截信息
  async updateLoginIntercept(isIntercept: boolean) {
    const popupInfoRes = await Taro.getStorage({ key: 'popupInfo' }).catch(() => ({ data: {} }))
    const popupInfo = popupInfoRes.data || {}
    popupInfo.loginIntercept = isIntercept
    await Taro.setStorage({ key: 'popupInfo', data: popupInfo })
    return Promise.resolve(undefined)
  }

  // 同步点餐页浮标信息
  async updateMenuFloatImage(image: string) {
    const popupInfoRes = await Taro.getStorage({ key: 'popupInfo' }).catch(() => ({ data: {} }))
    const popupInfo = popupInfoRes.data || {}
    popupInfo.menuFloatImage = image
    await Taro.setStorage({ key: 'popupInfo', data: popupInfo })
    return Promise.resolve(undefined)
  }

  // 同步订单浮标信息
  async updateOrderFloatImage(image: string) {
    const popupInfoRes = await Taro.getStorage({ key: 'popupInfo' }).catch(() => ({ data: {} }))
    const popupInfo = popupInfoRes.data || {}
    popupInfo.orderFloatImage = image
    await Taro.setStorage({ key: 'popupInfo', data: popupInfo })
    return Promise.resolve(undefined)
  }

  // 同步切前台参数信息
  async updateQueryInfo(queryInfo: any) {
    await Taro.setStorage({ key: 'queryInfo', data: queryInfo })

    const scanCode: any = tools.getScanCode() || {}
    const regChannelCode = scanCode.regChannelCode || scanCode.regStoreCode || ''
    const scanSplit = regChannelCode.split('|') || []
    
    sensors.registerApp &&
      sensors.registerApp({
        promotion_channel_id: scanSplit[0] || '',
        store_channel_id: scanCode.regStoreCode || ''
      })

    return Promise.resolve(undefined)
  }

  // 同步券商品流程信息
  async updateCouponInfo(couponInfo: Record<string, any> = {}) {
    await Taro.setStorage({ key: 'couponInfo', data: couponInfo })
    return Promise.resolve(undefined)
  }

  // 清空券商品流程信息
  async cleanCouponInfo() {
    await Taro.setStorage({ key: 'couponInfo', data: {} })
    return Promise.resolve(undefined)
  }

  // 同步活动商品流程信息
  async updateActiveInfo(activeInfo: Record<string, any> = {}) {
    await Taro.setStorage({ key: 'activeInfo', data: activeInfo })
    return Promise.resolve(undefined)
  }

  // 清空活动商品流程信息
  async cleanActiveInfo() {
    await Taro.setStorage({ key: 'activeInfo', data: {} })
    return Promise.resolve(undefined)
  }
}

const dataSync = new DataSync()

export default dataSync
