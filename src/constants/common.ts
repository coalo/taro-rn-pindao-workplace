/**
 * 通用业务常量定义
 */

// ==================== 路由相关 ====================
export const PAGE_PATHS = {
  WORK: '/pages/work/index',
  TASK: '/pages/task/index',
  DEMO: '/pages/demo/index',
  MINE: '/pages/mine/index',
}

// TabBar 配置
export const TAB_BAR_LIST = [
  {
    pagePath: 'pages/work/index',
    text: '工作',
    icon: '💼',
  },
  {
    pagePath: 'pages/task/index',
    text: '任务中心',
    icon: '✅',
  },
  {
    pagePath: 'pages/demo/index',
    text: '组件演示',
    icon: '🎲',
  },
  {
    pagePath: 'pages/mine/index',
    text: '我的',
    icon: '👤',
  },
]

// ==================== 存储相关 ====================
export const STORAGE_KEYS = {
  USER_INFO: 'userInfo',
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  LANGUAGE: 'language',
  SETTINGS: 'settings',
}

// ==================== 用户相关 ====================
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
}

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned',
}

// ==================== 应用配置 ====================
export const APP_CONFIG = {
  APP_NAME: 'Taro RN App',
  VERSION: '1.0.0',
  AUTHOR: 'Your Team',
}

// 默认分页配置
export const PAGINATION = {
  PAGE_SIZE: 10,
  INITIAL_PAGE: 1,
  MAX_PAGE_SIZE: 100,
}

// 语言选项
export const LANGUAGES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
}

// 主题选项
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
}
