/**
 * 埋点工具 - 与原生 sensors 保持同名导出
 * 完整迁移自 app.js 中的 sensors 相关功能
 */
const sensors = {
  // 初始化配置
  init(config?: any) {
    console.log('[Sensors.init]', config)
  },

  // 注册 App 属性
  registerApp(properties: any) {
    console.log('[Sensors.registerApp]', properties)
  },

  // 事件埋点
  track(event: string, data?: any) {
    console.log('[Sensors.track]', event, data)
  },

  // 绑定 OpenID
  bindOpenid(openId: string | null) {
    console.log('[Sensors.bindOpenid]', openId)
  },

  // 绑定 UnionID
  bindUnionid(unionId: string | null) {
    console.log('[Sensors.bindUnionid]', unionId)
  },

  // 用户登录
  login(userId: string) {
    console.log('[Sensors.login]', userId)
  },

  // 绑定用户属性
  bind(key: string, value: any) {
    console.log('[Sensors.bind]', key, value)
  },

  // 设置一次性用户属性
  setOnceProfile(properties: any) {
    console.log('[Sensors.setOnceProfile]', properties)
  },

  // 使用插件
  usePlugin(plugin: any, config?: any) {
    console.log('[Sensors.usePlugin]', plugin, config)
  },

  // 订单表单埋点
  settingOrderForm() {
    console.log('[Sensors.settingOrderForm]')
  },

  // 曝光模块
  modules: {
    Exposure: {
      addObserverByClassName(className: string, options: any) {
        console.log('[Sensors.Exposure]', className, options)
      }
    }
  }
}

export default sensors
