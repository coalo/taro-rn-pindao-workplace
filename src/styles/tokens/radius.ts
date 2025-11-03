/**
 * 圆角设计令牌 (Border Radius Design Tokens)
 * 定义统一的圆角系统
 */

// ==================== 基础圆角 ====================
export const radius = {
  /** 0px - 无圆角 */
  none: 0,
  /** 2px - 最小圆角 */
  xs: 2,
  /** 4px - 小圆角 */
  sm: 4,
  /** 8px - 中等圆角（基准） */
  base: 8,
  /** 12px - 中大圆角 */
  md: 12,
  /** 16px - 大圆角 */
  lg: 16,
  /** 20px - 超大圆角 */
  xl: 20,
  /** 24px - 极大圆角 */
  xxl: 24,
  /** 999px - 完全圆角 */
  full: 999,
  /** 50% - 圆形 */
  circle: '50%',
}

// ==================== 语义化圆角 ====================
export const semanticRadius = {
  // 卡片
  card: radius.base,
  cardLarge: radius.lg,

  // 按钮
  button: radius.sm,
  buttonRound: radius.full,

  // 输入框
  input: radius.sm,

  // 标签
  tag: radius.xs,
  tagRound: radius.full,

  // 头像
  avatar: radius.circle,
  avatarSquare: radius.base,

  // 模态框
  modal: radius.lg,

  // 图片
  image: radius.base,
}

// ==================== 导出所有圆角 ====================
export default {
  radius,
  semanticRadius,
}
