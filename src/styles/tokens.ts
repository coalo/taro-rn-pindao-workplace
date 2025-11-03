/**
 * 设计 Tokens
 * 用于 React Native StyleSheet
 * 与 variables.scss 保持一致
 */

// ==================== 颜色系统 ====================
export const colors = {
  // 主色
  primary: '#1677ff',
  primaryLight: '#4096ff',
  primaryDark: '#0958d9',

  // 功能色
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1677ff',

  // 文本色
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textDisabled: '#cccccc',

  // 背景色
  bg: '#ffffff',
  bgSecondary: '#f5f5f5',
  bgTertiary: '#fafafa',

  // 边框色
  border: '#e5e5e5',
  borderLight: '#f0f0f0',
  divider: '#e8e8e8',

  // 透明度
  mask: 'rgba(0, 0, 0, 0.45)',
  overlay: 'rgba(0, 0, 0, 0.65)',

  // 白色和黑色
  white: '#ffffff',
  black: '#000000',
}

// ==================== 间距系统 ====================
export const spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
}

// ==================== 字体系统 ====================
export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
}

export const fontWeight = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
}

export const lineHeight = {
  tight: 1.2,
  base: 1.5,
  loose: 1.8,
}

// ==================== 圆角 ====================
export const borderRadius = {
  xs: 2,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  circle: 999, // 用于圆形
}

// ==================== 边框宽度 ====================
export const borderWidth = {
  base: 1,
  thick: 2,
}

// ==================== 阴影（仅 iOS）====================
export const shadow = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
}

// ==================== 阴影（Android elevation）====================
export const elevation = {
  xs: 1,
  sm: 2,
  base: 3,
  md: 4,
  lg: 6,
  xl: 8,
}

// ==================== 尺寸 ====================
export const size = {
  headerHeight: 44,
  tabbarHeight: 50,
  buttonHeightSm: 32,
  buttonHeightBase: 40,
  buttonHeightLg: 48,
}

// ==================== 动画时长 ====================
export const duration = {
  fast: 200,
  base: 300,
  slow: 500,
}

// ==================== Z-Index ====================
export const zIndex = {
  base: 0,
  dropdown: 1000,
  modal: 1050,
  toast: 1100,
  loading: 1150,
}

// ==================== 通用样式组合 ====================
export const commonStyles = {
  // Flex 居中
  flexCenter: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  // Flex 垂直居中
  flexAlignCenter: {
    display: 'flex' as const,
    alignItems: 'center' as const,
  },

  // Flex 两端对齐
  flexBetween: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },

  // Flex 列布局
  flexColumn: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
  },

  // 卡片样式
  card: {
    backgroundColor: colors.bg,
    borderRadius: borderRadius.base,
    padding: spacing.md,
    ...shadow.base,
    elevation: elevation.base,
  },

  // 分割线
  divider: {
    height: borderWidth.base,
    backgroundColor: colors.divider,
  },

  // 文本省略（需配合 numberOfLines 使用）
  textEllipsis: {
    overflow: 'hidden' as const,
  },
}

// ==================== 工具函数 ====================

/**
 * 获取带阴影的样式（跨平台）
 * @param level 阴影级别
 */
export function getShadowStyle(level: keyof typeof shadow = 'base') {
  return {
    ...shadow[level],
    elevation: elevation[level],
  }
}

/**
 * 创建正方形样式
 * @param size 尺寸
 */
export function createSquare(size: number) {
  return {
    width: size,
    height: size,
  }
}

/**
 * 创建圆形样式
 * @param size 尺寸
 */
export function createCircle(size: number) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  }
}

/**
 * 创建渐变背景占位（RN需要使用LinearGradient组件）
 * @param startColor 起始颜色
 * @param endColor 结束颜色
 */
export function createGradientColors(startColor: string, endColor: string) {
  return {
    colors: [startColor, endColor],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  }
}

// ==================== 导出所有 tokens ====================
export default {
  colors,
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  borderWidth,
  shadow,
  elevation,
  size,
  duration,
  zIndex,
  commonStyles,
  getShadowStyle,
  createSquare,
  createCircle,
  createGradientColors,
}
