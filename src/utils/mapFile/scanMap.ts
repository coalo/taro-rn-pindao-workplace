/**
 * 与原生 scanMap 保持同名导出
 */
type ScanResult = { regStoreCode?: string, [k: string]: any }

const scanMap = {
  parse(code: string): ScanResult {
    try {
      const u = new URL(code, 'https://dummy.base/')
      const regStoreCode = u.searchParams.get('regStoreCode') || undefined
      return { regStoreCode }
    } catch {
      return {}
    }
  }
}

export default scanMap
