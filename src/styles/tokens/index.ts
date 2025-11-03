/**
 * Design Tokens 设计令牌统一导出
 * 提供项目的设计系统基础
 */

export { palette, colors, alpha } from './colors'
export { spacing, semanticSpacing } from './spacing'
export { fontSize, fontWeight, lineHeight, fontFamily, typography } from './typography'
export { radius, semanticRadius } from './radius'
export { shadows, rnShadows, semanticShadows } from './shadows'
export { zIndex } from './zIndex'

// 默认导出所有令牌
import colorTokens from './colors'
import spacingTokens from './spacing'
import typographyTokens from './typography'
import radiusTokens from './radius'
import shadowTokens from './shadows'
import zIndexTokens from './zIndex'

export default {
  ...colorTokens,
  ...spacingTokens,
  ...typographyTokens,
  ...radiusTokens,
  ...shadowTokens,
  ...zIndexTokens,
}
