/**
 * 与原生 Specs 保持同名导出
 */
class Specs {
  static isValidPhone(phone: string): boolean {
    return /^1[3-9]\d{9}$/.test(phone)
  }
  
  static isValidIdCard(id: string): boolean {
    return /^[0-9]{15}$|^[0-9]{17}[0-9Xx]$/.test(id)
  }
  
  static maxLength(str: string, len: number): boolean {
    return (str || '').length <= len
  }
}

export default Specs
