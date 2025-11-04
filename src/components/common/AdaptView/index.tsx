import React from 'react'
import { View } from '@tarojs/components'
import type { ViewProps } from '@tarojs/components/types/View'
import { spacing } from '../../../styles/tokens/spacing'
import { radius } from '../../../styles/tokens/radius'

const isRN = process.env.TARO_ENV === 'rn'

// 将 className 原子类转换为 RN 样式对象
function classNamesToRNStyle(className?: string) {
  if (!className) return {}
  const tokens = className.split(/\s+/).filter(Boolean)
  const style: any = {}

  const spacingMap: Record<string, number> = {
    none: spacing.none,
    xxs: spacing.xxs,
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    base: spacing.base,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    xxxl: spacing.xxxl,
    xxxxl: spacing.xxxxl,
  }

  const radiusMap: Record<string, number | string> = {
    none: radius.none,
    xs: radius.xs,
    sm: radius.sm,
    base: radius.base,
    md: radius.md,
    lg: radius.lg,
    xl: radius.xl,
    xxl: radius.xxl,
    full: radius.full,
    circle: radius.circle,
  }

  const applySpacing = (dir: 'p' | 'm', value: number) => {
    switch (dir) {
      case 'p':
        style.padding = value
        break
      case 'm':
        style.margin = value
        break
    }
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
    mapping[dir](value)
  }

  const readSpacingValue = (raw: string): number | undefined => {
    // 支持语义值：xs/md/base 等
    if (spacingMap[raw] != null) return spacingMap[raw]
    // 支持数字：padding-10 / p-12
    const n = Number(raw)
    if (!Number.isNaN(n)) return n
    return undefined
  }

  const readRadiusValue = (raw: string): number | string | undefined => {
    if (radiusMap[raw] != null) return radiusMap[raw]
    const n = Number(raw)
    if (!Number.isNaN(n)) return n
    return undefined
  }

  for (const t of tokens) {
    // padding-10 / p-10 / p-base / p-md 等
    let m
    if ((m = t.match(/^(padding|p)-(\w+)$/))) {
      const val = readSpacingValue(m[2])
      if (val != null) applySpacing('p', val)
      continue
    }
    // margin-10 / m-10 / m-base
    if ((m = t.match(/^(margin|m)-(\w+)$/))) {
      const val = readSpacingValue(m[2])
      if (val != null) applySpacing('m', val)
      continue
    }
    // 轴向：pt-xx / px-xx / mt-xx / mx-xx 等
    if ((m = t.match(/^(pt|pr|pb|pl|px|py|mt|mr|mb|ml|mx|my)-(\w+)$/))) {
      const dir = m[1] as any
      const val = readSpacingValue(m[2])
      if (val != null) applyAxisSpacing(dir, val)
      continue
    }
    // 圆角：rounded-base / rounded-8
    if ((m = t.match(/^rounded-(\w+)$/))) {
      const val = readRadiusValue(m[1])
      if (val != null) style.borderRadius = val as any
      continue
    }
    // 其他常用原子类可在此扩展...
  }

  return style
}

export interface AdaptViewProps extends Omit<ViewProps, 'style'> {
  className?: string
  style?: Record<string, any> | null
}

// 跨端适配的 View：Web 端沿用 className；RN 端解析为 style
const AdaptView: React.FC<AdaptViewProps> = ({ className, style, children, ...rest }) => {
  if (isRN) {
    const rnStyle = classNamesToRNStyle(className)
    const merged = Array.isArray(style) ? [{ ...rnStyle }, ...style] : { ...rnStyle, ...(style || {}) }
    return (
      <View {...rest} style={merged}>
        {children}
      </View>
    )
  }
  // 非 RN 端按原样使用 className
  return (
    <View {...rest} className={className} style={style || {}}>
      {children}
    </View>
  )
}

export default AdaptView
