import Taro from '@tarojs/taro'
import dataSync from '../dataFile/dataSync'
import check from './check'
import request from '../dataFile/request'
import apiMap from '../mapFile/apiMap'
import tools from './tools'

/**
 * 业务工具类 - 与原生 business 保持同名导出
 */
class Business {
  /**
   * 静默定位附近门店
   */
  silentLocateStore(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (check.isSelectedStore()) return resolve()
      Taro.getSetting({
        success: res => {
          if (!res.authSetting['scope.userLocation']) return resolve()
          Taro.getLocation({
            type: 'gcj02',
            success: res => {
              dataSync.updatePositionInfo(res).then()
              this._getLocationStoreInfo().then(() => resolve(), () => resolve())
            },
            fail: () => resolve()
          })
        },
        fail: () => resolve()
      })
    })
  }

  /**
   * 授权定位附近门店
   */
  authLocateStore(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (check.isSelectedStore()) return resolve()
      
      Taro.getLocation({
        type: 'gcj02',
        success: res => {
          dataSync.updatePositionInfo(res).then()
          this._getLocationStoreInfo().then(() => resolve(), () => resolve())
        },
        fail: () => resolve()
      })
    })
  }

  /**
   * 获取附近门店
   */
  _getLocationStoreInfo(path?: string, params?: any): Promise<void> {
    return new Promise((resolve, reject) => {
      request(apiMap.getStoreInfo, {}).then(
        (res: any) => {
          let storeInfo = res.data[0] || {}
          if (Object.keys(storeInfo).length) {
            storeInfo.distanceToUser = tools.getDistanceToUserForStoreInfo(storeInfo)
          }
          dataSync.updateStoreInfo(storeInfo, true).then()
          let stallType = (storeInfo.stallDtos && storeInfo.stallDtos[0] && storeInfo.stallDtos[0].stallTypeCode)
          dataSync.updateStallInfo(stallType).then()
          resolve()
        },
        (err: any) => reject(err)
      )
    })
  }

  /**
   * 检测弹窗展示是否超限并设置展示次数
   */
  checkPopupLimitAndSetTimes(popupActives: any = {}, popKey: string): boolean {
    const { popType, noShowNumLimit, showNumber, showLimitValue, image } = popupActives
    const today = new Date()
    const dateString = today.toLocaleDateString()
    
    if (noShowNumLimit) return true

    if (showNumber === 0) {
      if (popType === 2 || popType === 8) return true
      const popupInfo = Taro.getStorageSync('popupInfo') || {}
      if (popupInfo[`${popKey}_${popType}`] !== image) {
        dataSync.updatePopupInfo(popKey, popType, image).then()
        return true
      }
    } else if (showNumber === 1) {
      const popupImage = Taro.getStorageSync(`image_${popKey}_${popType}`)
      const popupStamp = Taro.getStorageSync(`stamp_${popKey}_${popType}`)
      if (popupImage !== image || popupStamp !== dateString) {
        Taro.setStorageSync(`image_${popKey}_${popType}`, image)
        Taro.setStorageSync(`stamp_${popKey}_${popType}`, dateString)
        return true
      }
    } else if (showNumber === 2) {
      const popupImage = Taro.getStorageSync(`image_${popKey}_${popType}`)
      const popupStamp = Taro.getStorageSync(`stamp_${popKey}_${popType}`)
      if (popupImage !== image || popupStamp < dateString) {
        today.setDate(today.getDate() + Number((showLimitValue || 0) - 1))
        Taro.setStorageSync(`image_${popKey}_${popType}`, image)
        Taro.setStorageSync(`stamp_${popKey}_${popType}`, today.toLocaleDateString())
        return true
      }
    }
    return false
  }

  /**
   * 检测加小奈活动弹窗是否超限并设置展示信息
   */
  checkCartLimitAndSetTimes(popupActives: any = {}): boolean {
    const { limitType, activityCode } = popupActives
    const today = new Date()
    const dateString = today.toLocaleDateString()
    const limitActive = Taro.getStorageSync(`limit_active_${limitType}_${activityCode}`)
    const limitStamp = Taro.getStorageSync(`limit_stamp_${limitType}_${activityCode}`)
    
    if (!limitActive || limitStamp !== dateString) {
      Taro.setStorageSync(`limit_active_${limitType}_${activityCode}`, true)
      Taro.setStorageSync(`limit_stamp_${limitType}_${activityCode}`, dateString)
      return true
    }
    return false
  }

  /**
   * 打开摇一摇营销插件
   */
  openBusinessView(params: any = {}): void {
    const { couponCode, stockId, action } = params
    if (!couponCode) return
    if (!(Taro as any).openBusinessView) return
    
    const data = {
      stockId: stockId,
      exchangeCode: couponCode
    }
    
    request(apiMap.receiveCheck, data).then(
      (res: any) => {
        ;(Taro as any).openBusinessView({
          businessType: action,
          extraData: {
            couponCode: couponCode,
            stockId: stockId,
            authState: res.data.state
          },
          success: (response: any) => {
            if (response.extraData.action === 'auth') {
              dataSync.updateQueryInfo({
                path: '',
                query: { ic: res.data.registerCode },
                scene: 1037
              }).then()
              return
            }
            if (response.extraData.action === 'switchAccount') {
              Taro.navigateTo({ url: '/pages/quit/index' })
              return
            }
            if (response.extraData.action === 'selectProduct' && response.extraData.productPath) {
              try {
                const { itemType, itemId } = tools.parseUrlParamsToObject(response.extraData.productPath)
                Taro.navigateTo({
                  url: tools.splicePageUrl(
                    Number(itemType) === 2 ? '/pages/package/index' : '/pages/product/index',
                    {
                      referrer: 'menu',
                      itemId: itemId,
                      stallType: Taro.getStorageSync('stallType')
                    }
                  )
                })
              } catch (error) {
                console.log('----extraData.action: ', error)
              }
            }
            request(apiMap.receiveWechatStocks, data).then()
          }
        })
      },
      (err: any) => {
        Taro.showToast({
          icon: 'none',
          title: err.message || '请求错误'
        })
      }
    )
  }
}

const business = new Business()
export default business
