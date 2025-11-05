/**
 * 与原生 base64 保持同名导出
 */
const base64 = {
  encode(input: string): string {
    if (typeof window === 'undefined' && typeof Buffer !== 'undefined') {
      return Buffer.from(input, 'utf-8').toString('base64')
    }
    return btoa(unescape(encodeURIComponent(input)))
  },
  
  decode(input: string): string {
    if (typeof window === 'undefined' && typeof Buffer !== 'undefined') {
      return Buffer.from(input, 'base64').toString('utf-8')
    }
    return decodeURIComponent(escape(atob(input)))
  }
}

export default base64
