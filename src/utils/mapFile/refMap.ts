/**
 * 门店商品相关跳转来源映射
 * 从原生小程序完整迁移
 */
import pathMap from './pathMap'

type RefMapObject = Record<string, Record<string, string>>

const refMap: RefMapObject = {
  referrer: {
    '点餐页': 'menu',
    '拼单页': 'piece',
    '独立货架页': 'shelves',
    '券适用商品页': 'coupon',
    '活动商品页': 'active'
  },
  storeList: {
    '点餐页': pathMap.storeList,
    '拼单页': pathMap.storeList,
    '独立货架页': pathMap.storeList,
    '券适用商品页': pathMap.couponStoreList
  },
  areaSelect: {
    '点餐页': pathMap.areaSelect,
    '拼单页': pathMap.areaSelect,
    '独立货架页': pathMap.areaSelect,
    '券适用商品页': pathMap.couponAreaSelect
  },
  storeDetail: {
    '点餐页': pathMap.storeDetail,
    '拼单页': pathMap.storeDetail,
    '独立货架页': pathMap.storeDetail,
    '券适用商品页': pathMap.storeDetail
  }
}

export default refMap
