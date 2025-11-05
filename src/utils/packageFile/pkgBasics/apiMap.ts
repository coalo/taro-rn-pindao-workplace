/**
 * 分包接口地址映射 - pkgBasics
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
  invoiceApply: '/after/invoice/apply', // 申请开发票票
  afterCalc: '/after/calc', // 部分退款售后算价
  createAfterOrder: '/after/createAfOrder', // 创建售后申请
  checkReturnOrderInfo: '/after/checkReturnOrderInfoNew', // 售后退款状态,并查看订单详情
  refundOrderDetail: '/after/afOrderDetail', // 查看退款进度
  postCouponPackageHistoryList: '/coupon/couponPackage/getCouponPackageHistoryList', // 券包历史记录
  postOrderDispatchingDetail: '/order/store/orderDispatchingDetail', // 订单配送信息
  postThirdRightsList: '/coupon/coupon/getThirdRightsList', // 三方权益
  postThirdRightsDetail: '/coupon/coupon/getThirdRightsDetail', // 三方权益详情
  postHelpCenter: '/home/api/my/service/helpCenter', // 帮助中心
  postServiceMore: '/home/api/my/service/more', // 更多服务
  postKillSubscribe: '/user/second/kill/subscribe', // 秒杀开抢提醒,
  postFindInvoiceTitle: '/invoice/findInvoiceTitle', // 获取常用发票抬头
  postSaveInvoiceTitle: '/invoice/saveInvoiceTitle', // 新增发票抬头
  postUpdateInvoiceTitle: '/invoice/updateInvoiceTitle', // 更新发票抬头
  postFindInvoiceList: '/invoice/findInvoiceList', // 获取发票列表
  postFindInvoices: '/invoice/findInvoices', // 普通订单获取发票列表
  postInvoiceApply: '/invoice/invoiceApply', // 申请开票(虚拟商品)
  postInvoiceMultiBatchInvoice: '/invoice/multiBatchInvoice', // 申请开票(普通订单)
  postFindInvoiceDetail: '/invoice/findInvoiceDetail', // 开票详情
  postInvoiceResend: '/invoice/invoiceResend', // 重新发送发票
  postInvoiceReApply: '/invoice/invoiceReApply', // 重新开票
  postFindInvoiceRecords: '/invoice/findInvoiceRecords', // 开票新记录
  postFindHistoryInvoiceRecords: '/invoice/findHistoryInvoiceRecords', // 开票历史记录
  postSearchCompany: '/invoice/searchCompany', // 根据名字模糊查询开票公司code
  postCompanyInvInfoByCode: '/invoice/getCompanyInvInfoByCode', // 根据code查询企业信息
  postHisCouponList: '/coupon/coupon/getHisCouponList', // 历史券列表
  postStoredTradeRecords: '/user/stored/balanceFlow', // 储值交易记录
  getOssAssumeRole: '/comment/getOssAssumeRole', // 获取STS服务临时权限
  commentPreview: '/comment/preview', // 获取订单评价详情
  postUserQRcode: '/user/qrcode', // 会员码
  getParadiseBannerInfo: '/home/api/resource/config/nxlyBannerPage', // 获取奈雪乐园Banner
  postInvoiceAmount: '/invoice/getInvoiceAmount', // 获取开票金额
  thirdRightsCodeDetail: '/coupon/third/rights/thirdRightsCodeDetail', // 三方权益码详情
  getValuationDetail: '/activity/valuation/getValuationDetail', // 获取问卷详情
  submitValuation: '/activity/valuation/submitValuation' // 提交问卷调查
}

const storeApi: ApiMapObject = {
  couponGetJumpUrl: '/product/api/get/store/couponJumpUrl', // 获取券调整路径
  getStallTypeByStoreId: '/home/api/store/getStallTypeByStoreId', // 获取门店默认档口
  couponGetStoreList: '/product/api/store/listByCoupon', // 获取门店区域列表
  couponGetAreaList: '/home/api/store/area/listAreaByCoupon', // 获取门店区域列表
  listAreaByCouponPackage: '/home/api/store/area/listAreaByCouponPackage', // 券包可用的门店的市和区
  couponSearchStoreList: '/product/api/store/searchStoreByCoupon', // 搜索门店区域列表
  searchStoreByCouponPackage: '/home/api/store/searchStoreByCouponPackage' // 搜索券包适用门店
}

const userApi: ApiMapObject = {
  getUserLogoutInfo: '/user/userCancelPage', // 获取用户注销页信息
  cancelAccount: '/user/cancelAccount', // 用户注销
  sendSms: '/passport/common/sendSmsCode' // 发送短信
}

const apiMap: ApiMapObject = {}
mergeApiMap(basicsApi)
mergeApiMap(storeApi)
mergeApiMap(userApi)

export default apiMap
