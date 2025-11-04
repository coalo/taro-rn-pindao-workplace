/**
 * 原子类配置中心
 * 统一管理所有原子类的定义和映射
 * - RN 端：映射到 tokens（JS 对象）
 * - H5/小程序端：映射到 SCSS 类名
 */

import { spacing, semanticSpacing } from './tokens/spacing'
import { radius, semanticRadius } from './tokens/radius'
import { colors } from './tokens/colors'

const isRN = process.env.TARO_ENV === 'rn'

// ==================== 间距原子类映射 ====================

/** 间距语义映射 */
export const spacingClassMap: Record<string, number> = {
  // 基础间距
  'none': spacing.none,
  'xxs': spacing.xxs,
  'xs': spacing.xs,
  'sm': spacing.sm,
  'md': spacing.md,
  'base': spacing.base,
  'lg': spacing.lg,
  'xl': spacing.xl,
  'xxl': spacing.xxl,
  'xxxl': spacing.xxxl,
  'xxxxl': spacing.xxxxl,
}

// ==================== 圆角原子类映射 ====================

/** 圆角语义映射 */
export const radiusClassMap: Record<string, number | string> = {
  'none': radius.none,
  'xs': radius.xs,
  'sm': radius.sm,
  'base': radius.base,
  'md': radius.md,
  'lg': radius.lg,
  'xl': radius.xl,
  'xxl': radius.xxl,
  'full': radius.full,
  'circle': radius.circle,
}

// ==================== 颜色原子类映射 ====================

/** 文本颜色映射 */
export const textColorClassMap: Record<string, string> = {
  'primary': colors.textPrimary,
  'secondary': colors.textSecondary,
  'tertiary': colors.textTertiary,
  'disabled': colors.textDisabled,
  'inverse': colors.textInverse,
  'brand': colors.primary,
  'success': colors.success,
  'warning': colors.warning,
  'error': colors.error,
  'info': colors.info,
}

/** 背景色映射 */
export const bgColorClassMap: Record<string, string> = {
  'page': colors.bgPage,
  'card': colors.bgCard,
  'disabled': colors.bgDisabled,
  'hover': colors.bgHover,
  'primary': colors.primary,
  'success': colors.success,
  'warning': colors.warning,
  'error': colors.error,
}

// ==================== 原子类解析函数 ====================

/**
 * 将 className 原子类转换为 RN 样式对象或返回 className
 * @param className 原子类字符串
 * @returns RN 环境返回样式对象，其他环境返回 className
 */
export function parseAtomicClasses(className?: string): any {
  if (!className) return isRN ? {} : ''

  if (!isRN) {
    // H5/小程序端直接返回 className
    return className
  }

  // RN 端解析为样式对象
  const tokens = className.split(/\s+/).filter(Boolean)
  const style: any = {}

  const readSpacingValue = (raw: string): number | undefined => {
    // 优先匹配语义值：xs/md/base 等
    if (spacingClassMap[raw] != null) return spacingClassMap[raw]
    // 支持纯数字：10 / 12 / 24 等（单位 px）
    const n = Number(raw)
    if (!Number.isNaN(n)) return n
    return undefined
  }

  const readRadiusValue = (raw: string): number | string | undefined => {
    // 优先匹配语义值
    if (radiusClassMap[raw] != null) return radiusClassMap[raw]
    // 支持纯数字：8 / 12 / 20 等（单位 px）
    const n = Number(raw)
    if (!Number.isNaN(n)) return n
    return undefined
  }

  const readFontSize = (raw: string): number | undefined => {
    // 支持纯数字：12 / 14 / 16 等（单位 px）
    const n = Number(raw)
    if (!Number.isNaN(n)) return n
    return undefined
  }

  const applySpacing = (dir: 'p' | 'm', value: number) => {
    if (dir === 'p') style.padding = value
    else style.margin = value
  }

  const applyAxisSpacing = (
    dir: 'pt' | 'pr' | 'pb' | 'pl' | 'px' | 'py' | 'mt' | 'mr' | 'mb' | 'ml' | 'mx' | 'my',
    value: number
  ) => {
    const mapping: Record<string, (v: number) => void> = {
      pt: v => (style.paddingTop = v),
      pr: v => (style.paddingRight = v),
      pb: v => (style.paddingBottom = v),
      pl: v => (style.paddingLeft = v),
      px: v => {
        style.paddingLeft = v
        style.paddingRight = v
      },
      py: v => {
        style.paddingTop = v
        style.paddingBottom = v
      },
      mt: v => (style.marginTop = v),
      mr: v => (style.marginRight = v),
      mb: v => (style.marginBottom = v),
      ml: v => (style.marginLeft = v),
      mx: v => {
        style.marginLeft = v
        style.marginRight = v
      },
      my: v => {
        style.marginTop = v
        style.marginBottom = v
      },
    }
    mapping[dir]?.(value)
  }

  for (const t of tokens) {
    let m

    // padding: p-10 / p-base / padding-md
    if ((m = t.match(/^(padding|p)-(\w+)$/))) {
      const val = readSpacingValue(m[2])
      if (val != null) applySpacing('p', val)
      continue
    }

    // margin: m-10 / m-base / margin-md
    if ((m = t.match(/^(margin|m)-(\w+)$/))) {
      const val = readSpacingValue(m[2])
      if (val != null) applySpacing('m', val)
      continue
    }

    // 方向间距（短横线分隔）: p-t-10 / m-l-20 / p-r-base
    if ((m = t.match(/^(p|m)-(t|r|b|l|x|y)-(\w+)$/))) {
      const prefix = m[1] === 'p' ? 'p' : 'm'
      const direction = m[2]
      const val = readSpacingValue(m[3])
      if (val != null) {
        const dirMap: Record<string, string> = {
          't': prefix + 't',
          'r': prefix + 'r',
          'b': prefix + 'b',
          'l': prefix + 'l',
          'x': prefix + 'x',
          'y': prefix + 'y',
        }
        const dir = dirMap[direction] as any
        if (dir) applyAxisSpacing(dir, val)
      }
      continue
    }

    // 方向间距（连续写法）: pt-xx / px-xx / mt-xx / mx-xx
    if ((m = t.match(/^(pt|pr|pb|pl|px|py|mt|mr|mb|ml|mx|my)-(\w+)$/))) {
      const dir = m[1] as any
      const val = readSpacingValue(m[2])
      if (val != null) applyAxisSpacing(dir, val)
      continue
    }

    // 圆角: rounded-base / rounded-8 / rounded-20
    if ((m = t.match(/^rounded-(\w+)$/))) {
      const val = readRadiusValue(m[1])
      if (val != null) style.borderRadius = val as any
      continue
    }

    // 字体大小: font-12 / font-14 / font-16
    if ((m = t.match(/^font-(\w+)$/))) {
      const val = readFontSize(m[1])
      if (val != null) style.fontSize = val
      continue
    }

    // 文本颜色: text-primary / text-error
    if ((m = t.match(/^text-(\w+)$/))) {
      const color = textColorClassMap[m[1]]
      if (color) style.color = color
      continue
    }

    // 背景色: bg-primary / bg-card
    if ((m = t.match(/^bg-(\w+)$/))) {
      const color = bgColorClassMap[m[1]]
      if (color) style.backgroundColor = color
      continue
    }

    // Flex 布局
    if (t === 'flex') style.display = 'flex'
    else if (t === 'flex-row') style.flexDirection = 'row'
    else if (t === 'flex-column') style.flexDirection = 'column'
    else if (t === 'flex-1') style.flex = 1
    else if (t === 'items-center') style.alignItems = 'center'
    else if (t === 'items-start') style.alignItems = 'flex-start'
    else if (t === 'items-end') style.alignItems = 'flex-end'
    else if (t === 'justify-center') style.justifyContent = 'center'
    else if (t === 'justify-between') style.justifyContent = 'space-between'
    else if (t === 'justify-start') style.justifyContent = 'flex-start'
    else if (t === 'justify-end') style.justifyContent = 'flex-end'

    // 宽高
    else if (t === 'w-full') style.width = '100%'
    else if (t === 'h-full') style.height = '100%'

    // 其他可扩展...
  }

  return style
}

/**
 * 辅助函数：组合多个原子类
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
