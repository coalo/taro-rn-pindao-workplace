/**
 * 分包接口地址映射 - pkgMarket
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

// 邀请模块接口
const invitationApi: ApiMapObject = {
  getShelvesInfo: '/product/api/channel/shelf/items/v2', // 获取独立货架数据
  getCouponShelvesInfo: '/product/api/get/store/menuByCoupon', // 获取券适用商品数据
  getActiveItemMenu: '/product/api/get/activity/items', // 获取活动商品菜单
  getActiveOne: '/home/api/store/getTipsById', // 获取指定营销活动
  getInvitation: '/coupon/promotionInvitation/getInvitation', // 获取邀请首页
  getInvitationRecord: '/coupon/promotionInvitation/getInvitationRecord', // 我的邀请记录
  getPopup: '/coupon/promotionInvitation/getPopup', // 获取弹窗信息
  getRule: '/coupon/promotionInvitation/getRule', // 查询活动规则
  getShareInfo: '/coupon/promotionInvitation/getShareInfo', // 获取海报信息
  getInvitationRewardRecord: '/coupon/promotionInvitation/getInvitationRewardRecord', // 获得的优惠券列表
  getFiveLanding: '/coupon/five/landingV1', // 活动落地页(分享卡片进入调用)
  getCouponList: '/coupon/five/couponList', // 获取优惠券列表
  getInviteRecord: '/coupon/five/inviteRecordV1', // 获取邀请记录
  getProductArea: '/coupon/five/productAreaV1', // 获取推荐商品列表
  popLandingRegister: '/activity/pop/popLandingRegister', // 注册弹窗落地页
  getCouponListV1: '/coupon/five/couponListV1', // 获取优惠券列表-接口升级
  moreCouponList: '/coupon/five/moreCouponList', // 优惠券往期列表-分页调用
  studentCard: '/user/student/card/page', // 学子卡落地页信息
  studentCardSMS: '/passport/studentCard/sendSms', // 发送开通学生卡短信api
  getStuInvitation: '/activity/stuInvite/getInvitation', // 学生邀请接口
  getHelpRecord: '/activity/stuInvite/getHelpRecord', // 获取学生邀请助力记录
  getStuShareInfo: '/activity/stuInvite/getShareInfo', // 获取学生邀请分享信息
  createHelpRecord: '/activity/stuInvite/createHelpRecord', // 创建学生邀请记录
  getStuHelpPage: '/activity/stuInvite/getHelpPage', // 学生被邀请人页面信息
  sevenActivityPage: '/activity/luckyBag/activityPage', // 七周年福袋活动页
  lotteryDraw: '/activity/luckyBag/lotteryDraw', // 收福袋
  activeCreateAddress: '/activity/luckyBag/updateAddress', // 七周年福袋提交地址
  shareLuckyBag: '/activity/luckyBag/shareLuckyBag', // 分享福袋
  giftGive: '/coupon/package/gift/give', // 券包转赠-发起转赠
  giftReceivePage: '/coupon/package/gift/receivePage', // 券包转赠-领取赠送落地页
  giftReceive: '/coupon/package/gift/receive', // 券包转赠-赠送领取成功
  giftGiveList: '/coupon/package/gift/getGiveList', // 券包转赠-送出/收到列表
  handleStudentInfo: '/passport/studentCard/handleWxStudentInfo', // 处理微信学生卡授权结果api
  giftCouponGive: '/coupon/coupon/gift/give', // 优惠券转赠-发起转赠
  giftCouponReceivePage: '/coupon/coupon/gift/receivePage', // 优惠券转赠-领取赠送落地页
  giftCouponReceive: '/coupon/coupon/gift/receive', // 优惠券转赠-赠送领取成功
  giftCouponGiveList: '/coupon/coupon/gift/getGiveList', // 优惠券转赠-送出/收到列表
  getAnswerPageInfo: '/activity/answer/activityPage', // 获取答题落地页数据
  answerHelp: '/activity/activityInvite/answerHelp', // 答题邀请助力
  getAnswerShareInfo: '/activity/activityInvite/getShareInfo',
  updatePopWinFlag: '/activity/answer/updatePopWinFlag', // 更新弹窗标识
  submitAnswer: '/activity/answer/submitAnswer', // 校验题目是否正确
  exchangeConfirm: '/activity/answer/coinExchange', // 奈雪币-确认兑换
  getAnswerInviteInfo: '/activity/answer/inviteTotal', // 获取邀请信息
  getAnswerInviteRecord: '/activity/answer/getHelpRecord', // 获取邀请记录
  getAnswerNum: '/activity/answer/total', // 获取答题统计数
  getHistoryRecord: '/activity/answer/record', // 获取答题记录
  getCupActiveInfo: '/activity/collectCup/activityPage', // 获取集杯页面信息
  getChangeRecord: '/activity/answer/exchangeRecord', // 获取兑换记录
  getVoteInfo: '/activity/activityVote/voteActivityPage', // 获取投票信息
  executeVote: '/activity/activityVote/executeVote', // 发起投票
  getVoteResultInfo: '/activity/activityVote/voteActivityResultPage', // 获取投票结果信息
  getRuleInfo: '/activity/stuInvite/getRule' // 八周年活动规则
}

const eightAnniversaryApi: ApiMapObject = {
  getAwardInfo: '/activity/activityLottery/lotteryActivityPage', // 八周年获取抽奖落地页
  gotoAward: '/activity/activityLottery/executeLottery', // 八周年抽奖
  getAwardList: '/activity/activityLottery/rewardList', // 八周年获取奖品列表
  updateEightAddress: '/activity/activityLottery/updateAddress', // 八周年奖品修改地址
  getBallotInfo: '/activity/userVoteActivity/voteLandingPage', // 八周年获取投票落地页
  gotoVote: '/activity/userVoteActivity/vote' // 八周年投票
}

const bankApi: ApiMapObject = {
  getBankBanner: '/home/api/resource/config/bankBanner', // 首页配置数据查
  bankListWeekDay: '/activity/bank/activity/bankListWeekDay', // 获取指定星期的银行列表
  getActivityList: '/activity/bank/activity/list', // 获取活动列表
  getActivityDetail: '/activity/bank/activity/get' // 通过ID获取活动详情
}

const jointlyApi: ApiMapObject = {
  jointlyCheckStatus: '/user/stored/shelf/checkGoodsSaleStatus', // 检查商品售卖状态
  jointlyPhysicalShelf: '/user/stored/shelf/givePhysicalGoodsShelf', // 储值售实物货架
  jointlySavingsPhysicalOrder: '/order/findSavingsPhysicalOrder' // 储值送实物,查询实物赠品id
}

const voiceRedApi: ApiMapObject = {
  voiceRedPageInfo: '/activity/activityVoiceRedPackage/activityPage', // 口令红包活动页
  voiceRedExecuteExchange: '/activity/activityVoiceRedPackage/executeExchange', // 口令红包兑换
  voiceRedRewardList: '/activity/activityVoiceRedPackage/rewardList' // 口令红包 - 我的奖品列表
}

const cardCollectApi: ApiMapObject = {
  getCardPageInfo: '/activity/collectCard/activityPage', // 集卡落地页
  getCardAward: '/activity/collectCard/lotteryCard', // 点击?抽卡
  cardCollectHelp: '/activity/annual/report/invite/help', // 集卡分享助力
  getCardShareInfo: '/activity/annual/report/invite/getShareInfo', // 集卡分享
  coinExchange: '/activity/collectCard/coinExchange', // 积分解锁
  coinExchangePreview: '/activity/collectCard/coinExchangePreview', // 积分兑换预览
  getCardInviteRecord: '/activity/annual/report/invite/getHelpRecord', // 集卡邀请记录
  unlockPointsList: '/user/coin/info' // 用户积分解锁列表
}

const personalityTest: ApiMapObject = {
  getPersonalityPageInfo: '/activity/personality/getActivityHome', // 获取个性测试落地页信息
  personalityInviteHelp: '/activity/activityInvite/help', // 个性测试助力
  getTaskList: '/activity/personality/getTaskList', // 获取任务列表
  getTestShareInfo: '/activity/activityInvite/getShareInfo', // 获取个性测试落地页分享信息
  getQuestionList: '/activity/personality/getQuestionList', // 获取个性测试题目
  personalitySubmit: '/activity/personality/submit', // 性格测试提交
  getTestAwardInfo: '/activity/personality/getHistoryRewardList', // 获取奖品记录
  getTestHistoryList: '/activity/personality/getHistoryReportList', // 获取历史记录
  getTestReportInfo: '/activity/personality/getReport' // 获取海报详情
}

const inviteGift: ApiMapObject = {
  getGiftInvitation: '/activity/regConsume/getInvitation', // 获取邀请有礼主页信息
  getGiftHelpRecord: '/activity/regConsume/getHelpRecord', // 获取邀请有礼记录列表
  getGiftShareInfo: '/activity/regConsume/getShareInfo', // 获取邀请有礼分享信息
  createGiftHelpRecord: '/activity/regConsume/createHelpRecord' // 邀请有助力接口
}

const niceCard: ApiMapObject = {
  getNiceCardInfo: '/activity/benefitCard/userNiceCardInfo', // nice权益卡活动主题页信息
  getNiceCardTipsInfo: '/activity/benefitCard/getNiceCardInfo' // 购物车and结算页获取nice卡主题活动tips信息
}

const apiMap: ApiMapObject = {}
mergeApiMap(invitationApi)
mergeApiMap(eightAnniversaryApi)
mergeApiMap(bankApi)
mergeApiMap(jointlyApi)
mergeApiMap(voiceRedApi)
mergeApiMap(cardCollectApi)
mergeApiMap(personalityTest)
mergeApiMap(inviteGift)
mergeApiMap(niceCard)

export default apiMap
