/**
 * 注册码相关路由映射: 通过 扫描推广二维码/小程序活动卡片/公众号推广 进入
 * 从原生小程序完整迁移，保留所有扫码规则
 *
 * 扫码/小程序卡片参数禁止使用: q => 例如: 分享链接xxxx.xxxxx.cn?q=xxx 或者 pages/xxx/xxx?q=xxxx 禁止使用
 *
 * rule:
 *   1: https://xx.xxx.cn/xxxxx/code
 *   2: https://xx.xxx.cn/xxxxx?xxx=xxxxx
 *   3: pages/xxxx/xxxx?xxx=xxxx&&xxx=xxxx
 *   4: https://xx.xxx.cn/xxxxx?xxx=xxxxx&&xxx=xxxxxx
 *   5: scene圆码解析
 *
 * getValues: [{current: '', target: ''}] => current: 接收到的key值; target: 需要转换成的key值
 */

// 扫码规则项类型
interface ScanRuleItem {
  path: string
  key: string
  rule: number
  getValues?: Array<{ current: string; target: string }>
}

// 方形二维码/小程序卡片规则
const square: ScanRuleItem[] = [
  { // 首页
    path: 'https://tm-web.pin-dao.cn/nx-home/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 首页
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-home/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 会员中心码
    path: 'https://qr.qmai.cn/bvrada-user/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 自研-各店-会员中心码
    path: 'https://tm-web.pin-dao.cn/naixue-user/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 市场物料-我的
    path: 'https://qr.qmai.cn/bvrada-promote/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 自研-市场物料-我的
    path: 'https://tm-web.pin-dao.cn/naixue-promote/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 自研-注册码
    path: 'https://tm-web.pin-dao.cn/nx-dine/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 门店码
    path: 'https://qr.qmai.cn/naixue-login/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 自研-各店-门店码 - 旧
    path: 'https://tm-web.pin-dao.cn/naixue-dine/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 自研-各店-门店码 - 新
    path: 'https://tm-web.pin-dao.cn/nx-login/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 自研-各店-门店码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-login/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 自研-各店-门店码推广码 - 测试
    path: 'https://tm-web.pin-dao.cn/nx-prosore/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 自研-各店-门店码推广码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-prosore/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 自研-注册码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-dine/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 自研-邀请有礼-卡片
    path: 'pkgMarket/pages/invite-gift/share/index',
    key: '',
    rule: 3,
    getValues: [
      { current: 'ai', target: 'activityCode' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'cnc', target: 'regChannelCode' }
    ]
  },
  { // 自研-邀请有礼-二维码
    path: 'https://tm-web.pin-dao.cn/nx-inv',
    key: '',
    rule: 4,
    getValues: [
      { current: 'ai', target: 'activityCode' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'cnc', target: 'regChannelCode' }
    ]
  },
  { // 自研-邀请有礼-二维码
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-inv',
    key: '',
    rule: 4,
    getValues: [
      { current: 'ai', target: 'activityCode' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'cnc', target: 'regChannelCode' }
    ]
  },
  { // 公众号 - 小程序点餐页面
    path: 'pages/takefood/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 公众号 - 小程序我的页面
    path: 'pages/user/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 五周年
    path: 'pkgMarket/pages/invite-gift/invite/index',
    key: '',
    rule: 3,
    getValues: [
      { current: 'hf', target: 'regChannelCode' },
      { current: 'shopId', target: 'regStoreCode' }
    ]
  },
  {
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-anniversary',
    key: '',
    rule: 4,
    getValues: [
      { current: 'hf', target: 'regChannelCode' },
      { current: 'shopId', target: 'regStoreCode' }
    ]
  },
  {
    path: 'https://tm-web.pin-dao.cn/nx-anniversary',
    key: '',
    rule: 4,
    getValues: [
      { current: 'hf', target: 'regChannelCode' },
      { current: 'shopId', target: 'regStoreCode' }
    ]
  },
  { // 扫码领券/卡 (新) - 小程序路径
    path: 'pkgReceive/pages/receiveCoupon/receiveCoupon',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 扫码领券/卡 (新) - 小程序路径
    path: 'pkgReceive/pages/receiveCoupon/receiveCoupon',
    key: '',
    rule: 3,
    getValues: [{ current: 'oat', target: 'regChannelCode' }]
  },
  { // 扫码领券/卡 (新) - 小程序路径
    path: 'pkgReceive/pages/receiveCoupon/receiveCoupon',
    key: '',
    rule: 3,
    getValues: [{ current: 'oac', target: 'regStoreCode' }]
  },
  { // 扫码领券/卡 (2.0) - 小程序路径
    path: 'pkgReceive/pages/exchangeCoupon/exchangeCoupon',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 下单助力落地页 - 小程序路径
    path: 'pkgReceive/pages/studentCoupons/booster/booster',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ic', target: 'inviteCode' }
    ]
  },
  { // 扫码领券 (4.0) - 小程序路径
    path: 'pkgReceive/pages/fissionCoupons/receive/receive',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'invc', target: 'inviteCode' }
    ]
  },
  { // 扫码领券 (4.0) - 二维码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nxlqlb',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'invc', target: 'inviteCode' }
    ]
  },
  { // 扫码领券/卡 (4.0) - 二维码 - 生产
    path: 'https://tm-web.pin-dao.cn/nxlqlb',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'invc', target: 'inviteCode' }
    ]
  },
  { // 扫码领券/卡 (3.0) - 小程序路径
    path: 'pkgReceive/pages/studentCoupons/receive/receive',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ic', target: 'inviteCode' }
    ]
  },
  { // 扫码领券/卡 (3.0) - 二维码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nyqdh',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ic', target: 'inviteCode' }
    ]
  },
  { // 扫码领券/卡 (3.0) - 二维码 - 生产
    path: 'https://tm-web.pin-dao.cn/nyqdh',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ic', target: 'inviteCode' }
    ]
  },
  { // 扫码领券(旧) - 小程序路径
    path: 'pages/exchange-coupon/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 付费券包活动 - 小程序路径
    path: 'pages/couponPackage/list/list',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 查看指定券包 - 小程序路径
    path: 'pages/couponPackage/list/list',
    key: '',
    rule: 3,
    getValues: [
      { current: 'pid', target: 'pid' },
      { current: 'cnc', target: 'regChannelCode' }
    ]
  },
  { // 券包货架 - 小程序路径
    path: 'pages/couponPackage/list/list',
    key: '',
    rule: 3,
    getValues: [
      { current: 'slfc', target: 'slfc' },
      { current: 'cnc', target: 'regChannelCode' }
    ]
  },
  { // 测试环境 - 付费券包活动 - 二维码
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-coupon-package/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 付费券包活动 - 二维码
    path: 'https://tm-web.pin-dao.cn/nx-coupon-package/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 测试环境 - 券包货架 - 门店码
    path: 'https://nayuki-h5-test.pin-dao.cn/mdqb/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 生产环境 - 券包货架 - 门店码
    path: 'https://tm-web.pin-dao.cn/mdqb/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 查看指定券包 - 二维码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nxqb',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'pid', target: 'pid' },
      { current: 'slfc', target: 'slfc' }
    ]
  },
  { // 查看指定券包 - 二维码 - 生产
    path: 'https://tm-web.pin-dao.cn/nxqb',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'pid', target: 'pid' },
      { current: 'slfc', target: 'slfc' }
    ]
  },
  { // 首页分享 - 小程序路径
    path: 'pages/index/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'ic', target: 'inviteCode' }]
  },
  { // 首页推广 - 小程序路径
    path: 'pages/index/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 首页推广 - 小程序路径
    path: 'pages/index/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 点餐页分享 && 商品分享 - 小程序路径
    path: 'pages/takefood/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'ic', target: 'inviteCode' }]
  },
  { // 订单页分享 - 小程序路径
    path: 'pages/order/orderList/orderList',
    key: '',
    rule: 3,
    getValues: [{ current: 'ic', target: 'inviteCode' }]
  },
  { // 测试环境小票二维码 - 新版
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-xp',
    key: '',
    rule: 4,
    getValues: [{ current: 'sc', target: 'regStoreCode' }]
  },
  { // 生产环境小票二维码 - 新版
    path: 'https://tm-web.pin-dao.cn/nx-xp',
    key: '',
    rule: 4,
    getValues: [{ current: 'sc', target: 'regStoreCode' }]
  },
  { // 首页路径邀请弹窗 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-npu',
    key: '',
    rule: 4,
    getValues: [
      { current: 'channelCode', target: 'regChannelCode' },
      { current: 'shopId', target: 'regStoreCode' }
    ]
  },
  { // 首页路径邀请弹窗 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-npu',
    key: '',
    rule: 4,
    getValues: [
      { current: 'channelCode', target: 'regChannelCode' },
      { current: 'shopId', target: 'regStoreCode' }
    ]
  },
  { // 公众号点单页门店渠道 - 小程序路径
    path: 'pages/takefood/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'oac', target: 'regStoreCode' }]
  },
  { // 公众号点单页推广渠道 - 小程序路径
    path: 'pages/takefood/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'oat', target: 'regChannelCode' }]
  },
  { // 推广渠道优化 - 小程序点餐页面
    path: 'pages/takefood/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // pos 扫码支付 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-pos',
    key: '',
    rule: 4,
    getValues: [
      { current: 'sid', target: 'regStoreCode' },
      { current: 'st', target: 'storeLoginType' }
    ]
  },
  { // pos 扫码支付 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-pos',
    key: '',
    rule: 4,
    getValues: [
      { current: 'sid', target: 'regStoreCode' },
      { current: 'st', target: 'storeLoginType' }
    ]
  },
  // 员工渠道相关
  { // 门店储值渠道码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-balance/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 员工渠道码-点单码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nxyg-dc',
    key: '',
    rule: 4,
    getValues: [
      { current: 'sc', target: 'regStoreCode' },
      { current: 'pc', target: 'gioStaffCode' }
    ]
  },
  { // 员工渠道码-储值码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nxyg-cz',
    key: '',
    rule: 4,
    getValues: [
      { current: 'sc', target: 'regStoreCode' },
      { current: 'pc', target: 'gioStaffCode' }
    ]
  },
  { // 门店储值渠道码 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-balance/',
    key: 'regStoreCode',
    rule: 1
  },
  { // 员工渠道码-点单码 - 生产
    path: 'https://tm-web.pin-dao.cn/nxyg-dc',
    key: '',
    rule: 4,
    getValues: [
      { current: 'sc', target: 'regStoreCode' },
      { current: 'pc', target: 'gioStaffCode' }
    ]
  },
  { // 员工渠道码-储值码 - 生产
    path: 'https://tm-web.pin-dao.cn/nxyg-cz',
    key: '',
    rule: 4,
    getValues: [
      { current: 'sc', target: 'regStoreCode' },
      { current: 'pc', target: 'gioStaffCode' }
    ]
  },
  { // 订阅消息
    path: 'pages/takefood/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'c', target: 'regStoreCode' }]
  },
  { // 储值有礼-推广码 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/remainder/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 储值有礼-推广码 - 生产
    path: 'https://tm-web.pin-dao.cn/remainder/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 储值有礼-推广渠道码 - 小程序路径
    path: 'pages/member/recharge/recharge',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  { // 储值有礼-储值货架 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-czhj',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'gsid', target: 'Recharge_shelf' }
    ]
  },
  { // 储值有礼-储值货架 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-czhj',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'gsid', target: 'Recharge_shelf' }
    ]
  },
  { // 储值有礼-实体品 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/jointly-recharge',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'gsid', target: 'Recharge_shelf' }
    ]
  },
  { // 储值有礼-实体品 - 生产
    path: 'https://tm-web.pin-dao.cn/jointly-recharge',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'gsid', target: 'Recharge_shelf' }
    ]
  },
  { // 礼品卡二维码推广-推广渠道 - 生产
    path: 'https://tm-web.pin-dao.cn/naixue-giftcard',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  {
    path: 'pages/giftcard/card/index',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 储值有礼-推广渠道码 - 小程序路径
    path: 'pages/member/recharge/recharge',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'gsid', target: 'Recharge_shelf' }
    ]
  },
  { // 储值有礼-实体品 - 小程序路径
    path: 'pkgMarket/pages/jointly/recharge/recharge',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'gsid', target: 'Recharge_shelf' }
    ]
  },
  // 独立货架
  { // 测试二维码
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-dlhj/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 生产二维码
    path: 'https://tm-web.pin-dao.cn/nx-dlhj/',
    key: 'regChannelCode',
    rule: 1
  },
  { // 小程序页面路径
    path: 'pkgMarket/pages/shelves/shelves',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  // 学生认证相关
  { // 学生认证
    path: 'pkgMarket/pages/student/attestation/attestation',
    key: '',
    rule: 3,
    getValues: [
      { current: 'ai', target: 'activityId' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'rc', target: 'regChannelCode' }
    ]
  },
  { // 学生卡邀请有礼 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/yqxs',
    key: '',
    rule: 4,
    getValues: [
      { current: 'ai', target: 'activityId' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'rc', target: 'regChannelCode' }
    ]
  },
  { // 学生卡邀请有礼 - 生产
    path: 'https://tm-web.pin-dao.cn/yqxs',
    key: '',
    rule: 4,
    getValues: [
      { current: 'ai', target: 'activityId' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'rc', target: 'regChannelCode' }
    ]
  },
  { // 学生卡开卡 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/xsrz',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 学生卡开卡 - 生产
    path: 'https://tm-web.pin-dao.cn/xsrz',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  // 营销活动相关
  { // 集杯活动
    path: 'pkgMarket/pages/collectCup/collectCup',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 集杯活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/collect-cup',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 集杯活动 - 生产
    path: 'https://tm-web.pin-dao.cn/collect-cup',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 七周年领取券包
    path: 'pkgMarket/pages/couponPackage/receive/receive',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 福袋落地页
    path: 'pkgMarket/pages/sevenAnniversary/sevenAnniversary',
    key: '',
    rule: 3,
    getValues: [{ current: 'channelCode', target: 'regChannelCode' }]
  },
  // 年报活动
  { // 年报活动
    path: 'pkgShares/pages/annualReport/index/index',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ari', target: 'annualReportId' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 年报活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nbhd',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ari', target: 'annualReportId' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 年报活动 - 生产
    path: 'https://tm-web.pin-dao.cn/nbhd',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ari', target: 'annualReportId' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 年报抽奖活动
    path: 'pkgShares/pages/annualReport/raffle/raffle',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'activityId', target: 'activityId' },
      { current: 'inc', target: 'inviteCode' }
    ]
  },
  { // 年报抽奖活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nxcj',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'activityId', target: 'activityId' }
    ]
  },
  { // 年报抽奖活动 - 生产
    path: 'https://tm-web.pin-dao.cn/nxcj',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'activityId', target: 'activityId' }
    ]
  },
  { // 龙年年报 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/loong-report',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'aid', target: 'activityId' }
    ]
  },
  { // 龙年年报 - 生产
    path: 'https://tm-web.pin-dao.cn/loong-report',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'aid', target: 'activityId' }
    ]
  },
  { // 龙年年报
    path: 'pkgShares/pages/loongAnnualReport/index/index',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'aid', target: 'activityId' }
    ]
  },
  // 其他活动
  { // 落地页活动
    path: 'pkgReceive/pages/activeLand/activeLand',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 落地页活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-active-land',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 落地页活动 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-active-land',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 口令红包兑换活动
    path: 'pkgMarket/pages/pwdExchange/pwdExchange',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 口令红包兑换活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-pwd-exchange',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 口令红包兑换活动 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-pwd-exchange',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 投票
    path: 'pkgMarket/pages/vote/vote',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'id', target: 'activityId' }
    ]
  },
  { // 投票 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-vote',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'id', target: 'activityId' }
    ]
  },
  { // 投票 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-vote',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'id', target: 'activityId' }
    ]
  },
  { // 集卡
    path: 'pkgMarket/pages/cardCollect/cardCollect',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ai', target: 'activityId' },
      { current: 'iai', target: 'inviteActivityId' }
    ]
  },
  { // 集卡 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-card',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ai', target: 'activityId' },
      { current: 'iai', target: 'inviteActivityId' }
    ]
  },
  { // 集卡 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-card',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ai', target: 'activityId' },
      { current: 'iai', target: 'inviteActivityId' }
    ]
  },
  { // 答题
    path: 'pkgMarket/pages/eightAnniversary/answer/answer',
    key: '',
    rule: 3,
    getValues: [
      { current: 'inviteCode', target: 'inviteCode' },
      { current: 'activityId', target: 'activityId' }
    ]
  },
  { // 答题 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-answer',
    key: '',
    rule: 4,
    getValues: [
      { current: 'inviteCode', target: 'inviteCode' },
      { current: 'activityId', target: 'activityId' }
    ]
  },
  { // 答题 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-answer',
    key: '',
    rule: 4,
    getValues: [
      { current: 'inviteCode', target: 'inviteCode' },
      { current: 'activityId', target: 'activityId' }
    ]
  },
  { // 冲榜消费
    path: 'pkgShares/pages/topRanking/topRanking',
    key: '',
    rule: 3,
    getValues: [{ current: 'activityId', target: 'activityId' }]
  },
  { // 冲榜消费 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-ranking',
    key: '',
    rule: 4,
    getValues: [{ current: 'activityId', target: 'activityId' }]
  },
  { // 冲榜消费 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-ranking',
    key: '',
    rule: 4,
    getValues: [{ current: 'activityId', target: 'activityId' }]
  },
  { // 勋章
    path: 'pkgShares/pages/medal/medal',
    key: '',
    rule: 3,
    getValues: [{ current: 'activityId', target: 'activityId' }]
  },
  { // 勋章 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-medal',
    key: '',
    rule: 4,
    getValues: [{ current: 'activityId', target: 'activityId' }]
  },
  { // 勋章 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-medal',
    key: '',
    rule: 4,
    getValues: [{ current: 'activityId', target: 'activityId' }]
  },
  { // 短信跳转中转页
    path: 'pages/smsReceive/smsReceive',
    key: '',
    rule: 3,
    getValues: [
      { current: 'channelCode', target: 'regChannelCode' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'oac', target: 'regStoreCode' },
      { current: 'oat', target: 'regChannelCode' },
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'c', target: 'regStoreCode' }
    ]
  },
  { // 性格测试
    path: 'pkgMarket/pages/personalityTest/personalityTest',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'rc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ai', target: 'activityId' },
      { current: 'iai', target: 'inviteActivityId' }
    ]
  },
  { // 性格测试 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-personality',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'rc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ai', target: 'activityId' },
      { current: 'iai', target: 'inviteActivityId' }
    ]
  },
  { // 性格测试 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-personality',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'rc', target: 'regChannelCode' },
      { current: 'inc', target: 'inviteCode' },
      { current: 'ai', target: 'activityId' },
      { current: 'iai', target: 'inviteActivityId' }
    ]
  },
  // 权益卡相关
  { // 权益卡购买
    path: 'pkgMarket/pages/equityCard/equityCard',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'id', target: 'benefitItemId' }
    ]
  },
  { // 权益卡购买 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nx-equityCard',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'id', target: 'benefitItemId' }
    ]
  },
  { // 权益卡购买 - 生产
    path: 'https://tm-web.pin-dao.cn/nx-equityCard',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'id', target: 'benefitItemId' }
    ]
  },
  { // NICE购买
    path: 'pkgMarket/pages/niceCard/niceCard',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'id', target: 'benefitCardId' }
    ]
  },
  { // NICE购买 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/nice-card',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'id', target: 'benefitCardId' }
    ]
  },
  { // NICE购买 - 生产
    path: 'https://tm-web.pin-dao.cn/nice-card',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'id', target: 'benefitCardId' }
    ]
  },
  // 节日活动
  { // 2025情人节
    path: 'pkgReceive/pages/valentinesDay/valentinesDay',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 2025情人节 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/valentines-day',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 2025情人节 - 生产
    path: 'https://tm-web.pin-dao.cn/valentines-day',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 2025三八妇女节
    path: 'pkgReceive/pages/hongbao/index/index',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 2025三八妇女节 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/hongbao',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  { // 2025三八妇女节 - 生产
    path: 'https://tm-web.pin-dao.cn/hongbao',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'ai', target: 'activityId' }
    ]
  },
  // 邀请活动
  { // 邀请活动
    path: 'pkgMarket/pages/inviteGift/inviteGift',
    key: '',
    rule: 3,
    getValues: [
      { current: 'ai', target: 'activityId' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'cnc', target: 'channelCode' },
      { current: 'rc', target: 'regChannelCode' }
    ]
  },
  { // 邀请活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/inviteGift',
    key: '',
    rule: 4,
    getValues: [
      { current: 'ai', target: 'activityId' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'cnc', target: 'channelCode' },
      { current: 'rc', target: 'regChannelCode' }
    ]
  },
  { // 邀请活动 - 生产
    path: 'https://tm-web.pin-dao.cn/inviteGift',
    key: '',
    rule: 4,
    getValues: [
      { current: 'ai', target: 'activityId' },
      { current: 'ic', target: 'inviteCode' },
      { current: 'cnc', target: 'channelCode' },
      { current: 'rc', target: 'regChannelCode' }
    ]
  },
  { // 种豆活动
    path: 'pkgReceive/pages/legumes/index/index',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'aid', target: 'activityId' },
      { current: 'inc', target: 'inviteCode' }
    ]
  },
  { // 种豆活动 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/zhongdou',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'aid', target: 'activityId' }
    ]
  },
  { // 种豆活动 - 生产
    path: 'https://tm-web.pin-dao.cn/zhongdou',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'aid', target: 'activityId' }
    ]
  },
  { // 邀请函
    path: 'pkgReceive/pages/yinyuehe/yinyuehe',
    key: '',
    rule: 3,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 邀请函 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/yqh',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 邀请函 - 生产
    path: 'https://tm-web.pin-dao.cn/yqh',
    key: '',
    rule: 4,
    getValues: [{ current: 'cnc', target: 'regChannelCode' }]
  },
  { // 下单任务
    path: 'pkgShares/pages/taskDetail/taskDetail',
    key: '',
    rule: 3,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'activityId', target: 'activityId' },
      { current: 'strategyId', target: 'strategyId' }
    ]
  },
  { // 下单任务 - 测试
    path: 'https://nayuki-h5-test.pin-dao.cn/task',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'activityId', target: 'activityId' },
      { current: 'strategyId', target: 'strategyId' }
    ]
  },
  { // 下单任务 - 生产
    path: 'https://tm-web.pin-dao.cn/task',
    key: '',
    rule: 4,
    getValues: [
      { current: 'cnc', target: 'regChannelCode' },
      { current: 'activityId', target: 'activityId' },
      { current: 'strategyId', target: 'strategyId' }
    ]
  }
]

export default {
  square,
  circular: [
    { // 只有门店邀请码，建议放最后，如有其它的圆形二维码往前放
      path: '',
      key: 'c%3D',
      rule: 5,
      getValues: [{ current: 'c', target: 'regStoreCode' }]
    }
  ]
}
