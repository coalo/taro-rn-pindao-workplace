/**
 * 配置文件
 * 从原生小程序完整迁移，包含所有业务配置
 */
import hostMap from '../mapFile/hostMap'

// 配置类型定义
interface ConfigType {
  // 公共配置
  businessType: number
  brand: number
  brandName: string
  brandNameAbbr: string
  shareTitle: string
  shareImage: string

  // 埋点配置
  sensorsConfig: any
  sensorsExposure: any

  // 登录配置
  loginType: number
  loginSlogan: string[]

  // 首页配置
  homeBannerDefaultImg: string

  // 邀请有礼配置
  inviteShareUrl: string
  loongAnnualReport: string
  personalityTestUrl: string

  // 学生卡邀请有礼配置
  stuInviteShareUrl: string
  newStudentInviteShareUrl: string

  // 勋章配置
  medalShareUrl: string

  // 三方配置信息
  tripartiteAPPID: any
  tripartitePath: any

  // 杯型规格 code 配置
  cupConfig: any

  // 微信小程序场景值
  sceneCode: number[]
}

// 合并配置函数
const mergeConfig = (cfg: Partial<ConfigType>, target: Partial<ConfigType> = config): void => {
  Object.keys(cfg).forEach(key => {
    if (target[key as keyof ConfigType]) {
      throw new Error(`检测到重复的配置键值：${key}`)
    } else {
      (target as any)[key] = (cfg as any)[key]
    }
  })
}

// 公共配置
const commonConfig: Partial<ConfigType> = {
  businessType: 1, // 业务类型
  brand: 26000252, // 品牌号
  brandName: '奈雪的茶', // 品牌名
  brandNameAbbr: '奈雪', // 品牌名简称
  shareTitle: '一口好茶，一口软欧包，在奈雪遇见两种美好', // 默认分享标题
  shareImage: 'https://trade-marketing-prod-oss.pin-dao.cn/product/1669294919855.jpg' // 默认分享图片
}

// 埋点配置
const pointsConfig: Partial<ConfigType> = {
  sensorsConfig: {
    name: 'sensors',
    server_url: hostMap.shenceUrl,
    autoTrack: {
      appLaunch: true, // 默认为 true，false 则关闭 $MPLaunch 事件采集
      appShow: true, // 默认为 true，false 则关闭 $MPShow 事件采集
      appHide: true, // 默认为 true，false 则关闭 $MPHide 事件采集
      pageShow: true, // 默认为 true，false 则关闭 $MPViewScreen 事件采集
      pageShare: true, // 默认为 true，false 关闭 $MPShare 事件采集
      mpClick: false, // 默认为 false，true 则开启 $MPClick 事件采集
      mpFavorite: true, // 默认为 true，false 关闭 $MPAddFavorites 事件采集
      pageLeave: true // 默认为 false， true 则开启 $MPPageLeave事件采集
    },
    show_log: true
  },
  sensorsExposure: {
    class_tags: ['sensors-exposure-track'],
    area_rate: 0.5,
    stay_duration: 0,
    repeated: true
  }
}

// 登录配置
const loginConfig: Partial<ConfigType> = {
  loginType: 3, // 登录类型
  loginSlogan: ['美好自有力量'] // 登录语
}

// 首页配置
const homeConfig: Partial<ConfigType> = {
  homeBannerDefaultImg: 'https://trade-marketing-prod-oss.pin-dao.cn/product/1734404392760.jpeg' // 首页Banner无配置占位图链接
}

// 邀请有礼配置
const inviteConfig: Partial<ConfigType> = {
  inviteShareUrl: `${hostMap.h5}/nx-inv`, // 二维码分享链接
  loongAnnualReport: `${hostMap.h5}/loong-report`, // 年报
  personalityTestUrl: `${hostMap.h5}/nx-personality` // 性格测试链接
}

// 学生卡邀请有礼配置
const stuInviteConfig: Partial<ConfigType> = {
  stuInviteShareUrl: `${hostMap.h5}/yqxs`, // 二维码分享链接
  newStudentInviteShareUrl: `${hostMap.h5}/nyqdh` // 新版二维码分享链接
}

// 勋章配置
const medalConfig: Partial<ConfigType> = {
  medalShareUrl: `${hostMap.h5}/nx-medal` // 二维码分享链接
}

// 三方配置信息（外包）
const tripartiteConfig: Partial<ConfigType> = {
  tripartiteAPPID: {
    paradiseId: 'wx7085dc5ec7628283'
  },
  tripartitePath: {
    devParadisePath: 'https://game.moxigame.cn/mac/Test_spokesman_naixue/index.html?activeid=643618b345d7c0000189c342&env=pre',
    prodParadisePath: 'https://game-cdn.moxigame.cn/ClickEliminate/spokesman/naixue_release/index.html?activeid=64464479e189870001d7fae3',
    prodUmePath: 'plugin.i-lz.cn',
    prodXiaoManPath_1: 'hixiaoman.com',
    prodXiaoManPath_2: 'debo4debo.cn',
    prodXiaoManPath_3: 'debo5debo.cn',
    prodXiaoManPath_4: 'meta-huanxuan.com',
    prodXiaoManPath_5: 'meta-xuantan.com',
    mengjinyuanPath: 'mokingran.com',
    iccSLink: 's.icc.link/',
    iccFriend: 'wxh5.icc.link/friend-fission'
  }
}

// 杯型规格 code 配置
const cupSpecConfig: Partial<ConfigType> = {
  cupConfig: {
    attrCode: 'KIwcyYEH',
    default: {
      // 默认
      selected: '/images/ic_cup_mid_selected.png',
      unselected: '/images/ic_cup_mid_unselected.png'
    },
    BsbSWZoS: {
      // 中杯
      selected: '/images/ic_cup_mid_selected.png',
      unselected: '/images/ic_cup_mid_unselected.png'
    },
    IPEphCSh: {
      // 大杯
      selected: '/images/ic_cup_large_selected.png',
      unselected: '/images/ic_cup_large_unselected.png'
    },
    wqGKMSgS: {
      // 一桶杯
      selected: '/images/ic_cup_max_selected.png',
      unselected: '/images/ic_cup_max_unselected.png'
    }
  }
}

// 微信小程序场景值
const sceneCodeConfig: Partial<ConfigType> = {
  sceneCode: [
    1000, 1006, 1007, 1008, 1011, 1012, 1013, 1014, 1024, 1026, 1027, 1031, 1032,
    1035, 1036, 1037, 1038, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1053, 1058,
    1065, 1067, 1069, 1073, 1074, 1081, 1082, 1084, 1088, 1090, 1091, 1095, 1096,
    1099, 1104, 1106, 1107, 1119, 1120, 1121, 1125, 1126, 1144, 1152, 1157, 1158,
    1160, 1167, 1179, 1184, 1185, 1192, 1193, 1194, 1202, 1207, 1230, 1244, 1265, 1286
  ]
}

// 初始化配置对象
const config: Partial<ConfigType> = {}

// 合并所有配置
mergeConfig(commonConfig)
mergeConfig(pointsConfig)
mergeConfig(loginConfig)
mergeConfig(homeConfig)
mergeConfig(inviteConfig)
mergeConfig(stuInviteConfig)
mergeConfig(tripartiteConfig)
mergeConfig(cupSpecConfig)
mergeConfig(sceneCodeConfig)
mergeConfig(medalConfig)

export default config as ConfigType
