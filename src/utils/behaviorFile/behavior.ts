/**
 * 页面级 Behavior 统一导出
 * 从原生小程序 Behavior 迁移，聚合所有行为模块
 */

import menuBehavior from './menuBehavior'
import productBehavior from './productBehavior'

const behavior = {
  menuBehavior,
  productBehavior
}

export default behavior
