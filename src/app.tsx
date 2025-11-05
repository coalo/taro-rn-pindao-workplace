/**
 * Taro App 入口文件
 * 迁移自原生小程序 app.js，保持架构一致性
 * 
 * 设计原则：
 * 1. 保持与原生小程序 app.js 相似的结构
 * 2. utils 目录承担 services 职责（dataSync等）
 * 3. 避免过度抽象和拆分
 */
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import Taro, { useLaunch, useDidShow } from '@tarojs/taro'
import { store } from './store'
import { AppProvider, useAppContext } from './store/AppContext'
import { dataSync, check, theme, config, hostMap, tools, scene } from '@/utils'
import sensors from '@/utils/toolFile/sensors'
import type { GlobalState } from './store/AppContext'

if (process.env.TARO_ENV !== 'rn') {
  require('./app.scss')
}

/**
 * 初始化神策埋点配置
 * 对应原生 app.js 的 initSensors 方法
 */
function initSensors(globalData: GlobalState) {
  const scanCode = tools.getScanCode() || {}
  const regChannelCode = scanCode.regChannelCode || ''
  const scanSplit = regChannelCode.split('|') || []
  
  try {
    sensors.registerApp({
      visit_source: scene.Scene[scanSplit[1] || ''] || '',
      scene_classification: scene.SceneClassification[scanSplit[1] || ''] || '',
      promotion_channel_id: scanSplit[0] || '',
      store_channel_id: scanCode.regStoreCode || ''
    })
  } catch (error) {
    sensors.registerApp({
      visit_source: scanSplit[1] || '',
      promotion_channel_id: scanSplit[0] || '',
      store_channel_id: scanCode.regStoreCode || ''
    })
  }

  // sensors.usePlugin(Exposure, config.sensorsExposure)
  sensors.init(config.sensorsConfig)
}

/**
 * 静默登录并获取用户信息
 * 对应原生 app.js 的 silentLogin 方法
 */
function silentLogin(globalData: GlobalState, updateState: (updates: Partial<GlobalState>) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    if (globalData.hasSilentLogin) return resolve()

    dataSync.syncAccessToken().then(() => {
      let syncArr = [
        dataSync.syncConfigInfo(),
        dataSync.syncShenceABApi(),
        dataSync.syncAgreementInfo()
      ]
      check.isLogin() && syncArr.push(dataSync.syncUserInfo())
      
      Promise.all(syncArr.map(f => f.catch((e: any) => e))).then(() => {
        updateState({ hasSilentLogin: true })
        const userInfo = globalData.userInfo || {}

        sensors.bindOpenid(globalData.openId)
        sensors.bindUnionid(globalData.unionId)

        if (check.isMember()) {
          sensors.login(userInfo.userId)
        } else {
          sensors.bind('identity_pre_user_id', userInfo.userId)
        }

        sensors.registerApp({
          is_login: () => !!check.isMember(),
          abTest: () => {
            return (globalData.strategyGroup?.coupon_use?.strategyInfo) || 'coupon1B'
          },
          abTests: () => {
            return tools.deepConvert(globalData.strategyGroup) || []
          }
        })

        sensors.setOnceProfile({ pre_user_id: userInfo.userId })

        sensors.track('LoginResult', {
          login_method: '静默登录',
          is_register: !!check.isMember(),
          is_success: true
        })
        resolve()
      })
      
      let asyncArr = [dataSync.syncShareInfo()]
      Promise.all(asyncArr.map(f => f.catch((e: any) => e))).then()
    }, () => {
      updateState({ hasSilentLogin: true })
      resolve()
    })
  })
}

/**
 * 检查小程序版本更新
 * 对应原生 app.js 的 checkAppUpdate 方法
 */
function checkAppUpdate() {
  if (process.env.TARO_ENV !== 'weapp') return
  
  const updateManager = Taro.getUpdateManager()
  updateManager.onUpdateReady(() => {
    Taro.showModal({
      title: '更新提示',
      content: '小程序已更新，请重启应用',
      showCancel: false,
      success: res => (res.confirm && updateManager.applyUpdate())
    })
  })
  updateManager.onUpdateFailed(() => {
    Taro.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      showCancel: false
    })
  })
}

/**
 * 监听小程序隐私授权
 * 对应原生 app.js 的 listenAuthorise 方法
 */
function listenAuthorise(updateState: (updates: Partial<GlobalState>) => void) {
  if (process.env.TARO_ENV !== 'weapp') return
  
  const onNeedPrivacyAuthorization = (Taro as any).onNeedPrivacyAuthorization
  onNeedPrivacyAuthorization && onNeedPrivacyAuthorization((resolve: any) => {
    updateState({ authResolve: resolve })
    // getCurrentPages().pop().selectComponent('#auth').openAuthModal()
  })
}

// App 初始化逻辑组件
function AppInit(props: PropsWithChildren) {
  const { state: globalData, updateState } = useAppContext()

  // onLaunch - 对应原生 app.js 的 onLaunch
  useLaunch(async () => {
    // 配置神策初始化参数
    sensors.registerApp({
      platform_type: '微信小程序',
      app_name: config.brandName,
      app_version: hostMap.version,
      is_login: false
    })
    
    await dataSync.updateSystemInfo()
    checkAppUpdate()
    listenAuthorise(updateState)
    
    // 静默登录
    await silentLogin(globalData, updateState)
    
    // TODO: 根据实际需求决定是否跳转
    // Taro.switchTab({ url: '/pages/demo/index' })
  })

  // onShow - 对应原生 app.js 的 onShow
  useDidShow((options) => {
    dataSync.updateQueryInfo(options).then()
    initSensors(globalData)
  })

  return <>{props.children}</>
}

// App 根组件
function App(props: PropsWithChildren) {
  return (
    <Provider store={store}>
      <AppProvider>
        <AppInit>{props.children}</AppInit>
      </AppProvider>
    </Provider>
  )
}

export default App
