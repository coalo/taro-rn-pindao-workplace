/**
 * 路由路径映射文件
 * 从原生小程序完整迁移，包含主包与所有分包路径
 */
import pkgMarketPathMap from '../packageFile/pkgMarket/pathMap'
import pkgReceivePathMap from '../packageFile/pkgReceive/pathMap'
import pkgBasicsPathMap from '../packageFile/pkgBasics/pathMap'
import pkgOrderPathMap from '../packageFile/pkgOrder/pathMap'
import pkgSharesPathMap from '../packageFile/pkgShares/pathMap'

// 路径映射对象类型
type PathMapObject = Record<string, string>

// 合并路径映射函数
const mergePathMap = (map: PathMapObject, target: PathMapObject = pathMap): void => {
  Object.keys(map).forEach(key => {
    if (target[key]) {
      throw new Error(`检测到重复的路径键值：${key}`)
    } else {
      target[key] = map[key]
    }
  })
}

// 主包路径映射
const mainPathMap: PathMapObject = {
  home: '/pages/index/index',
  menu: '/pages/takefood/index',
  package: '/pages/package/package',
  piece: '/pages/piece/piece',
  product: '/pages/product/product',
  bindPhone: '/pages/login/bindPhone/bindPhone',
  bindUnionId: '/pages/login/bindUnionId/bindUnionId',
  storeList: '/pages/store/storeList/storeList',
  storeSearch: '/pages/store/storeSearch/storeSearch',
  storeDetail: '/pages/store/storeDetail/storeDetail',
  storeNearby: '/pages/store/storeNearby/storeNearby',
  areaSelect: '/pages/store/areaSelect/areaSelect',
  webView: '/pages/webView/webView',
  paradise: '/pages/paradise/index',
  cardBuy: '/pages/giftcard/card/index',
  cardList: '/pages/giftcard/list/index',
  getCard: '/pages/giftcard/sharecard/index',
  mine: '/pages/user/index',
  orderList: '/pages/order/orderList/orderList',
  orderDetail: '/pages/takeMeals/index',
  coupon: '/pages/coupon/list/list',
  couponNew: '/pages/coupon/listNew/listNew',
  groupOrder: '/pages/groupOrder/groupOrder',
  exchangeCenter: '/pages/exchangeCenter/exchangeCenter',
  memberRecharge: '/pages/member/recharge/recharge',
  couponPackageList: '/pages/couponPackage/list/list',
  signInReminder: '/pages/signInReminder/signInReminder',
  billDetails: '/pages/billDetails/billDetails',
  exchangeCoupon: '/pages/exchange-coupon/index'
}

// 初始化路径映射对象
const pathMap: PathMapObject = {}

// 主包路径合并
mergePathMap(mainPathMap)

// 分包路径合并
mergePathMap(pkgMarketPathMap)
mergePathMap(pkgReceivePathMap)
mergePathMap(pkgBasicsPathMap)
mergePathMap(pkgOrderPathMap)
mergePathMap(pkgSharesPathMap)

// TabBar页面映射
export const tabPageMap: Record<string, boolean> = {
  [pathMap.home]: true,
  [pathMap.menu]: true,
  [pathMap.orderList]: true,
  [pathMap.mine]: true
}

// 需要reLaunch的页面映射
export const reLaunchPageMap: Record<string, boolean> = {
  [pathMap.shelves]: true,
  [pathMap.couponShelves]: true
}

export default pathMap
