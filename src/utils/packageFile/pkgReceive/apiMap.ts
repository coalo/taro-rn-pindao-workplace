/**
 * 分包接口地址映射 - pkgReceive
 * 从原生小程序完整迁移
 */

type ApiMapObject = Record<string, string>

const mergeApiMap = (map: ApiMapObject, target: ApiMapObject = apiMap): void => {
  Object.keys(map).forEach(key => {
    if (target[key]) {
      throw new Error(`检测到重复的接口键值：${key}`)
    } else {
      target[key] = map[key]
    }
  })
}

const couponApi: ApiMapObject = {
  getActivityLandPageInfo: '/coupon/couponActivity/getActivityLandPageInfo', // 活动落地页获取活动详情
  getActivityCouponForLandPage: '/coupon/couponActivity/getActivityCouponForLandPage', // 活动落地页领取优惠券
  getFollowActivityInfo: '/coupon/couponActivity/getFollowActivityInfo', // 领取活动获取活动详情
  getActivityCoupon: '/coupon/couponActivity/getActivityCoupon', // 领取优惠券
  getWXCPQuery: '/coupon/card/wxcp/query', // 微信卡包跳转卡详情
  getWXCPConvert: '/coupon/card/wxcp/convert', // 微信卡包礼品卡转自研
  getActivityInvitation: '/activity/activityInvite/getInvitation', // 活动邀请详情页
  getActivityShareInfo: '/activity/activityInvite/getShareInfo', // 分享素材
  getActivityHelpRecord: '/activity/activityInvite/getHelpRecord', // 学生认证好友助力记录
  getActivityHelpLandPageInfo: '/coupon/couponActivity/getActivityHelpLandPageInfo', // 新版优惠券领取活动页落地页
  orderHelpPopWin: '/activity/activityInvite/orderHelpPopWin', // 下单助力弹窗
  orderHelpBind: '/activity/activityInvite/orderHelpBind', // 立即下单(被邀请人助力）
  welfareReceivePage: '/activity/welfare/receivePage', // 领取活动主页（包含邀请落地页功能）
  welfareReceiveWelfare: '/activity/welfare/receiveWelfare', // 领取活动领取福利
  welfareShareInfo: '/activity/welfare/getShareInfo', // 领取活动分享接口
  redEnvelopePage: '/activity/redEnvelope/mainPage', // 2025三八妇女节主页面
  redEnvelopeRain: '/activity/redEnvelope/rain', // 2025三八节红包雨信息
  redEnvelopeLottery: '/activity/redEnvelope/lottery', // 2025三八节抽奖
  redEnvelopeReward: '/activity/redEnvelope/rewardList' // 2025三八节奖品列表
}

const orderApi: ApiMapObject = {
  posOrderPreview: '/order/pos/previewSQR', // 预览
  posCreateOrder: '/order/pos/createSQRGeneral' // s生单
}

const hostApi: ApiMapObject = {
  getLandingPage: '/home/api/landingPage/activeConfig', // 获取落地页配置
  getScanCodeNxx: '/user/store/scan/nxx', // 奈小雪企微落地页
  valentinesPage: '/activity/valentineVote/getActivityPage', // 25年情人节活动落地页信息
  valentinesArticles: '/activity/valentineVote/listAllUserArticles', // 25年情人节活动, 投票作品
  valentinesCheckUser: '/activity/valentineVote/checkUser', // 25年情人节, 校验用户是否可上传(首次上传作品前校验)
  valentinesUpload: '/activity/valentineVote/upload', // 25年情人节, 上传接口
  valentinesUserArticle: '/activity/valentineVote/getUserArticle', // 25年情人节, 我的作品
  valentinesReUpload: '/activity/valentineVote/reUpload', // 25年情人节, 重新上传接口
  valentinesArticle: '/activity/valentineVote/voteUserArticle', // 投票
  legumesMainInfo: '/activity/sowBeans/activityPage', // 种豆活动主页面
  legumesScanPicTest: '/activity/sowBeans/scanImage', // 种豆活动图片识别
  legumesExchangePreview: '/activity/sowBeans/coinExchangePreview', // 种豆活动-任务列表-积分兑换弹窗提示信息
  legumesCoinExchange: '/activity/sowBeans/coinExchange', // 种豆活动-积分-立即兑换
  legumesShareInfo: '/activity/annual/report/invite/getShareInfo', // 种豆活动 - 邀请好友分享信息
  legumesCoinInfo: '/user/coin/info', // 种豆活动积分兑换记录
  legumesCheckInvitee: '/activity/sowBeans/checkInviteeQualification', // 种豆活动 - 校验用户助力资格
  legumesCreateHelp: '/activity/sowBeans/createHelp', // 种豆活动 - 用户进行助力
  legumesCompositeCard: '/activity/sowBeans/compositeCard', // 种豆活动 - 合成
  legumesOrderList: '/activity/sowBeans/listOrder', // 种豆活动订单明细
  legumesExecuteLottery: '/activity/activityLottery/executeLottery', // 种豆活动 - 点击抽奖
  getUserTaskActivity: '/user/task/activity' // 邀请函活动 - 活动状态
}

const apiMap: ApiMapObject = {}
mergeApiMap(couponApi)
mergeApiMap(orderApi)
mergeApiMap(hostApi)

export default apiMap
