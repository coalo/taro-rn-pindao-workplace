/**
 * 与原生 sensors 保持同名导出
 */
const sensors = {
  track(event: string, data?: any) {
    // console.log('[Sensors.track]', event, data)
  },
  
  settingOrderForm() {
    // console.log('[Sensors.settingOrderForm]')
  },
  
  modules: {
    Exposure: {
      addObserverByClassName(className: string, options: any) {
        // console.log('[Sensors.Exposure]', className, options)
      }
    }
  }
}

export default sensors
