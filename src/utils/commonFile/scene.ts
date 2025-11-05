/**
 * 与原生 scene 保持同名导出
 */
const scene = {
  parseScene(sceneStr: string): Record<string, string> {
    try {
      const pairs = sceneStr.split(',').map(s => s.split(':'))
      return pairs.reduce((acc, [k, v]) => {
        if (k) acc[k.trim()] = (v || '').trim()
        return acc
      }, {} as Record<string, string>)
    } catch {
      return {}
    }
  }
}

export default scene
