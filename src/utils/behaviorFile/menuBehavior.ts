/**
 * 菜单类页面 Behavior
 * 从原生小程序 Behavior 迁移为工具函数集合
 * 提供弹窗队列管理、配置数据处理等功能
 */
import Taro from '@tarojs/taro'
import theme from '../commonFile/theme'

// 弹窗队列管理状态
interface PopupState {
  popupStack: string[]
  popupCurrent: string
}

// 创建弹窗状态（可在页面组件中使用）
export function createPopupState(): PopupState {
  return {
    popupStack: [],
    popupCurrent: ''
  }
}

// 菜单行为工具函数集合
const menuBehavior = {
  /**
   * 处理配置数据 - 解析不同主题的配置信息
   * @param params 配置参数数组
   * @param data 配置数据对象
   */
  handleConfigData(
    params: Array<{ subjectId: number; showLocations?: number[] }> = [],
    data: Record<number, any> = {}
  ): {
    floatActives?: any
    bannerActives?: any
    openInfo?: any
  } {
    const result: any = {}

    params.forEach(t => {
      switch (t.subjectId) {
        case 8: // 浮窗活动
          result.floatActives =
            (data[t.subjectId] &&
              data[t.subjectId][4] &&
              data[t.subjectId][4][0]) ||
            {}
          break
        case 16: // Banner 活动
          result.bannerActives =
            (data[t.subjectId] &&
              t.showLocations &&
              data[t.subjectId][t.showLocations[0]] &&
              data[t.subjectId][t.showLocations[0]][0]) ||
            {}
          break
        case 19: // 开屏信息
          result.openInfo =
            (data[t.subjectId] &&
              data[t.subjectId][0] &&
              data[t.subjectId][0][0]) ||
            {}
          break
        default:
          break
      }
    })

    return result
  },

  /**
   * 弹窗队列 - 执行下一个弹窗
   * @param state 弹窗状态
   * @param callbacks 弹窗回调函数映射
   */
  popupNextTick(
    state: PopupState,
    callbacks?: Record<string, () => void>
  ): void {
    state.popupCurrent = ''
    this.popupEventLoop(state, callbacks)
  },

  /**
   * 弹窗队列 - 清空队列
   * @param state 弹窗状态
   */
  popupEventClear(state: PopupState): void {
    state.popupCurrent = ''
    state.popupStack = []
  },

  /**
   * 弹窗队列 - 事件循环
   * @param state 弹窗状态
   * @param callbacks 弹窗回调函数映射
   */
  popupEventLoop(
    state: PopupState,
    callbacks?: Record<string, () => void>
  ): void {
    if (!state.popupStack.length || state.popupCurrent) return

    const nextPopup = state.popupStack.shift()
    if (!nextPopup) return

    state.popupCurrent = nextPopup

    // 执行对应的弹窗回调
    if (callbacks && callbacks[nextPopup]) {
      callbacks[nextPopup]()
    }
  },

  /**
   * 弹窗队列 - 注册弹窗
   * @param state 弹窗状态
   * @param stack 要注册的弹窗名称数组
   * @param callbacks 弹窗回调函数映射
   */
  popupEventRegister(
    state: PopupState,
    stack: string[],
    callbacks?: Record<string, () => void>
  ): void {
    stack.forEach(t => {
      // 避免重复添加
      if (t === state.popupCurrent || state.popupStack.includes(t)) {
        return
      }
      state.popupStack.push(t)
    })

    this.popupEventLoop(state, callbacks)
  },

  /**
   * 提醒错误商品弹窗
   * @param cartInfo 购物车信息
   * @param onNotice 通知回调
   * @param onNext 下一步回调
   */
  noticeErrorProduct(
    cartInfo: any,
    onNotice?: () => void,
    onNext?: () => void
  ): void {
    const failurePopInfo = cartInfo?.failurePopInfo || {}
    
    if ([1, 3].includes(failurePopInfo.fromType)) {
      // 显示错误通知
      onNotice && onNotice()
    } else {
      // 执行下一步
      onNext && onNext()
    }
  },

  /**
   * 提醒购物车营销信息
   * @param cartInfo 购物车信息
   * @param onClear 清空回调
   * @param onNext 下一步回调
   */
  noticeCartMarket(
    cartInfo: any,
    onClear?: () => void,
    onNext?: () => void
  ): void {
    const marketToast = cartInfo?.marketToast
    
    if (marketToast) {
      Taro.showToast({ icon: 'none', title: marketToast })
      onClear && onClear()
    }
    
    onNext && onNext()
  },

  /**
   * 提醒门店即将关闭
   * @param storeInfo 门店信息
   * @param onNext 下一步回调
   */
  noticeStoreClosingSoon(
    storeInfo: any,
    onNext?: () => void
  ): void {
    const closeStoreRemind = storeInfo?.closeStoreRemind
    
    if (!closeStoreRemind) {
      onNext && onNext()
      return
    }

    Taro.showModal({
      title: '提示',
      content: closeStoreRemind,
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          onNext && onNext()
        }
      }
    })
  }
}

export default menuBehavior
