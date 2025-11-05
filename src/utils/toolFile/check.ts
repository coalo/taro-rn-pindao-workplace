import Taro from '@tarojs/taro'

/**
 * 校验工具 - 与原生 check 保持同名导出
 */
class Check {
  // 测试是否为IPhoneX系列设备
  isIPhoneX(): boolean {
    try {
      const systemInfo = Taro.getStorageSync('systemInfo') || {}
      const { model = '', statusBarHeight = 0 } = systemInfo
      return model.includes('iPhone') && statusBarHeight >= 44
    } catch {
      return false
    }
  }

  // 检查是否已登录（accessToken 存在）
  isLogin(): boolean {
    try {
      const accessToken = Taro.getStorageSync('accessToken')
      return !!accessToken
    } catch {
      return false
    }
  }

  // 检测是否是普通用户
  isUser(): boolean {
    try {
      if (!this.isLogin()) return false
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.vip === -1
    } catch {
      return false
    }
  }

  // 检查是否为会员
  isMember(): boolean {
    try {
      if (!this.isLogin()) return false
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.vip === 0
    } catch {
      return false
    }
  }

  // 检测是否是学生
  isStudent(): boolean {
    try {
      if (!this.isLogin()) return false
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.studentCardStatus === 1 && !userInfo.studentCardExpireFlag
    } catch {
      return false
    }
  }

  // 检测是否是员工
  isStaff(): boolean {
    try {
      if (!this.isLogin()) return false
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.identitys && userInfo.identitys.some((t: number) => t === 4)
    } catch {
      return false
    }
  }

  // 检测是否拥有头像
  hasPersonalInfo(): boolean {
    try {
      if (!this.isLogin()) return false
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.authImage === 1
    } catch {
      return false
    }
  }

  // 检测是否拥有昵称
  existNickName(): boolean {
    try {
      if (!this.isLogin()) return false
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.existNickName === 1
    } catch {
      return false
    }
  }

  // 检测是否绑定UnionId
  isBindUnionId(): boolean {
    try {
      const userInfo = Taro.getStorageSync('userInfo') || {}
      return userInfo.checkUnionId === 1
    } catch {
      return false
    }
  }

  // 检测是否选择店铺
  isSelectedStore(): boolean {
    try {
      const storeInfo = Taro.getStorageSync('storeInfo') || {}
      return !!Object.keys(storeInfo).length
    } catch {
      return false
    }
  }

  // 检测是否参与拼单
  isJoinPiece(): boolean {
    try {
      const pieceInfo = Taro.getStorageSync('pieceInfo') || {}
      return !!Object.keys(pieceInfo).length
    } catch {
      return false
    }
  }

  // 检测是否是拼单拼主
  isPieceSponsor(): boolean {
    try {
      const pieceInfo = Taro.getStorageSync('pieceInfo') || {}
      const pieceUserList = pieceInfo.childInfo || []
      const userInfo = Taro.getStorageSync('userInfo') || {}
      const userId = userInfo.userId || ''
      const user = pieceUserList.find((t: any) => t.user.id === userId) || {}
      return user.pinOwner
    } catch {
      return false
    }
  }

  // 检测是否在券商品流程中
  isCouponProcess(): boolean {
    try {
      const couponInfo = Taro.getStorageSync('couponInfo') || {}
      return !!Object.keys(couponInfo).length
    } catch {
      return false
    }
  }

  // 检测是否在活动商品流程中
  isActiveProcess(): boolean {
    try {
      const activeInfo = Taro.getStorageSync('activeInfo') || {}
      return !!Object.keys(activeInfo).length
    } catch {
      return false
    }
  }

  // 检测是否使用推荐优惠券
  isUseRecommendCoupon(): boolean {
    try {
      const normalCartInfo = Taro.getStorageSync('normalCartInfo') || {}
      return !!normalCartInfo.recommendUseCouponScene
    } catch {
      return false
    }
  }

  // 检测是否是TabBar页面
  isTabBarPage(): boolean {
    try {
      const pages = Taro.getCurrentPages()
      if (pages.length === 0) return false
      const currentPage = pages[pages.length - 1]
      const route = currentPage.route || ''
      const tabPageList = ['pages/home/index', 'pages/menu/index', 'pages/order/index', 'pages/my/index']
      return tabPageList.some(t => route.includes(t))
    } catch {
      return false
    }
  }

  // 检测是否是重启页面
  isReLaunchPage(): boolean {
    try {
      const pages = Taro.getCurrentPages()
      if (pages.length === 0) return false
      const currentPage = pages[pages.length - 1]
      const route = currentPage.route || ''
      const reLaunchPageList = ['pages/home/index', 'pages/menu/index']
      return reLaunchPageList.some(t => route.includes(t))
    } catch {
      return false
    }
  }

  // 检测当前用户是否开启了某些订阅消息
  isWithSubscriptions(needSubscriptions: string[] = []): Promise<boolean> {
    return new Promise(resolve => {
      Taro.getSetting({
        withSubscriptions: true,
        success: (res: any) => {
          const subscriptionsSetting = (res && res.subscriptionsSetting) || {}
          resolve(needSubscriptions.some(item => subscriptionsSetting[item] === 'reject' || !subscriptionsSetting[item]))
        },
        fail: () => resolve(true)
      })
    })
  }

  // 邮箱校验
  isEmail(value: string): boolean {
    // eslint-disable-next-line no-useless-escape
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
  }

  // 手机号校验
  isPhone(value: string): boolean {
    const phoneReg = /^1\d{10}$/
    return value.length === 11 && phoneReg.test(value)
  }

  // 座机
  isTel(value: string): boolean {
    const telReg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/
    return value.indexOf('-') !== -1 && telReg.test(value)
  }

  // 税号识别号校验
  isCompanyTaxNo(value: string): boolean {
    return !/.*[\u4e00-\u9fa5]+.*$/.test(value)
  }

  // 税号只可以输入字母、数字
  isTaxNo(value: string): boolean {
    return /^[0-9a-zA-Z]*$/g.test(value)
  }
}

const check = new Check()
export default check
