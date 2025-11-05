/**
 * 分包接口地址映射 - pkgShares
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

const basicsApi: ApiMapObject = {
  getTaskDetail: '/activity/stock/taskDetail', // 获取任务详情
  getPointInfo: '/user/coin/asset/info', // 获取积分信息
  getNormalPointList: '/user/coin/info', // 获取常规积分明细
  getHolderPointList: '/user/stock/coin/log/list', // 获取股东积分明细
  getSharesList: '/user/stock/flowList', // 获取股票明细
  getTaskInfo: '/user/memberCenter/taskSummary', // 获取任务信息
  sellStock: '/user/stock/sellStock', // 卖出股票
  getOrderTaskList: '/activity/stock/taskList', // 获取下单任务列表
  getPointCategory: '/coupon/point/stock/getPointCategory', // 股东专区模块类目
  getPointProductPage: '/coupon/point/stock/getPointProductPage', // 股东专区商品列表
  getPointProductInfo: '/coupon/point/stock/getPointProductInfo', // 股东专区商品详情
  getNormalTaskList: '/user/task/list', // 获取常规任务列表
  getRankShareInfo: '/user/stock/rankingShareInfo', // 股东排行榜分享
  createStockIntegral: '/order/createStockIntegral', // 股东积分兑换
  getPointCategoryInfo: '/coupon/point/v2/getPointHome', // 常规积分商城模块类目
  getPointModuleShowInfo: '/coupon/point/getPointModuleShowInfo', // 常规积分商城模块标题
  getStockProfitInfo: '/user/stock/stockProfitInfo', // 会员中心获取收益信息
  getStockTips: '/user/stock/stockTips', // 平仓提示tips
  todayInEntrust: '/user/stock/entrust/todayInEntrust', // 当日买入委托列表
  todayOutEntrust: '/user/stock/entrust/todayOutEntrust', // 当日卖出委托列表
  createInEntrust: '/user/stock/entrust/createInEntrust', // 发起买入委托
  cancelInEntrust: '/user/stock/entrust/cancelInEntrust', // 撤销买入委托
  createOutEntrust: '/user/stock/entrust/createOutEntrust', // 发起卖出委托
  cancelOutEntrust: '/user/stock/entrust/cancelOutEntrust', // 撤掉卖出委托
  allInEntrust: '/user/stock/entrust/allInEntrust', // 全部买入委托列表
  allOutEntrust: '/user/stock/entrust/allOutEntrust', // 全部卖出委托列表
  getUserAssetV2: '/user/memberCenter/userAssetV2', // 股东三期-用户资产
  leverConfig: '/user/stock/leverConfig', // 股东三期-杠杆配置
  repayLeverCoin: '/user/stock/repayLeverCoin', // 偿还借币
  caclSellRatio: '/user/stock/caclSellRatio', // 计算占比
  taskApplicableProduct: '/activity/stock/getItemList', // 下单任务 - 适用商品列表

  // 年报活动
  annualReportInvitation: '/activity/annual/report/invite/getInvitation', // 活动详情页邀请记录
  annualReportHelpRecord: '/activity/annual/report/invite/getHelpRecord', // 活动详情页邀请记录
  annualReportHelpShareInfo: '/activity/annual/report/invite/getShareInfo', // 年报活动分享信息
  annualReportInviteHelp: '/activity/annual/report/invite/help', // 被邀请人点击助力
  annualReportActivityPage: '/activity/annualReport/activityPage', // 年报活动页api
  annualReportFirstOrder: '/activity/annualReport/firstOrder', // 首单信息api
  annualReportQuarterlySummary: '/activity/annualReport/quarterlySummary', // 季度总结api
  annualReportAssignItem: '/activity/annualReport/assignItem', // 指定商品信息&勋章api
  annualReportRelatedItem: '/activity/annualReport/relatedItem', // 周边商品api
  annualReportOrderRights: '/activity/annualReport/orderRights', // 下单特权api
  annualReportRegardRights: '/activity/annualReport/regardRights', // 心意特权api
  annualReportRightsIntroduce: '/activity/annualReport/rightsIntroduce', // 权益介绍api
  annualReportOrderSummary: '/activity/annualReport/orderSummary', // 下单总结api
  annualReportMedalList: '/activity/annualReport/medalList', // 勋章列表api
  annualReportFlavorType: '/activity/annualReport/flavorType', // 香型api
  getInviteInfo: '/activity/activityLottery/getInviteInfo', // 获取邀新信息
  annualReportJoinActivity: '/activity/annualReport/joinActivity', // 参加年报活动

  loongReportData: '/activity/annualReport/reportData', // 2024年报活动
  loongJoinActivity: '/activity/annualReport/joinActivity', // 2024年参加年报

  // 冲榜消费
  getTopRankingInfo: '/activity/ranking/page', // 榜单页
  getRankingLists: '/activity/ranking/list', // 榜单列表
  consumerDetailsList: '/activity/ranking/consumeDetail', // 消费明细列表

  // 勋章活动
  getMedalInfo: '/activity/medal/getMedalActivity', // 获取勋章信息
  getMedalDetail: '/activity/medal/getMedalDetail', // 获取勋章详情
  wearMedal: '/activity/medal/wear', // 佩戴勋章接口
  getMedalCoupon: '/activity/medal/receiveReward', // 领取勋章兑换券
  getMedalRule: '/activity/medal/getRule', // 获取勋章规则
  getMedalShare: '/activity/medal/getShare' // 获取勋章分享信息
}

const apiMap: ApiMapObject = {}
mergeApiMap(basicsApi)

export default apiMap
