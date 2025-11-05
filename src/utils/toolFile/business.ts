/**
 * 与原生 business 保持同名导出
 */
const business = {
  checkPopupLimitAndSetTimes(data: any, page: string): boolean {
    return false
  },

  async silentLocateStore(): Promise<void> {
    return
  }
}

export default business
