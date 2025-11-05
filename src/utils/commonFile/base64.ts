/**
 * Base64 编解码工具
 * 从原生小程序迁移，兼容多端环境
 */

const base64 = {
  /**
   * Base64 编码
   */
  encode(input: string): string {
    // 判断环境，优先使用 Node.js Buffer
    if (typeof globalThis !== 'undefined' && typeof (globalThis as any).Buffer !== 'undefined') {
      return (globalThis as any).Buffer.from(input, 'utf-8').toString('base64')
    }
    
    // 浏览器环境使用 btoa
    if (typeof btoa !== 'undefined') {
      return btoa(unescape(encodeURIComponent(input)))
    }
    
    // 其他环境的备用方案
    console.warn('[base64] No encoding method available')
    return input
  },

  /**
   * Base64 解码
   */
  decode(input: string): string {
    // 判断环境，优先使用 Node.js Buffer
    if (typeof globalThis !== 'undefined' && typeof (globalThis as any).Buffer !== 'undefined') {
      return (globalThis as any).Buffer.from(input, 'base64').toString('utf-8')
    }
    
    // 浏览器环境使用 atob
    if (typeof atob !== 'undefined') {
      return decodeURIComponent(escape(atob(input)))
    }
    
    // 其他环境的备用方案
    console.warn('[base64] No decoding method available')
    return input
  }
}

export default base64
