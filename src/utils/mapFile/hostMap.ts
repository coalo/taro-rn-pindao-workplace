/**
 * 接口域名映射
 * 从原生小程序迁移，保持所有环境配置
 */

// 环境类型定义
type EnvType = 'dev' | 'pre' | 'prod'

// 环境配置接口
interface HostConfig {
  appId: string
  api: string
  h5: string
  mqtt: string
  gioProjectId: string
  wxMapKey: string
  wxMapCheck: string
  cloudId: string
  AMapkey: string
  shenceUrl: string
  version?: string
  topic_spell?: string
  topic_order?: string
  gid_spell?: string
  gid_order?: string
}

// 根据 NODE_ENV 自动设置环境
export const CURRENT_ENV: EnvType = 
  (process.env.NODE_ENV === 'development' ? 'dev' : 'prod') as EnvType

const COMMON_INFO = {
  version: '5.4.45',
  topic_spell: 'topic_cart_notify',
  topic_order: 'topic_order_status',
  gid_spell: 'GID_CART_NOTIFY',
  gid_order: 'GID_ORDER_STATUS'
}

export const hostMap: Record<EnvType, Omit<HostConfig, keyof typeof COMMON_INFO>> = {
  dev: {
    appId: 'wx4b8969f0e4f3e85b',
    api: 'https://tm-test.pin-dao.cn',
    h5: 'https://nayuki-h5-test.pin-dao.cn',
    mqtt: 'wxs://mqtt-cn-zz11rdb0z01.mqtt.aliyuncs.com',
    gioProjectId: '8ca89e858d09c5e1',
    wxMapKey: '4TKBZ-X6463-E373B-3PIGR-OIMXZ-O3FQS',
    wxMapCheck: 'QL1QIsQ68C4kTR4e1cS6BTj1yPL88wKP',
    cloudId: 'nx-test-offline-1gzw2aq68571ab32',
    AMapkey: '250666c2df9234d304cc2fb42c3ccad5',
    shenceUrl: 'https://naixue-pro.datasink.sensorsdata.cn/sa?project=default&token=6eb2d05bc6176fc2'
  },
  pre: {
    appId: 'wx4b8969f0e4f3e85b',
    api: 'https://tm-pre.pin-dao.cn',
    h5: 'https://nayuki-h5-pre.pin-dao.cn',
    mqtt: 'wxs://mqtt-cn-zz11rdb0z01.mqtt.aliyuncs.com',
    gioProjectId: '8ca89e858d09c5e1',
    wxMapKey: '4TKBZ-X6463-E373B-3PIGR-OIMXZ-O3FQS',
    wxMapCheck: 'QL1QIsQ68C4kTR4e1cS6BTj1yPL88wKP',
    cloudId: 'nx-test-offline-1gzw2aq68571ab32',
    AMapkey: '250666c2df9234d304cc2fb42c3ccad5',
    shenceUrl: 'https://naixue-pro.datasink.sensorsdata.cn/sa?project=default&token=6eb2d05bc6176fc2'
  },
  prod: {
    appId: 'wxab7430e6e8b9a4ab',
    api: 'https://tm-api.pin-dao.cn',
    h5: 'https://tm-web.pin-dao.cn',
    mqtt: 'wxs://mqtt-cn-zz11slals06.mqtt.aliyuncs.com',
    gioProjectId: '932e6e28e0172325',
    wxMapKey: 'MT6BZ-ML4K6-VD2SI-M77YP-ZDGMH-R7BKN',
    wxMapCheck: 'rc0e8ibWGM3sTDnbVvMeLYyFWZ1TiTPS',
    cloudId: 'cloud1-4g38e11n4c029a89',
    AMapkey: '250666c2df9234d304cc2fb42c3ccad5',
    shenceUrl: 'https://naixue-pro.datasink.sensorsdata.cn/sa?project=production&token=6eb2d05bc6176fc2'
  }
}

// 合并当前环境配置与通用信息
const host: HostConfig = {
  ...hostMap[CURRENT_ENV],
  ...COMMON_INFO
}

export default host
