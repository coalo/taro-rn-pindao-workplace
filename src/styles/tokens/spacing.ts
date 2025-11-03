/**
 * 间距设计令牌 (Spacing Design Tokens)
 * 定义统一的间距系统，基于 4px 网格
 */

// ==================== 基础间距 ====================
export const spacing = {
  /** 0px */
  none: 0,
  /** 2px - 最小间距 */
  xxs: 2,
  /** 4px - 超小间距 */
  xs: 4,
  /** 8px - 小间距 */
  sm: 8,
  /** 12px - 中小间距 */
  md: 12,
  /** 16px - 中等间距（基准） */
  base: 16,
  /** 20px - 中大间距 */
  lg: 20,
  /** 24px - 大间距 */
  xl: 24,
  /** 32px - 超大间距 */
  xxl: 32,
  /** 40px - 极大间距 */
  xxxl: 40,
  /** 48px - 超级大间距 */
  xxxxl: 48,
}

// ==================== 语义化间距 ====================
export const semanticSpacing = {
  // 页面间距
  pageHorizontal: spacing.base,
  pageVertical: spacing.xl,

  // 卡片间距
  cardPadding: spacing.base,
  cardMargin: spacing.md,
  cardGap: spacing.md,

  // 列表间距
  listItemPadding: spacing.base,
  listItemGap: spacing.sm,

  // 表单间距
  formItemGap: spacing.lg,
  formLabelGap: spacing.sm,

  // 按钮间距
  buttonPaddingHorizontal: spacing.base,
  buttonPaddingVertical: spacing.sm,
  buttonGap: spacing.md,

  // 输入框间距
  inputPaddingHorizontal: spacing.md,
  inputPaddingVertical: spacing.sm,

  // 图标间距
  iconGap: spacing.xs,

  // 分组间距
  sectionGap: spacing.xl,
  groupGap: spacing.lg,
}

// ==================== 导出所有间距 ====================
export default {
  spacing,
  semanticSpacing,
}
