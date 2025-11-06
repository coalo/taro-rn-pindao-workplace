/**
 * 小程序接口请求方法
 * 从原生小程序完整迁移，保持变量名与逻辑一致
 */
import Taro from '@tarojs/taro'
import CryptoJS from 'crypto-js'
import hostMap from '../mapFile/hostMap'
import config from '../commonFile/config'
import theme from '../commonFile/theme'
import type { ApiResponse } from '../typeFile/apiType'

// 是否开启请求日志
const OPEN_REQUEST_LOG = true
// 敏感数据加密秘钥
const ENCRYPT_KEY = 'bEZd3soOfZvFptks'
// 敏感数据加密向量
const ENCRYPT_IV = 'bEZd3soOfZvFptks'

// 获取请求加密串（与原生小程序保持一致）
const getRequestSignature = () => {
  const secret = 'sArMTldQ9tqU19XIRDMWz7BO5WaeBnrezA'
  const nonce = Math.floor(Math.random() * 1000000)
  const openId = 'QL6ZOftGzbziPlZwfiXM'
  const timestamp = Math.floor(Date.now() / 1000)
  const encryption = encodeURI(`nonce=${nonce}&openId=${openId}&timestamp=${timestamp}`)
  
  return {
    nonce,
    openId,
    timestamp,
    signature: CryptoJS.HmacSHA1(encryption, secret).toString(CryptoJS.enc.Base64)
  }
}

// 获取敏感数据加密串（与原生小程序保持一致）
export const getEncryptData = (data: any, iv: string | null = null): string => {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(ENCRYPT_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(iv || ENCRYPT_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString()
  } catch {
    return ''
  }
}

// 获取指定结构的请求数据
export const getRequestStructData = (data: Record<string, any> = {}) => {
  const channel = Taro.getStorageSync('channel') || 2
  const stallType = Taro.getStorageSync('stallType') || ''
  const storeInfo = Taro.getStorageSync('storeInfo') || {}
  const systemInfo = Taro.getStorageSync('systemInfo') || {}

  return {
    common: {
      platform: 'taro',
      version: hostMap.version,
      imei: '',
      osn: systemInfo.model || '',
      sv: systemInfo.system || '',
      lat: '',
      lng: '',
      lang: systemInfo.language || '',
      currency: storeInfo.countryCurrency || 'CNY',
      timeZone: '',
      ...getRequestSignature()
    },
    params: {
      businessType: config.businessType,
      brand: config.brand,
      tenantId: 1,
      channel: channel,
      stallType: stallType,
      storeId: storeInfo.storeId || '',
      storeType: storeInfo.storeType || '',
      cityId: storeInfo.cityId || '',
      appId: hostMap.appId,
      dAId: storeInfo.departAreaId || '',
      ...data
    }
  }
}

// 获取网络类型
const getNetworkType = () => {
  if (typeof Taro.getNetworkType !== 'function') return
  
  Taro.getNetworkType({
    success: res => {
      if ((res as any).networkType === 'none') {
        Taro.showModal({
          title: '温馨提示',
          content: '您当前网络环境不佳，请求失败',
          confirmColor: theme.$themeColor
        })
      }
    }
  })
}

// 打印请求日志
const consoleRequestLog = (
  consoleType: 'info' | 'error',
  url: string,
  data: any,
  consoleInfo: any
) => {
  if (!OPEN_REQUEST_LOG) return
  
  try {
    console.group && console.group('调用网络接口完成')
  } catch {}
  
  console[consoleType]('[请求地址]--------------------------------------------------\n', url)
  console[consoleType]('[请求数据]', getRequestStructData(data))
  console[consoleType]('[返回结果]', consoleInfo)
  
  try {
    console.groupEnd && console.groupEnd()
  } catch {}
}

// 主请求函数
const request = <T = any>(url: string, data: Record<string, any> = {}, cfg: Record<string, any> = {}): Promise<ApiResponse<T>> => {
  return new Promise<ApiResponse<T>>((resolve, reject) => {
    if (cfg.loading) {
      Taro.showLoading({ title: 'Loading...', mask: true })
    }
    
    const positionInfo = Taro.getStorageSync('positionInfo') || {}
    const requestData = getRequestStructData(data)
    const accessToken = Taro.getStorageSync('accessToken') || ''
    
    const header: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      storeId: requestData.params.storeId,
      iv: cfg.iv || ENCRYPT_IV
    }
    
    if (positionInfo.latitude && positionInfo.longitude) {
      header['lat2'] = getEncryptData(positionInfo.latitude, cfg.iv) || ''
      header['lng2'] = getEncryptData(positionInfo.longitude, cfg.iv) || ''
    }
    
    Taro.request({
      url,
      data: requestData,
      header,
      method: cfg.method || 'POST',
      dataType: cfg.dataType || 'json',
      responseType: cfg.responseType || 'text',
      timeout: Number(process.env.API_TIMEOUT) || 10000
    })
      .then(res => {
        if (cfg.loading) {
          Taro.hideLoading()
        }
        const statusCode = (res as any).statusCode
        const payload = (res as any).data
        
        if (statusCode === 200) {
          consoleRequestLog(
            payload?.code === 0 ? 'info' : 'error',
            url,
            data,
            payload || res
          )
          payload?.code === 0 ? resolve(payload) : reject(payload)
        } else {
          consoleRequestLog('error', url, data, res)
          reject(res)
        }
      })
      .catch(err => {
        if (cfg.loading) {
          Taro.hideLoading()
        }
        consoleRequestLog('error', url, data, err)
        getNetworkType()
        reject(err)
      })
  })
}

export default request
