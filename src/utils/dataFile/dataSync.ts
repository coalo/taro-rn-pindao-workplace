/**
 * 与原生 dataSync 保持同名导出
 */
const dataSync = {
  async updateChannel(channel: number): Promise<void> {
    // 在此持久化渠道选择；最小实现为空
    return
  }
}

export default dataSync
