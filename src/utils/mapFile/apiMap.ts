/**
 * 接口地址映射
 * 从原生小程序完整迁移，包含所有业务模块接口
 */

import hostMap from './hostMap'
import pkgBasicsApiMap from '../packageFile/pkgBasics/apiMap'
import pkgMarketApiMap from '../packageFile/pkgMarket/apiMap'
import pkgReceiveApiMap from '../packageFile/pkgReceive/apiMap'
import pkgOrderApiMap from '../packageFile/pkgOrder/apiMap'
import pkgSharesApiMap from '../packageFile/pkgShares/apiMap'

// API 映射对象类型
type ApiMapObject = Record<string, string>

// 合并 API 映射函数
const mergeApiMap = (map: ApiMapObject, target: ApiMapObject = apiMap): void => {
  Object.keys(map).forEach(key => {
    if (target[key]) {
      throw new Error(`检测到重复的接口键值：${key}`)
    } else {
      target[key] = `${hostMap.api}${map[key]}`
    }
  })
}

// PassPort模块接口
const passPortApi: ApiMapObject = {
  bindPhoneNum: '/passport/authenticate/phone/grc', // 登录绑定手机号
  unbindAuth: '/passport/authenticate/unbindAuth', // 解绑登录手机号
  bindUnionId: '/passport/common/unionId/set', // 用户授权绑定unionId
  loginVerify: '/passport/authenticate/wxapp/verify/grc', // 登录校验
  checkUserNickName: '/passport/user/checkUserNickName', // 校验昵称合法性
  updateUserPhoto: '/passport/user/updateUserPhoto' // 校验头像的合法性
}

// 用户模块接口
const userApi: ApiMapObject = {
  getUserInfo: '/user/base-userinfo', // 用户基础信息
  updateUserInfo: '/user/change-userinfo', // 用户基础信息修改
  checkSexLimit: '/user/checkSexLimit', // 校验用户性别是否可以修改
  getAddressList: '/user/address/user-address/list', // 收货地址列表
  getAddressInfo: '/user/address/user-address/info', // 收货地址详情
  createAddress: '/user/address/user-address/add', // 添加收货地址
  updateAddress: '/user/address/user-address/update', // 修改收货地址
  deleteAddress: '/user/address/user-address/delete', // 删除收货地址
  subscribeStore: '/user/subscribe/store', // 订阅门店开业提醒消息
  getStoreSubscribeStatus: '/user/subscribe/store/status', // 查询是否订阅门店消息
  postPrivateUserAccount: '/user/account/user-account', // 用户私有资产接口
  postStoredConfigList: '/user/stored/shelf/v2', // 用户储值配置信息列表
  postTemplateWxApp: '/user/omc/template/wxApp', // 获取微信小程序订阅消息模板
  noSubscribe: '/user/omc/noSubscribe', // 免订阅消息传参
  postActivitySubscribe: '/user/activity/subscribe', // 活动消息订阅
  postInviteActivitySubscribe: '/user/invite/activity/subscribe', // 活动消息订阅组合接口
  postSignSave: '/user/sign/save', // 积分签到
  getMemberCardConfig: '/user/openCardConfig', // 获取会员卡开卡配置
  postSignSubscribe: '/user/sign/subscribe', // 签到标记
  postCouponOverdueReminder: '/user/coupon/expire/subscribe', // 订阅优惠券过期提醒
  postStoredRules: '/user/stored/getRules', // 储值协议
  collectItem: '/user/collectItem', // 商品定制化收藏
  checkChannel: '/user/advert/check/channel', // 校验活动渠道码是否有效
  getGiftArea: '/user/memberCenter/area', // 股票会员-兑换好礼专区
  getCoinExpired: '/user/coin/expire/info/v1', // 股票-即将过期的积分
  stockUserAsset: '/user/memberCenter/userAsset', // 股票-用户资产
  stockUserTaskInfo: '/user/task/userTask', // 股票会员中心-用户关注任务信息
  userTaskClick: '/user/task/userTaskClick', // 股票会员中心-用户任务完成点击
  getTaskSubscribe: '/user/stock/subscribe', // 股票会员中心
  getActivityPreviewInfo: '/user/activity/preview/config', // 股票会员中心预告
  previewSubscribe: '/user/omc/subscribe', // 股票会员预告订阅消息
  templateMsgSubscribe: '/user/omc/templateMsgSubscribe', // 订阅消息记录
  saleSubscribe: '/user/coupon/package/sale/subscribe', // 订阅消息记录
  myPageRights: '/user/rights/myPageRightsV3', // 个人信息ip形象和权益
  updateMemberImageSex: '/user/rights/updateMemberImageSex', // 更新用户形象
  queryBirthdayRights: '/user/rights/queryBirthdayRights', // 取餐页获取生日特权图片
  queryPriorityMakeRights: '/user/rights/queryPriorityMakeRights', // 查询优先制作特权
  myUsualOrder: '/user/myUsualOrder' // 我的常点
}

// 首页模块接口
const homeApi: ApiMapObject = {
  getHomeConfig: '/home/api/index/activeConfig/v2', // 首页配置数据查询
  getMenuConfig: '/home/api/menu/activeConfig', // 点餐页配置数据查询
  getMemberInfo: '/home/api/config/user', // 首页用户数据
  getHomeBanner: '/home/api/resource/config/homeBannerNodes', // 获取首页Banner
  getMenuBanner: '/home/api/resource/config/loopImgMenuPageNodes', // 获取点餐页Banner
  getHomeMarket: '/home/api/resource/config/homeMarketPositionNodes', // 获取首页营销位
  getMoreArticle: '/home/api/moreArticle', // 获取更多文章广告活动
  getStoreInfo: '/home/api/store/location/v2', // 定位门店信息
  getStoreList: '/home/api/store/list', // 获取门店区域列表
  getClosingTips: '/home/api/store/closing/tips', // 闭店提示
  getBoughtList: '/home/api/bought/store/list', // 获取常用门店列表
  getCollectList: '/home/api/user/collect/store/list', // 获取收藏门店列表
  searchStoreList: '/home/api/store/search', // 搜索门店区域列表
  getAreaList: '/home/api/store/area/list/v2', // 获取门店区域列表
  dispatchingRange: '/home/api/store/dispatching/range/v2', // 根据收货地址获取可配送的门店列表
  getSearchInfo: '/home/api/resource/config/pageMenuSearchWord', // 获取点餐页搜索词
  getQueueInfo: '/home/api/queue/up/info', // 排队
  getActiveInfo: '/home/api/store/tipsv2', // 获取点餐页营销活动
  getCertificateInfo: '/home/api/store/business/qa', // 获取营业资质信息
  getProtocols: '/home/api/user/protocols', // 获取注册协议
  getCommonConfig: '/home/api/getConfig', // 获取通用配置
  getShareConfig: '/home/api/share/program', // 获取分享配置
  parseScanCodeInfo: '/home/api/get/store/id/v2', // 解析扫码信息中的门店ID
  postMyHead: '/home/api/my/head', // 乐园头部
  postMyAccount: '/home/api/my/account', // 账户信息
  postMyService: '/home/api/my/servicev2', // 我的服务
  getMyParadise: '/home/api/coin/area', // 我的奈雪乐园模块
  postOfficialAccounts: '/home/api/order/getOfficialAccounts', // 订单列表页, 公众号引流
  postOrderFloatIcon: '/home/api/order/getFloatIcon', // 订单列表 - 浮漂
  postTicketPackage: '/home/api/order/getOrderPayTicketPackage', // 获取结算页付费券包
  getTakeMealActiveConfig: '/home/api/resource/config/loopImgOrderPageNodes', // 取餐页轮播图展示
  getMarketConfig: '/home/api/market/configv2', // 获取营销配置信息
  getHomeUIConfig: '/home/api/resource/config/homeUI', // 获取首页UI配置信息
  loopImgVipCodePage: '/home/api/resource/config/loopImgVipCodePageNodes', // 会员banner位置信息
  couponGetUserCityId: '/home/api/store/location/couponCity', // 券包可用的门店的市和区
  getCityByCouponPackage: '/home/api/store/location/getCityByCouponPackage', // 通过用户位置获取券包适用城市
  checkStoreApplyByCouponPackage: '/home/api/store/checkStoreApplyByCouponPackage', // 校验门店是否在券包适用门店范围内
  benefitGetUserCityId: '/home/api/store/location/benefitCity', // 获取购买权益卡用户所在城市ID
  storeCollect: '/home/api/user/collect/store', // 收藏门店
  storeCancelCollect: '/home/api/user/cancel/collect/store', // 取消收藏门店
  loopImgMyPage: '/home/api/resource/config/loopImgMyPageNodes', // 我的页面banner位置信息
  getShelfBriefConfig: '/home/api/menu/activeBriefConfig', // 获取独立货架(企业团单) 渠道落地页
  getMenuTopGroupBanner: '/home/api/resource/config/pageMenuTopGroupBanner', // 点餐页加小奈入口配置信息
  checkChannelCodeInfo: '/activity/channelCode/checkChannelCodeInfo' // 校验推广码是否是团单推广
}

// 商品模块接口
const productApi: ApiMapObject = {
  getMenuList: '/product/api/get/store/menu/v9', // 获取门店菜单
  getActiveMenuList: '/product/api/get/store/activityMenu', // 获取活动菜单
  getProductDetail: '/product/api/get/item/detail/v10', // 获取商品详情
  getProductShareInfo: '/product/api/share', // 获取商品分享信息
  itemsSearch: '/product/api/search/store/menu/items', // 菜单商品搜索
  getNearbyStoreList: '/product/api/get/nearby/stores', // 获取附近商品门店列表
  getExtraInfo: '/product/api/add/price/item/list', // 获取推荐商品列表
  getPackagePrice: '/product/api/item/marketing', // 获取套餐商品优惠价
  getRecommendInfo: '/product/api/recommend/pre/items', // 获取售前推荐
  getRecommendDetail: '/product/api/recommend/item/detail/v2', // 获取推荐商品详情
  getShelfMenu: '/product/api/get/shelfChannel/menu', // 获取独立货架(企业团单) 门店菜单
  getShelfProductDetail: '/product/api/get/shelfChannel/item/detail', // 获取独立货架(企业团单) 商品详情
  getShelfSearchProduct: '/product/api/search/shelfChannel/menu/items', // 获取独立货架(企业团单) 商品搜索
  getShelfPopUp: '/product/api/get/delivery/tips/config', // 获取独立货架(企业团单) 结算前弹窗
  getShelfProductSearch: '/product/api/search/shelfChannel/menu/items', // 获取独立货架(企业团单) 商品搜索
  getProductAttrTip: '/product/api//get/specs/tips' // 获取商品规格的tip
}

// 购物车模块接口
const cartApi: ApiMapObject = {
  findNormalCartInfo: '/cart/individual/find', // 普通购物车查询
  updateNormalCartInfo: '/cart/individual/update', // 普通购物车添加与修改
  updateNormalCartCount: '/cart/individual/updateItemCount', // 普通购物车仅商品数量修改
  updateNormalCartSpec: '/cart/individual/updateOldItem', // 普通购物车仅商品规格修改
  updateNormalCartSelect: '/cart/individual/updateItemSelected', // 普通购物车商品勾选与取消
  cleanNormalCartInfo: '/cart/individual/clean', // 普通购物车清空
  checkNormalCartLimit: '/cart/individual/checkItemLimit', // 普通购物车检查商品限制
  postCleanNormalCartItem: '/cart/individual/delItem', // 结算页清空普通购物车失效商品
  getAssistantCount: '/coupon/home/getAssistantCount', // 点餐页卡券数量
  exchangePieceStore: '/cart/pin/switchStore' // 切换门店
}

// 礼品卡模块接口
const cardApi: ApiMapObject = {
  getCardShelf: '/coupon/cardShelf/getCardShelf', // 礼品卡货架详情
  getCardShelfById: '/coupon/cardShelf/getCardShelfById', // 礼品卡指定货架详情
  getCardList: '/coupon/card/getCardList', // 我的礼品卡列表
  getCardBuyNotesRule: '/coupon/cardShelf/getCardBuyNotesRule', // 获取礼品卡货架购买须知和礼品卡章程链接
  getCardDetail: '/coupon/card/getCardDetail', // 礼品卡详情
  getCardApplyItems: '/coupon/cardTemplate/getCardApplyItems', // 礼品卡适用或不适用商品
  getCardApplyStores: '/coupon/cardTemplate/getCardApplyStores', // 礼品卡适用或不适用店铺
  getHistoryCardList: '/coupon/card/getHistoryCardList', // 礼品卡获取记录
  bindCard: '/coupon/card/bindCard', // 礼品卡绑定
  giveCard: '/coupon/card/give', // 礼品卡赠送
  cancelGive: '/coupon/card/cancelGive', // 礼品卡取消赠送
  receiveLandingPage: '/coupon/card/receiveLandingPage', // 礼品卡赠送领取落地页
  receiveCard: '/coupon/card/receiveCard', // 礼品卡赠送领取
  getCardGiveFlow: '/coupon/card/getCardGiveFlow', // 礼品卡转赠记录
  getCardThemeDetail: '/coupon/cardTheme/getCardThemeDetail', // 礼品卡主题详情
  getCardTemplateDetail: '/coupon/cardTemplate/getCardDetail' // 礼品卡卡模板详情
}

// 订单模块接口
const orderApi: ApiMapObject = {
  postOrderNowList: '/order/nowList', // 当前订单列表
  deleteOrder: '/order/delete', // 删除当前订单
  postOrderHistoryList: '/order/historyList', // 历史订单列表
  postOrderDetail: '/order/detail', // 订单详情
  postReceiptDetail: '/order/receipt', // 获取小票信息
  postOrderCancel: '/order/cancel', // 取消订单
  postFindFetchFoodTime: '/order/findReservationTimes', // 订单预览页预约取餐时间
  postCreateSaveings: '/order/createSavings', // 创建虚拟品
  createSavingsGrantPhysical: '/order/createSavingsGrantPhysical', // 创建虚拟品
  createBenefitCard: '/order/createBenefitCard', // 创建权益卡
  postAnotherOrder: '/order/anotherOrder', // 再来一单
  postCreateCoupon: '/order/createCoupon', // 购买券包
  postCreateCard: '/order/createCard', // 购买礼品卡
  saveComment: '/comment/saveComment', // 评价
  selectedStoreConfirm: '/order/selectedStoredConfirm', // 选中储值策略确认
  postOrderPreview: '/order/preview', // 订单预览
  postOrderCreate: '/order/createGeneral', // 创建订单
  cancelRefundDetail: '/order/cancelRefundDetail', // 取消退款-进度
  postCheckPayStatus: '/order/checkPayStatus', // 订单支付状态校验
  postOrderMQTTToken: '/order/mqtt/getToken', // 获取订单MQTT 鉴权
  postOrderStoreConfirm: '/order/storeConfirm', // 门店二次确认
  postCancelList: '/after/order/cr/crlistNew', // 订单取消原因
  postCoinAndXp: '/order/getCoinAndXp', // 结算成功, 预计积分/成长值
  postReservationTime: '/order/reservationTimeConfirm', // 预约时间确认
  postCreateCouponToken: '/order/createCouponToken', // 支付有礼 - 购买
  postThirdRights: '/coupon/point/queryUserThirdRights', // 订单详情页查询券码信息
  orderPayThirdRightsInfo: '/coupon/third/rights/orderPayThirdRightsInfo', // 支付成功页显示三方权益信息
  orderFetched: '/order/contract/fetched', // 用户手动点击已取餐按钮
  findItemMarkInfo: '/activity/oneminutefree/findItemMarkInfo' // 订单详情配置
}

// 支付模块接口
const payApi: ApiMapObject = {
  postPullCashier: '/pay/pullCashier', // 收银台
  postPayCreate: '/pay/payCreate' // 去付款
}

// 卡券模块接口
const couponApi: ApiMapObject = {
  receiveCheck: '/coupon/couponActivity/receiveCheck', // 微信商家券核销组件跳转账号校验
  receiveWechatStocks: '/coupon/couponActivity/receiveWechatStocks', // 落地领券
  postCouponList: '/coupon/coupon/getCouponList', // 我的优惠券列表
  postCouponDetail: '/coupon/coupon/getCouponDetail', // 获取优惠券详情
  postExchangeCoupon: '/coupon/couponActivity/exchangeCoupon', // 优惠券-券码兑换
  postCommonExchangeRule: '/coupon/common/exchangeRule', // 获取兑换中心规则
  postCardExchangeCard: '/coupon/card/exchangeCard', // 礼品卡兑换
  postCouponPackageList: '/coupon/couponPackage/getCouponPackageList/v1', // 获取券包列表
  couponPackageDetail: '/coupon/couponPackage/getCouponPackageDetail', // 根据券包id获取券包详情
  couponShelfInfo: '/coupon/package/shelf/getInfo', // 券包货架
  postCouponCategory: '/coupon/coupon/getCouponCategoryTab', // 根据品牌返回CouponCategory列表
  postCouponCategoryNew: '/coupon/home/getAssetCategoryTab', // 根据品牌返回CouponCategory列表
  postUsableStaffCouponByBrand: '/coupon/staffCoupon/listUsableStaffCouponByBrand', // 根据品牌筛选可用员工券列表（不分页）
  getCardGiftCouponPackageList: '/coupon/cardTemplate/getCardGiftCouponPackageList', // 礼品卡订单详情查询赠送券包名称
  postSubscribeCheckState: '/coupon/subscribe/checkState', // 判断当前用户 优惠券过期提醒  的订阅状态
  queryExchangeCardByShareCode: '/coupon/card/queryExchangeCardByShareCode', // 礼品卡-解密接口
  postCardSubscribeMsg: '/coupon/subscribe/subscribeMsg', // 礼品卡订阅消息提醒
  getUserCouponPackageList: '/coupon/couponPackage/getUserCouponPackageList', // 我的券包列表
  getUserCouponPackageDetail: '/coupon/couponPackage/getUserCouponPackageDetail', // 券包详情
  couponPackageBuyLimit: '/coupon/couponPackage/couponPackageBuyLimit', // 券包购买数量校验
  couponPackageActivation: '/coupon/couponPackage/couponPackageActivation', // 立即激活券包
  giftCancelGive: '/coupon/package/gift/cancelGive', // 券包转赠-取消赠送
  giftCouponCancelGive: '/coupon/coupon/gift/cancelGive', // 券包转赠-取消赠送
  thirdRightsInOrderDetail: '/coupon/third/rights/thirdRightsInOrderDetail', // 订单详情三方权益信息
  getUserThirdRightsList: '/coupon/third/rights/getUserThirdRightsList' // 用户获得三方权益码列表
}

// 营销模块接口
const activityApi: ApiMapObject = {
  postActivityPayClose: '/activity/payRewardClose', // 支付有礼 - 关闭按钮
  commonPopup: '/activity/pop/popUp', // 营销活动弹窗
  getPickupCodePop: '/activity/valentineVote/pickupCodePop', // 取餐码弹窗
  popLandingJoin: '/activity/pop/popLandingJoin', // 新人入会弹窗
  getEvaluateDetail: '/activity/evaluateReward/getEvaluateDetail', // 获取订单评价模板信息
  postReceiveCoupon: '/activity/coupon/receiveCouponPackage', // 支付有礼 - 免费券包领取
  getPopManage: '/activity/pop/getPopManage', // 支付结果页整合接口
  getLuckDrawEntrance: '/activity/luckyBag/getOrderLottery', // 订单详情抽奖入口
  orderPackTest: '/activity/ab/orderPack', // 打包ab测
  getOrderSubscribeTest: '/activity/ab/orderSubscribe', // 结算页订阅通知
  stockTaskInfo: '/activity/stock/userCenter', // 股票会员中心任务信息
  gainTask: '/activity/stock/gainTask', // 获取任务
  takeMealTaskInfo: '/activity/stock/takePage', // 取餐页股票任务信息
  checkShowEntrance: '/activity/userSubscribe/checkShowEntrance', // 获取当前用户是否展示公众号
  listOrderLuckBag: '/activity/luckyBag/listOrderLuckBag', // 查询订单福袋列表
  getHomeTask: '/activity/stock/getHomeTask', // 首页任务模块
  clickTaskReward: '/activity/stock/userLookTask', // 查看奖励
  getRecommendedActivity: '/activity/recommendedActivity/getRecommendedActivity', // 查询薄盒推荐活动接口
  getJayPopInfo: '/activity/orderLottery/getPopInfo', // 查询抽奖弹窗, 登录调用
  getJayRightsInfo: '/activity/orderLottery/getRightsInfo', // 三方权益码信息
  getItemLimitInfo: '/activity/item/pop', // 获取商品限购信息
  getValuationEntrance: '/activity/valuation/getValuationEntrance', // 获取问卷入口信息
  getValentineVote: '/activity/valentineVote/popPic', // 支付成功活动引导弹窗
  getCardBuyPage: '/activity/benefitCard/buyPage', // 权益卡购买页面
  getRenewalPage: '/activity/benefitCard/renewalPage', // 权益卡续费
  getStrategyInfo: '/activity/ab/couponUse', // 获取AB测分组
  benefitGetStoreList: '/home/api/store/listByBenefit', // 通过城市及券包获取门店列表
  listByCouponPackage: '/home/api/store/listByCouponPackage', // 获取适用门店区域列表
  benefitGetAreaList: '/home/api/store/area/listAreaByBenefit', // 获取门店区域列表
  benefitSearchStoreList: '/home/api/store/searchStoreByBenefit', // 搜索门店区域列表
  getMedalEntrance: '/activity/medal/getMedalEntrance', // 我的页勋章入口
  getABApi: '/activity/ab/api' // 加购信息
}

// 售后模块接口
const afterApi: ApiMapObject = {
  checkReturnOrderStatus: '/after/checkReturnOrderStatus', // 当前订单时候可以售后
  cancelRefund: '/after/cancelAfOrder', // 撤销售后申请
  invoiceInfo: '/invoice/info' // 订单发票信息查询
}

// 拼单模块接口
const pieceApi: ApiMapObject = {
  getCardToken: '/cart/getToken', // 获取MQTT 鉴权
  postCartCancelPiece: '/cart/pin/close', // 取消拼单
  cleanPieceItem: '/cart/pin/delItem', // 清空失效商品
  postCartCreatePiece: '/cart/pin/create', // 发起拼单
  findPieceCart: '/cart/pin/findAll', // 获取拼单购物车
  postCartJoinPiece: '/cart/pin/user/join', // 加入拼单
  maintainPieceCart: '/cart/maintainPieceCartV2', // 拼单购物车-修改
  postCartPieceCartLock: '/cart/pin/lock', // 拼单购物车锁定
  postCartPieceCartUnLock: '/cart/pin/unlock', // 拼单购物车解锁
  postCartQuitPiece: '/cart/pin/user/quit', // 退出拼单
  pieceProgress: '/cart/pin/user/selecting', // 拼单设置成选购中状态
  pieceFinished: '/cart/pin/user/selectionFinished', // 拼单设置成已选完状态
  findPieceCartInfo: '/cart/pin/user/find', // 拼单购物车查询
  updatePieceCartInfo: '/cart/pin/user/addItem', // 拼单购物车添加与修改
  updatePieceCartCount: '/cart/pin/user/updateItemCount', // 拼单购物车仅商品数量修改
  cleanPieceCartInfo: '/cart/pin/user/clean', // 拼单购物车清空
  checkPieceCartLimit: '/cart/pin/user/checkItemLimit', // 拼单购物车检查商品限制
  postCartPieceShare: '/cart/pin/share', // 拼单分享
  postPieceDetail: '/order/pieceDetail', // 拼单消息提醒-拼单落地页
  postCartBillShare: '/cart/pin/bill', // 分享账单
  postOrderGroupPay: '/order/groupPay', // 群收款
  delPieceCartFailureItem: '/cart/delPieceCartFailureItem', // 清空购物车异常商品
  postAdoptItem: '/cart/pin/user/adoptItem' // 和TA一样
}

// 初始化 apiMap
const apiMap: ApiMapObject = {}

// 主包接口合并
mergeApiMap(passPortApi)
mergeApiMap(userApi)
mergeApiMap(homeApi)
mergeApiMap(productApi)
mergeApiMap(cartApi)
mergeApiMap(cardApi)
mergeApiMap(orderApi)
mergeApiMap(payApi)
mergeApiMap(couponApi)
mergeApiMap(activityApi)
mergeApiMap(afterApi)
mergeApiMap(pieceApi)

// 分包接口合并
mergeApiMap(pkgBasicsApiMap)
mergeApiMap(pkgMarketApiMap)
mergeApiMap(pkgReceiveApiMap)
mergeApiMap(pkgOrderApiMap)
mergeApiMap(pkgSharesApiMap)

export default apiMap
