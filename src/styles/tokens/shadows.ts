/**
 * 阴影设计令牌 (Shadow Design Tokens)
 * 定义统一的阴影系统
 */

// ==================== 基础阴影 ====================
export const shadows = {
  /** 无阴影 */
  none: 'none',

  /** 最小阴影 - 轻微抬高 */
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',

  /** 小阴影 - 悬浮卡片 */
  sm: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',

  /** 中等阴影 - 下拉菜单 */
  base: '0 4px 8px 0 rgba(0, 0, 0, 0.12)',

  /** 中大阴影 - 弹出框 */
  md: '0 6px 12px 0 rgba(0, 0, 0, 0.15)',

  /** 大阴影 - 模态框 */
  lg: '0 8px 16px 0 rgba(0, 0, 0, 0.18)',

  /** 超大阴影 - 重要元素 */
  xl: '0 12px 24px 0 rgba(0, 0, 0, 0.20)',

  /** 极大阴影 - 最高层级 */
  xxl: '0 16px 32px 0 rgba(0, 0, 0, 0.25)',
}

// ==================== React Native 阴影 ====================
// RN 需要单独设置 shadowColor, shadowOffset, shadowOpacity, shadowRadius
export const rnShadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.20,
    shadowRadius: 24,
    elevation: 12,
  },
  xxl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
}

// ==================== 语义化阴影 ====================
export const semanticShadows = {
  card: shadows.sm,
  cardHover: shadows.base,
  button: shadows.xs,
  buttonHover: shadows.sm,
  modal: shadows.xl,
  dropdown: shadows.md,
  tooltip: shadows.base,
}

// ==================== 导出所有阴影 ====================
export default {
  shadows,
  rnShadows,
  semanticShadows,
}
