/**
 * 分包接口地址映射 - pkgOrder
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

const orderApi: ApiMapObject = {
  getFindRemarkLabel: '/order/findRemarkLabel' // 获取备注快捷标签
}

const activityApi: ApiMapObject = {
  getStickerInfo: '/activity/sceneActivity/queryCustomizedBlessing', // 获取杯贴信息
  textContentAudit: '/comment/audit/textContentAudit' // 杯贴内容敏感词校验
}

const apiMap: ApiMapObject = {}
mergeApiMap(orderApi)
mergeApiMap(activityApi)

export default apiMap
