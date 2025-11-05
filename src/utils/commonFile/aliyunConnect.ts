/**
 * 阿里云 MQTT 连接管理
 * 从原生小程序迁移，用于订单和拼单消息推送
 * 注意：Taro RN 环境下 MQTT 需要使用对应的库，此处为适配层
 */
import Taro from '@tarojs/taro'
import { request, apiMap, hostMap } from '@/utils'

// Token 类型
interface TokenInfo {
  username: string
  password: string
}

// 初始化参数
interface InitParameter {
  mqtt?: any
  type: 'order' | 'spell'
  id: string[]
  success?: () => void
}

/**
 * MQTT 连接管理类
 */
class ConnectMqtt {
  private _orderClient: any = null // 订单客户端
  private _spellClient: any = null // 拼单客户端
  private _token: {
    order: TokenInfo
    spell: TokenInfo
  } = {
    order: { username: '', password: '' },
    spell: { username: '', password: '' }
  }
  private mqtt: any = ''

  /**
   * 过滤状态 - 判断是否需要获取 Token
   */
  private _filterStatus(type: 'order' | 'spell'): string {
    if (
      (type === 'order' && !this._token.order.username) ||
      (type === 'spell' && !this._token.spell.username)
    ) {
      return '_getToken'
    } else {
      return `${type}Client`
    }
  }

  /**
   * 获取 MQTT Token
   */
  private async _getToken(
    type: 'order' | 'spell',
    id: string[],
    callback?: () => void
  ): Promise<void> {
    try {
      const path = type === 'order' ? apiMap.postOrderMQTTToken : apiMap.getCardToken
      const res = await request(path)
      const data = res?.data || {}

      this._token[type] = {
        username: data.username,
        password: data.password
      }

      // 调用对应的客户端连接方法
      ;(this as any)[`${type}Client`](type, id, callback)
    } catch (err: any) {
      Taro.showToast({
        title: err.message || '获取 Token 失败',
        icon: 'none'
      })
    }
  }

  /**
   * 获取连接配置
   */
  private _getOpt(type: 'order' | 'spell') {
    const HOST = hostMap.mqtt // MQTT 服务器地址
    const port = 1883 // WebSocket 协议服务端口
    const topic = (hostMap as any)[`topic_${type}`] // Topic
    const groupId = (hostMap as any)[`gid_${type}`] // MQTT GroupID

    // TODO: 需要从全局状态获取 userId
    const userId = 'user_' + Date.now()
    const clientId = groupId + '@@@' + userId + Date.now()

    console.log('---topic', topic)
    console.log('---clientId: ', clientId)

    return {
      port,
      topic,
      host: HOST,
      clientId: clientId,
      password: this._token[type].password,
      username: this._token[type].username
    }
  }

  /**
   * 创建 MQTT 客户端
   */
  private _createClient(opt: any, type: 'order' | 'spell') {
    // 关闭旧连接
    if (this[`_${type}Client`]) {
      this[`_${type}Client`].end && this[`_${type}Client`].end()
    }

    // TODO: Taro RN 环境需要使用对应的 MQTT 库
    // 此处仅为示例，实际需要引入 mqtt.js 或其他库
    console.log('[MQTT] Creating client for:', type, opt)

    return null // 占位返回
  }

  /**
   * 订单客户端连接
   */
  orderClient(type: 'order' | 'spell', id: string[], callback?: () => void): void {
    if (!(id && id.length)) {
      return
    }

    const opt = this._getOpt(type)
    this._orderClient = this._createClient(opt, type)

    // TODO: 实际连接逻辑
    console.log('[MQTT] Order client connecting...', opt.topic)
    callback && callback()
  }

  /**
   * 拼单客户端连接
   */
  spellClient(type: 'order' | 'spell', id: string[], callback?: () => void): void {
    const opt = this._getOpt(type)
    this._spellClient = this._createClient(opt, type)

    console.log('[MQTT] Spell client connecting...', opt.topic)
    callback && callback()
  }

  /**
   * 初始化
   */
  init(parameter: InitParameter = { type: 'order', id: [], success: () => {} }): void {
    if (!parameter.mqtt) {
      console.warn('[MQTT] mqtt library not provided')
      return
    }

    this.mqtt = parameter.mqtt
    const func = this._filterStatus(parameter.type)

    if (func && (this as any)[func]) {
      ;(this as any)[func](parameter.type, parameter.id, parameter.success)
    }
  }

  /**
   * 消息监听器
   */
  message(type: 'order' | 'spell' = 'order', cb: (msg: any) => void): void {
    try {
      const client = this[`_${type}Client`]
      if (!client) {
        console.warn(`[MQTT] ${type} client not initialized`)
        return
      }

      // TODO: 实际消息监听逻辑
      console.log('[MQTT] Message listener registered for:', type)
    } catch (error) {
      console.error('[MQTT] Message error:', error)
    }
  }

  /**
   * 关闭连接
   */
  close(type: 'order' | 'spell'): void {
    try {
      const client = this[`_${type}Client`]
      if (client && client.end) {
        client.end()
      }
      this[`_${type}Client`] = null
      console.log(`[MQTT] ${type} client closed`)
    } catch (error) {
      console.error('[MQTT] Close error:', error)
    }
  }
}

// 导出单例
const connectMqtt = new ConnectMqtt()

export default connectMqtt
