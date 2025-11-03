/**
 * 颜色设计令牌 (Color Design Tokens)
 * 定义项目的颜色系统，保证设计一致性
 */

// ==================== 基础色板 ====================
export const palette = {
  // 蓝色系
  blue50: '#e6f7ff',
  blue100: '#bae7ff',
  blue200: '#91d5ff',
  blue300: '#69c0ff',
  blue400: '#40a9ff',
  blue500: '#1890ff',
  blue600: '#1677ff',
  blue700: '#0958d9',
  blue800: '#003eb3',
  blue900: '#002c8c',

  // 绿色系
  green50: '#f6ffed',
  green100: '#d9f7be',
  green200: '#b7eb8f',
  green300: '#95de64',
  green400: '#73d13d',
  green500: '#52c41a',
  green600: '#389e0d',
  green700: '#237804',
  green800: '#135200',
  green900: '#092b00',

  // 红色系
  red50: '#fff1f0',
  red100: '#ffccc7',
  red200: '#ffa39e',
  red300: '#ff7875',
  red400: '#ff4d4f',
  red500: '#f5222d',
  red600: '#cf1322',
  red700: '#a8071a',
  red800: '#820014',
  red900: '#5c0011',

  // 橙色系
  orange50: '#fff7e6',
  orange100: '#ffe7ba',
  orange200: '#ffd591',
  orange300: '#ffc069',
  orange400: '#ffa940',
  orange500: '#fa8c16',
  orange600: '#faad14',
  orange700: '#d48806',
  orange800: '#ad6800',
  orange900: '#874d00',

  // 中性色
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#d9d9d9',
  gray400: '#bfbfbf',
  gray500: '#999999',
  gray600: '#666666',
  gray700: '#333333',
  gray800: '#222222',
  gray900: '#000000',

  // 纯色
  white: '#ffffff',
  black: '#000000',
}

// ==================== 语义化颜色 ====================
export const colors = {
  // 主题色
  primary: palette.blue600,
  primaryLight: palette.blue400,
  primaryDark: palette.blue700,

  // 成功
  success: palette.green500,
  successLight: palette.green400,
  successDark: palette.green600,

  // 警告
  warning: palette.orange600,
  warningLight: palette.orange500,
  warningDark: palette.orange700,

  // 错误
  error: palette.red400,
  errorLight: palette.red300,
  errorDark: palette.red500,

  // 信息
  info: palette.blue500,
  infoLight: palette.blue400,
  infoDark: palette.blue600,

  // 文字颜色
  textPrimary: palette.gray700,
  textSecondary: palette.gray600,
  textTertiary: palette.gray500,
  textDisabled: palette.gray400,
  textInverse: palette.white,

  // 背景色
  bgPage: palette.gray100,
  bgCard: palette.white,
  bgDisabled: palette.gray100,
  bgHover: palette.gray50,
  bgMask: 'rgba(0, 0, 0, 0.5)',

  // 边框色
  borderLight: palette.gray200,
  borderMedium: palette.gray300,
  borderDark: palette.gray500,

  // TabBar 颜色
  tabBarNormal: palette.gray500,
  tabBarSelected: palette.blue600,
  tabBarBackground: palette.white,
}

// ==================== 透明度变体 ====================
export const alpha = {
  // 主题色透明度
  primaryAlpha10: 'rgba(22, 119, 255, 0.1)',
  primaryAlpha20: 'rgba(22, 119, 255, 0.2)',
  primaryAlpha50: 'rgba(22, 119, 255, 0.5)',

  // 黑色透明度
  blackAlpha10: 'rgba(0, 0, 0, 0.1)',
  blackAlpha20: 'rgba(0, 0, 0, 0.2)',
  blackAlpha30: 'rgba(0, 0, 0, 0.3)',
  blackAlpha50: 'rgba(0, 0, 0, 0.5)',
  blackAlpha70: 'rgba(0, 0, 0, 0.7)',

  // 白色透明度
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
  whiteAlpha70: 'rgba(255, 255, 255, 0.7)',
  whiteAlpha90: 'rgba(255, 255, 255, 0.9)',
}

// ==================== 导出所有颜色 ====================
export default {
  palette,
  colors,
  alpha,
}
