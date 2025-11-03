# Styles 样式系统

该目录包含项目的设计系统和样式相关文件。

## 📁 目录结构

```
styles/
├── tokens/              # 🎨 设计令牌（Design Tokens）- TypeScript
│   ├── colors.ts       # 颜色系统
│   ├── spacing.ts      # 间距系统
│   ├── typography.ts   # 字体系统
│   ├── radius.ts       # 圆角系统
│   ├── shadows.ts      # 阴影系统
│   ├── zIndex.ts       # 层级系统
│   └── index.ts        # 统一导出
├── scss/                # 📝 SCSS 样式文件 - H5/小程序专用
│   ├── _variables.scss # SCSS 变量（与 tokens 同步）
│   ├── _mixins.scss    # SCSS Mixins
│   ├── _utilities.scss # 原子类工具
│   ├── _global.scss    # 全局样式
│   ├── index.scss      # SCSS 入口
│   └── README.md       # SCSS 说明文档
├── index.ts             # 样式系统 TS 入口
└── README.md            # 说明文档
```

## 🎨 Design Tokens 设计令牌

设计令牌是设计系统的基础，定义了项目的视觉语言。

### 1. Colors 颜色系统

```typescript
import { colors, palette, alpha } from '@/styles/tokens'

// 使用语义化颜色
const buttonStyle = {
  backgroundColor: colors.primary,
  color: colors.textInverse,
}

// 使用色板
const customColor = palette.blue500

// 使用透明度
const overlayStyle = {
  backgroundColor: alpha.blackAlpha50,
}
```

**颜色系统包含：**
- `palette`: 基础色板（蓝、绿、红、橙、灰）
- `colors`: 语义化颜色（主题、成功、警告、错误、文字、背景、边框等）
- `alpha`: 透明度变体

### 2. Spacing 间距系统

```typescript
import { spacing, semanticSpacing } from '@/styles/tokens'

// 使用基础间距（基于 4px 网格）
const cardStyle = {
  padding: spacing.base,      // 16px
  marginBottom: spacing.lg,   // 20px
}

// 使用语义化间距
const pageStyle = {
  paddingHorizontal: semanticSpacing.pageHorizontal,
  paddingVertical: semanticSpacing.pageVertical,
}
```

**间距等级：**
- `none`: 0px
- `xxs`: 2px
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `base`: 16px（基准）
- `lg`: 20px
- `xl`: 24px
- `xxl`: 32px
- `xxxl`: 40px
- `xxxxl`: 48px

### 3. Typography 字体系统

```typescript
import { fontSize, fontWeight, typography } from '@/styles/tokens'

// 使用基础字体
const textStyle = {
  fontSize: fontSize.base,        // 14px
  fontWeight: fontWeight.medium,  // 500
}

// 使用语义化字体样式
const titleStyle = typography.h3  // { fontSize: 24, fontWeight: '600', lineHeight: 1.2 }
```

**字体包含：**
- `fontSize`: 字体大小（10px ~ 32px）
- `fontWeight`: 字体粗细（300 ~ 700）
- `lineHeight`: 行高（1.0 ~ 2.0）
- `fontFamily`: 字体家族
- `typography`: 语义化字体样式（h1~h6, body, label, caption, button）

### 4. Radius 圆角系统

```typescript
import { radius, semanticRadius } from '@/styles/tokens'

// 使用基础圆角
const buttonStyle = {
  borderRadius: radius.base,  // 8px
}

// 使用语义化圆角
const cardStyle = {
  borderRadius: semanticRadius.card,  // 8px
}

// 圆形头像
const avatarStyle = {
  borderRadius: radius.full,  // 999px
}
```

### 5. Shadows 阴影系统

```typescript
import { shadows, rnShadows, semanticShadows } from '@/styles/tokens'

// H5 使用 CSS 阴影
const h5CardStyle = {
  boxShadow: shadows.sm,
}

// RN 使用原生阴影
const rnCardStyle = {
  ...rnShadows.sm,  // { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }
}

// 使用语义化阴影
const modalStyle = {
  ...rnShadows.xl,
}
```

### 6. Z-Index 层级系统

```typescript
import { zIndex } from '@/styles/tokens'

const modalStyle = {
  zIndex: zIndex.modal,  // 1400
}

const tabBarStyle = {
  zIndex: zIndex.tabbar,  // 1100
}
```

## 🎯 平台选择指南

### React Native 开发

✅ **使用 TypeScript Tokens**

```typescript
import { colors, spacing, typography, rnShadows } from '@/styles/tokens'

const styles = {
  container: {
    backgroundColor: colors.bgCard,
    padding: spacing.base,
    borderRadius: radius.card,
    ...rnShadows.sm,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
  },
}
```

### H5 / 小程序开发

✅ **使用 SCSS**

```scss
@import '@/styles/scss';

.container {
  background-color: $bg-card;
  padding: $spacing-base;
  border-radius: $radius-base;
  box-shadow: $shadow-sm;
}

.title {
  font-size: $font-size-xxl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
}
```

### 跨端兼容

设计令牌已考虑跨端兼容：

```typescript
import { isRN } from '@/utils/platform'
import { shadows, rnShadows } from '@/styles/tokens'

// 根据平台选择阴影方案
const cardShadow = isRN ? rnShadows.sm : { boxShadow: shadows.sm }
```

### 主题定制

未来可以基于 Design Tokens 创建主题：

```
styles/
├── tokens/          # 基础令牌
└── themes/          # 主题变体
    ├── light.ts     # 亮色主题
    └── dark.ts      # 暗色主题
```

## 📝 最佳实践

1. **优先使用语义化令牌**
   ```typescript
   // ✅ 推荐
   color: colors.primary
   
   // ❌ 不推荐
   color: '#1677ff'
   ```

2. **保持间距一致**
   ```typescript
   // ✅ 推荐：使用 spacing 系统
   padding: spacing.base
   
   // ❌ 不推荐：魔法数字
   padding: 15
   ```

3. **使用语义化字体样式**
   ```typescript
   // ✅ 推荐
   ...typography.h3
   
   // ❌ 不推荐
   fontSize: 24, fontWeight: '600'
   ```

4. **RN 阴影需要特殊处理**
   ```typescript
   // ✅ 推荐
   ...rnShadows.sm
   
   // ❌ 不推荐（RN 不支持 boxShadow）
   boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
   ```

## 🔗 相关文档

- [Design Tokens 官方规范](https://designtokens.org/)
- [Taro 样式文档](https://taro-docs.jd.com/docs/size)
- [React Native 样式文档](https://reactnative.dev/docs/style)

## ⚠️ 注意事项

1. **不要在令牌文件中引入业务逻辑**
2. **保持令牌的纯粹性和可复用性**
3. **修改令牌时需要考虑全局影响**
4. **新增令牌需要更新文档**
