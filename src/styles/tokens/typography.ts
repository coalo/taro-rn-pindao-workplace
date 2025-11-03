/**
 * 字体设计令牌 (Typography Design Tokens)
 * 定义统一的字体系统
 */

// ==================== 字体大小 ====================
export const fontSize = {
  /** 10px - 最小字体 */
  xs: 10,
  /** 12px - 超小字体 */
  sm: 12,
  /** 14px - 小字体 */
  base: 14,
  /** 16px - 中等字体（基准） */
  md: 16,
  /** 18px - 中大字体 */
  lg: 18,
  /** 20px - 大字体 */
  xl: 20,
  /** 24px - 超大字体 */
  xxl: 24,
  /** 28px - 特大字体 */
  xxxl: 28,
  /** 32px - 极大字体 */
  xxxxl: 32,
}

// ==================== 字体粗细 ====================
export const fontWeight = {
  /** 300 - 细体 */
  light: '300' as const,
  /** 400 - 常规 */
  regular: '400' as const,
  /** 500 - 中等 */
  medium: '500' as const,
  /** 600 - 半粗 */
  semibold: '600' as const,
  /** 700 - 粗体 */
  bold: '700' as const,
}

// ==================== 行高 ====================
export const lineHeight = {
  /** 1.0 - 紧凑 */
  tight: 1.0,
  /** 1.2 - 较紧凑 */
  snug: 1.2,
  /** 1.5 - 正常 */
  normal: 1.5,
  /** 1.75 - 宽松 */
  relaxed: 1.75,
  /** 2.0 - 很宽松 */
  loose: 2.0,
}

// ==================== 字体家族 ====================
export const fontFamily = {
  /** 系统默认字体 */
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  /** 等宽字体 */
  mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

// ==================== 语义化字体样式 ====================
export const typography = {
  // 标题
  h1: {
    fontSize: fontSize.xxxxl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  },
  h2: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  },
  h3: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
  },
  h5: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  h6: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },

  // 正文
  bodyLarge: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },

  // 标签
  label: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  labelSmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },

  // 说明文字
  caption: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
  },

  // 按钮
  button: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
  },
  buttonSmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.tight,
  },
}

// ==================== 导出所有字体 ====================
export default {
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  typography,
}
