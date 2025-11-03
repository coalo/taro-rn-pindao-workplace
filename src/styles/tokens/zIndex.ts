/**
 * 层级设计令牌 (Z-Index Design Tokens)
 * 定义统一的层级系统，避免层级冲突
 */

// ==================== 基础层级 ====================
export const zIndex = {
  /** -1 - 最底层 */
  hide: -1,

  /** 0 - 正常层 */
  base: 0,

  /** 1 - 微抬高 */
  raised: 1,

  /** 10 - 下拉菜单 */
  dropdown: 10,

  /** 100 - 粘性元素（sticky） */
  sticky: 100,

  /** 500 - 固定元素（fixed） */
  fixed: 500,

  /** 1000 - 导航栏 */
  navbar: 1000,

  /** 1100 - TabBar */
  tabbar: 1100,

  /** 1200 - 侧边栏 */
  sidebar: 1200,

  /** 1300 - 弹出框 */
  popover: 1300,

  /** 1400 - 模态框 */
  modal: 1400,

  /** 1500 - 抽屉 */
  drawer: 1500,

  /** 1600 - 通知/提示 */
  notification: 1600,

  /** 1700 - Toast */
  toast: 1700,

  /** 1800 - Loading */
  loading: 1800,

  /** 9999 - 最顶层 */
  max: 9999,
}

// ==================== 导出所有层级 ====================
export default {
  zIndex,
}
