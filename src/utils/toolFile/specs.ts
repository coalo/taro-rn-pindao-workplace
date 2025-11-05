import Taro from '@tarojs/taro'

/**
 * 规格与加料互斥展示逻辑计算类 - 与原生 Specs 保持同名导出
 */
class Specs {
  specInfoHash: Record<string, any> = {}
  acceRuleHash: Record<string, boolean> = {}
  attrRuleHash: Record<string, boolean> = {}
  selectSpecPath: (string | undefined)[] = []
  selectSpecInfo: any = {}
  selectAcceInfo: any[] = []
  selectAttrInfo: any[] = []

  constructor() {
    this.specInfoHash = {}
    this.acceRuleHash = {}
    this.attrRuleHash = {}
    this.selectSpecPath = []
    this.selectSpecInfo = {}
    this.selectAcceInfo = []
    this.selectAttrInfo = []
  }

  /**
   * 初始化商品数据生成基础结构
   */
  _initProductBaseStruct(product: any): any {
    const specColHash: Record<string, number> = {}
    let allAttrList: string[] = []
    let allAcceList: string[] = product.accessories ? product.accessories.map((t: any) => t.skuCode) : []
    this.specInfoHash = {}
    this.acceRuleHash = {}
    this.attrRuleHash = {}
    this.selectAcceInfo = []
    this.selectAttrInfo = []
    this.selectSpecPath = Array.from({ length: (product.spuAttrs && product.spuAttrs.length) || 0 })
    const { attrTipList = [] } = product
    
    product.spuAttrs && product.spuAttrs.forEach((spec: any, n: number) => spec.values.forEach((item: any, m: number) => {
      specColHash[item.code] = n
      product.spuAttrs[n].values[m].selected = item.checked
      // 查找规格提示index
      const tipIndex = attrTipList.findIndex((attr: any) => attr.groupName === spec.attrName && attr.name === item.value)
      if (tipIndex !== -1) {
        product.spuAttrs[n].values[m].tip = attrTipList[tipIndex].tips
      }
      if (spec.type === 1) {
        item.checked && (this.selectSpecPath[n] = item.code)
      } else if (spec.type === 2) {
        item.checked && this.selectAcceInfo.push({
          type: 2,
          tagCode: item.tagCode,
          code: item.code,
          name: item.value,
          discountPrice: item.discountPrice || 0,
          originalPrice: item.originalPrice || 0
        })
        allAcceList.push(item.code)
      } else if (spec.type === 4) {
        item.checked && this.selectAttrInfo.push({
          attrCode: spec.attrCode,
          code: item.code,
          name: item.value,
          discountPrice: item.discountPrice || 0,
          originalPrice: item.originalPrice || 0
        })
        allAttrList.push(item.code)
      }
    }))
    
    product.skuInfos && product.skuInfos.forEach((info: any) => {
      const specPath: (string | undefined)[] = Array.from({ length: (product.spuAttrs && product.spuAttrs.length) || 0 })
      info.specs && info.specs.forEach((specs: any) => (specPath[specColHash[specs.code]] = specs.code))
      this.specInfoHash[specPath.join('^^')] = info
    })
    
    product.constraintRules && product.constraintRules.forEach((rule: any) => {
      if (rule.type === 0) {
        const values = JSON.parse(JSON.stringify(rule.values))
        const acceIndex = values.findIndex((item: string) => allAcceList.findIndex(t => t === item) !== -1)
        const acce = values.splice(acceIndex, 1)[0]
        values.forEach((sku: string) => (this.acceRuleHash[`${sku}-${acce}`] = true))
      } else if (rule.type === 1) {
        this.acceRuleHash[`${rule.values[0]}-${rule.values[1]}`] = true
        this.acceRuleHash[`${rule.values[1]}-${rule.values[0]}`] = true
      } else if (rule.type === 3) {
        const values = JSON.parse(JSON.stringify(rule.values))
        const attrIndex = values.findIndex((item: string) => allAttrList.findIndex(t => t === item) !== -1)
        const attr = values.splice(attrIndex, 1)[0]
        values.forEach((sku: string) => (this.attrRuleHash[`${sku}-${attr}`] = true))
      } else if (rule.type === 4) {
        const values = JSON.parse(JSON.stringify(rule.values))
        const acceIndex = values.findIndex((item: string) => allAcceList.findIndex(t => t === item) !== -1)
        this.acceRuleHash[`${values[1 - acceIndex]}-${values[acceIndex]}`] = true
        this.attrRuleHash[`${values[acceIndex]}-${values[1 - acceIndex]}`] = true
      } else if (rule.type === 5) {
        this.attrRuleHash[`${rule.values[0]}-${rule.values[1]}`] = true
        this.attrRuleHash[`${rule.values[1]}-${rule.values[0]}`] = true
      }
    })

    this.selectSpecInfo = this.specInfoHash[this.selectSpecPath.join('^^')] || {}
    return product
  }

  /**
   * 计算商品选中与禁用状态
   */
  _calcProductSpecShow(product: any): any {
    product.spuAttrs && product.spuAttrs.forEach((spec: any, n: number) => spec.values.forEach((item: any, m: number) => {
      if (spec.type === 1) {
        product.spuAttrs[n].values[m].selected = this.selectSpecPath[n] === item.code
        if (product.spuAttrs[n].values[m].selected) return
        const currentPath = JSON.parse(JSON.stringify(this.selectSpecPath))
        currentPath[n] = item.code
        const currentInfo = this.specInfoHash[currentPath.join('^^')]
        const acceToSpecRule = currentInfo && this.selectAcceInfo.some(t => this.acceRuleHash[`${currentInfo.skuCode}-${t.code}`])
        const attrToSpecRule = currentInfo && this.selectAttrInfo.some(t => this.attrRuleHash[`${currentInfo.skuCode}-${t.code}`])
        product.spuAttrs[n].values[m].disable = !currentInfo || acceToSpecRule || attrToSpecRule
      } else if (spec.type === 2) {
        product.spuAttrs[n].values[m].selected = this.selectAcceInfo.some(t => t.code === item.code)
        if (product.spuAttrs[n].values[m].selected) return
        const specToAcceRule = this.acceRuleHash[`${this.selectSpecInfo.skuCode}-${item.code}`]
        const attrToAcceRule = this.selectAttrInfo.some(t => this.acceRuleHash[`${t.code}-${item.code}`])
        const acceToAcceRule = this.selectAcceInfo.some(t => this.acceRuleHash[`${t.code}-${item.code}`])
        product.spuAttrs[n].values[m].disable = specToAcceRule || attrToAcceRule || acceToAcceRule
      } else if (spec.type === 4) {
        product.spuAttrs[n].values[m].selected = this.selectAttrInfo.some(t => t.code === item.code)
        if (product.spuAttrs[n].values[m].selected) return
        const specToAttrRule = this.attrRuleHash[`${this.selectSpecInfo.skuCode}-${item.code}`]
        const acceToAttrRule = this.selectAcceInfo.some(t => this.acceRuleHash[`${item.code}-${t.code}`])
        const attrToAttrRule = this.selectAttrInfo.some(t => this.attrRuleHash[`${t.code}-${item.code}`])
        product.spuAttrs[n].values[m].disable = specToAttrRule || acceToAttrRule || attrToAttrRule
      }
    }))
    
    product.accessories && product.accessories.forEach((acce: any, n: number) => {
      product.accessories[n].selected = this.selectAcceInfo.some(t => t.code === acce.skuCode)
      if (acce.selected) return
      const specToAcceRule = this.acceRuleHash[`${this.selectSpecInfo.skuCode}-${acce.skuCode}`]
      const attrToAcceRule = this.selectAttrInfo.some(t => this.acceRuleHash[`${t.code}-${acce.skuCode}`])
      const acceToAcceRule = this.selectAcceInfo.some(t => this.acceRuleHash[`${t.code}-${acce.skuCode}`])
      product.accessories[n].disable = specToAcceRule || attrToAcceRule || acceToAcceRule
    })
    
    return product
  }

  /**
   * 初始化规格与加料默认状态数据
   */
  initSpecDefaultData(product: any): any {
    return this._calcProductSpecShow(this._initProductBaseStruct(product))
  }

  /**
   * 初始化规格与加料预置状态数据
   */
  initSpecPresetData(product: any, selectSpecInfo: any, selectAcceInfo: any[], selectAttrInfo: any[]): any {
    product = this._initProductBaseStruct(product)
    this.selectSpecInfo = selectSpecInfo
    this.selectAcceInfo = selectAcceInfo
    this.selectAttrInfo = selectAttrInfo
    product.spuAttrs && product.spuAttrs.forEach((spec: any, n: number) => spec.type === 1 && spec.values.forEach((item: any) => {
      this.selectSpecInfo.specs && this.selectSpecInfo.specs.some((t: any) => t.code === item.code) && (this.selectSpecPath[n] = item.code)
    }))
    return this._calcProductSpecShow(product)
  }

  /**
   * 点击规格后商品展示数据
   */
  afterSpecClickProduct(product: any, current: any, line: number): any {
    if (product.spuAttrs[line].type === 1) {
      this.selectSpecPath[line] = current.code
      this.selectSpecInfo = this.specInfoHash[this.selectSpecPath.join('^^')]
    } else if (product.spuAttrs[line].type === 2) {
      const index = this.selectAcceInfo.findIndex(acce => product.spuAttrs[line].values.some((t: any) => t.code === acce.code))
      index !== -1 && this.selectAcceInfo.splice(index, 1)
      this.selectAcceInfo.push({
        type: 2,
        tagCode: current.tagCode,
        code: current.code,
        name: current.value,
        discountPrice: current.discountPrice || 0,
        originalPrice: current.originalPrice || 0
      })
    } else if (product.spuAttrs[line].type === 4) {
      const index = this.selectAttrInfo.findIndex(attr => product.spuAttrs[line].values.some((t: any) => t.code === attr.code))
      index !== -1 && this.selectAttrInfo.splice(index, 1)
      this.selectAttrInfo.push({
        attrCode: product.spuAttrs[line].attrCode,
        code: current.code,
        name: current.value,
        discountPrice: current.discountPrice || 0,
        originalPrice: current.originalPrice || 0
      })
    }
    return this._calcProductSpecShow(product)
  }

  /**
   * 点击加料后商品展示数据
   */
  afterAcceClickProduct(product: any, current: any, index: number): any {
    const acceInfo = product.accessories[index]
    acceInfo.selected
      ? this.selectAcceInfo.splice(this.selectAcceInfo.findIndex(t => t.code === current.skuCode), 1)
      : this.selectAcceInfo.push({
          type: 0,
          tagCode: acceInfo.tagCode,
          code: acceInfo.skuCode,
          name: acceInfo.name,
          discountPrice: acceInfo.discountPrice || 0,
          originalPrice: acceInfo.originalPrice || 0
        })
    return this._calcProductSpecShow(product)
  }

  /**
   * 将购物车数据转换成预置数据
   */
  transformCartToPreset(product: any, skuCode: string, accessorieList: any[], spuAttrCodes: any[]): any {
    const specInfo: any = {}
    specInfo.selectSpecInfo = (product.skuInfos && product.skuInfos.find((t: any) => t.skuCode === skuCode)) || {}
    if (!(specInfo.selectSpecInfo && specInfo.selectSpecInfo.skuCode)) {
      specInfo.selectSpecInfo = (product.skuInfos && product.skuInfos.find((t: any) => product.skuCode === t.skuCode)) || {}
    }
    specInfo.selectAcceInfo = []
    specInfo.selectAttrInfo = []
    
    product.spuAttrs && product.spuAttrs.forEach((spec: any) => spec.values.forEach((item: any) => {
      if (spec.type === 2) {
        accessorieList && accessorieList.forEach(t => t.code === item.code && specInfo.selectAcceInfo.push({
          type: 2,
          tagCode: item.tagCode,
          code: item.code,
          name: item.value,
          discountPrice: item.discountPrice || 0,
          originalPrice: item.originalPrice || 0
        }))
      } else if (spec.type === 4) {
        spuAttrCodes && spuAttrCodes.forEach(t => t.code === item.code && specInfo.selectAttrInfo.push({
          attrCode: spec.attrCode,
          code: item.code,
          name: item.value,
          discountPrice: item.discountPrice || 0,
          originalPrice: item.originalPrice || 0
        }))
      }
    }))
    
    product.accessories && product.accessories.forEach((item: any) => {
      accessorieList && accessorieList.forEach(t => t.code === item.skuCode && specInfo.selectAcceInfo.push({
        type: 0,
        tagCode: item.tagCode,
        code: item.skuCode,
        name: item.name,
        discountPrice: item.discountPrice || 0,
        originalPrice: item.originalPrice || 0
      }))
    })
    
    return specInfo
  }

  /**
   * 规格禁选原因提示
   */
  specDisableToast(product: any, code: string): void {
    const constraint = product.constraint
    if (constraint.jointCodes) {
      for (const item of constraint.jointCodes) {
        for (const index in item) {
          if (item[index] === code && this._isSpecCodeSelected(product, item[1 - Number(index)])) {
            const currentName = this._getSpecNameForCode(product, item[index])
            const targetName = this._getSpecNameForCode(product, item[1 - Number(index)])
            Taro.showToast({
              icon: 'none',
              title: `${currentName}${targetName ? '、' : ''}${targetName || ''} 已用完`,
              duration: 2000
            })
            return
          }
        }
      }
    }
    if (constraint.mutexRules) {
      for (const item of constraint.mutexRules) {
        for (const index in item) {
          if (item[index] === code && this._isSpecCodeSelected(product, item[1 - Number(index)])) {
            const currentName = this._getSpecNameForCode(product, item[index])
            const targetName = this._getSpecNameForCode(product, item[1 - Number(index)])
            Taro.showToast({
              icon: 'none',
              title: `已选【${targetName}】，不能选【${currentName}】`
            })
            return
          }
        }
      }
    }
    if (constraint.sellOutCodes) {
      for (const item of constraint.sellOutCodes) {
        if (item === code) {
          const currentName = this._getSpecNameForCode(product, item)
          Taro.showToast({
            icon: 'none',
            title: `【${currentName}】已售罄`
          })
          return
        }
      }
    }
  }

  /**
   * 判断当前code是否是已选中状态
   */
  _isSpecCodeSelected(product: any, code: string): boolean {
    const { selectSpecPath, selectAcceInfo, selectAttrInfo } = this
    if (selectSpecPath.length) {
      for (const spec of selectSpecPath) {
        if (spec === code) return true
      }
    }
    if (selectAcceInfo.length) {
      for (const acce of selectAcceInfo) {
        if (acce.tagCode === code) return true
      }
    }
    if (selectAttrInfo.length) {
      for (const attr of selectAttrInfo) {
        if (attr.code === code) return true
      }
    }
    return false
  }

  /**
   * 通过code获取指定规格选项
   */
  _getSpecNameForCode(product: any, code: string): string | undefined {
    const { spuAttrs, accessories } = product
    if (!spuAttrs) return
    for (const spec of spuAttrs) {
      for (const item of spec.values) {
        if (item.code === code) return item.value
      }
    }
    if (!accessories) return
    for (const acce of accessories) {
      if (acce.tagCode === code) return acce.name
    }
  }
}

export default Specs
