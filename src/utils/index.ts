/**
 * 通用工具函数
 */

// 兼容原生小程序工具集合导出（保持文件名与命名一致）
export { default as apiMap } from './mapFile/apiMap'
export { default as hostMap } from './mapFile/hostMap'
export { default as pathMap } from './mapFile/pathMap'
export { default as refMap } from './mapFile/refMap'
export { default as routeMap } from './mapFile/routeMap'
export { default as scanMap } from './mapFile/scanMap'
export { default as behavior } from './behaviorFile/behavior'
export { default as check } from './toolFile/check'
export { default as Specs } from './toolFile/specs'
export { default as business } from './toolFile/business'
export { default as tools } from './toolFile/tools'
export { default as navigate } from './toolFile/navigate'
export { default as dataSync } from './dataFile/dataSync'
export { default as request } from './dataFile/request'
export { default as upload } from './dataFile/upload'
export { default as config } from './commonFile/config'
export { default as base64 } from './commonFile/base64'
export { default as scene } from './commonFile/scene'
export { default as theme } from './commonFile/theme'
export { default as sensors } from './toolFile/sensors'

/**
 * 延迟执行
 * @param ms 延迟毫秒数
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param wait 等待时间（毫秒）
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return function (this: any, ...args: Parameters<T>) {
    const context = this
    
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param wait 等待时间（毫秒）
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let lastTime = 0
  
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    
    if (now - lastTime >= wait) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 深拷贝
 * @param obj 要拷贝的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as any
  }
  
  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  
  return obj
}

/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式字符串，如 'YYYY-MM-DD HH:mm:ss'
 */
export const formatDate = (date: Date | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const d = typeof date === 'number' ? new Date(date) : date
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 生成唯一ID
 */
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 判断是否为空值
 */
export const isEmpty = (value: any): boolean => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 安全的 JSON 解析
 */
export const safeJSONParse = <T = any>(jsonString: string, defaultValue: T | null = null): T | null => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('JSON parse error:', error)
    return defaultValue
  }
}
