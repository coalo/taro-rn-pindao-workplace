# 样式系统使用指南

本项目采用 **TypeScript Design Tokens** 和 **SCSS** 混合的样式方案，以支持跨平台开发。

## 📁 目录结构

```
src/styles/
├── tokens/                  # 🎨 TypeScript Design Tokens（RN + 通用）
│   ├── colors.ts           # 颜色系统
│   ├── spacing.ts          # 间距系统
│   ├── typography.ts       # 字体系统
│   ├── radius.ts           # 圆角系统
│   ├── shadows.ts          # 阴影系统
│   ├── zIndex.ts           # 层级系统
│   └── index.ts            # 统一导出
│
├── scss/                    # 📝 SCSS 样式文件（H5/小程序）
│   ├── _variables.scss     # SCSS 变量（与 tokens 同步）
│   ├── _mixins.scss        # SCSS Mixins
│   ├── _utilities.scss     # 原子类工具
│   ├── _global.scss        # 全局样式
│   ├── index.scss          # SCSS 入口
│   └── README.md           # SCSS 说明
│
├── index.ts                # 样式系统 TS 入口
└── README.md               # 总体说明
```

## 🎯 平台选择

### React Native 开发 → 使用 TypeScript Tokens

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

**为什么？**
- ✅ TypeScript 类型安全
- ✅ 支持 RN 原生阴影
- ✅ 可以动态计算样式
- ✅ 支持主题切换

### H5 / 小程序开发 → 使用 SCSS

```scss
@import '@/styles/scss';

.container {
  background-color: $bg-card;
  padding: $spacing-base;
  border-radius: $radius-base;
  box-shadow: $shadow-sm;
  
  @include flex-center;
}

.title {
  @include text-ellipsis;
  font-size: $font-size-xxl;
  color: $text-primary;
}
```

**为什么？**
- ✅ 支持 CSS 预处理器特性
- ✅ 可以使用 Mixins
- ✅ 支持嵌套语法
- ✅ 兼容传统 CSS 工作流

## 💡 快速开始

### 1. RN 页面开发

```tsx
// pages/example/index.tsx
import { View, Text } from '@tarojs/components'
import { colors, spacing, typography } from '@/styles/tokens'

export default function Example() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.bgPage,
    padding: spacing.base,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.lg,
  },
}
```

### 2. H5 页面开发

```tsx
// pages/example/index.tsx
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Example() {
  return (
    <View className="page">
      <Text className="page-title">Hello World</Text>
    </View>
  )
}
```

```scss
// pages/example/index.scss
@import '@/styles/scss';

.page {
  background-color: $bg-page;
  padding: $spacing-base;
  
  &-title {
    @include text-ellipsis;
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $primary-color;
    margin-bottom: $spacing-lg;
  }
}
```

### 3. 跨端兼容写法

```tsx
// 混合使用（RN 使用 style，H5 使用 className）
import { View, Text } from '@tarojs/components'
import { getPlatformStyle } from '@/utils/platform'
import { colors, spacing } from '@/styles/tokens'
import './index.scss'

export default function Example() {
  const containerStyle = getPlatformStyle(
    { backgroundColor: colors.bgCard, padding: spacing.base }, // RN
    'card' // H5
  )
  
  return (
    <View {...containerStyle}>
      <Text>Hello World</Text>
    </View>
  )
}
```

## 📚 核心概念

### Design Tokens（设计令牌）

设计令牌是设计系统的基础，定义了项目的视觉语言：

```typescript
// 颜色令牌
colors.primary        // #1677ff
colors.success        // #52c41a
colors.textPrimary    // #333333

// 间距令牌（基于 4px 网格）
spacing.xs      // 4px
spacing.base    // 16px
spacing.xl      // 24px

// 字体令牌
typography.h1   // { fontSize: 32, fontWeight: '700', lineHeight: 1.0 }
typography.body // { fontSize: 14, fontWeight: '400', lineHeight: 1.5 }
```

### SCSS 变量

SCSS 变量与 TypeScript Tokens 保持同步：

```scss
// 对应 colors.primary
$primary-color: #1677ff;

// 对应 spacing.base
$spacing-base: 16px;

// 对应 typography.h1
$font-size-xxxxl: 32px;
$font-weight-bold: 700;
```

## 🎨 常用示例

### 示例 1：卡片组件

**RN 版本：**
```typescript
import { colors, spacing, radius, rnShadows } from '@/styles/tokens'

const cardStyle = {
  backgroundColor: colors.bgCard,
  padding: spacing.base,
  borderRadius: radius.base,
  ...rnShadows.sm,
}
```

**H5 版本：**
```scss
.card {
  background-color: $bg-card;
  padding: $spacing-base;
  border-radius: $radius-base;
  box-shadow: $shadow-sm;
}
```

### 示例 2：按钮组件

**RN 版本：**
```typescript
import { colors, spacing, typography } from '@/styles/tokens'

const buttonStyle = {
  backgroundColor: colors.primary,
  paddingHorizontal: spacing.base,
  paddingVertical: spacing.sm,
  borderRadius: radius.sm,
}

const buttonTextStyle = {
  ...typography.button,
  color: colors.textInverse,
}
```

**H5 版本：**
```scss
.button {
  @include flex-center;
  background-color: $primary-color;
  padding: $spacing-sm $spacing-base;
  border-radius: $radius-sm;
  
  @include active-effect;
  
  &-text {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $text-inverse;
  }
}
```

### 示例 3：布局

**RN 版本：**
```typescript
const layoutStyle = {
  container: {
    flex: 1,
    backgroundColor: colors.bgPage,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.base,
  },
  content: {
    flex: 1,
    padding: spacing.base,
  },
}
```

**H5 版本：**
```scss
.layout {
  &-container {
    min-height: 100vh;
    background-color: $bg-page;
  }
  
  &-header {
    @include flex-between;
    padding: $spacing-base;
  }
  
  &-content {
    flex: 1;
    padding: $spacing-base;
  }
}
```

## ⚠️ 注意事项

### 1. 变量同步

当修改设计令牌时，需要同时更新：
- `src/styles/tokens/*.ts` （主要）
- `src/styles/scss/_variables.scss` （同步）

### 2. 阴影处理

```typescript
// ✅ RN：使用 rnShadows
import { rnShadows } from '@/styles/tokens'
const style = { ...rnShadows.sm }

// ❌ RN：不支持 boxShadow
const style = { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }
```

```scss
// ✅ H5：使用 box-shadow
.card {
  box-shadow: $shadow-sm;
}
```

### 3. 导入路径

```typescript
// ✅ 正确：使用别名
import { colors } from '@/styles/tokens'

// ❌ 错误：相对路径
import { colors } from '../../styles/tokens'
```

```scss
// ✅ 正确：使用别名
@import '@/styles/scss';

// ❌ 错误：相对路径
@import '../../styles/scss/index.scss';
```

### 4. 平台判断

```typescript
import { isRN } from '@/utils/platform'

// ✅ 根据平台选择不同实现
const shadow = isRN 
  ? rnShadows.sm 
  : { boxShadow: shadows.sm }
```

## 📖 相关文档

- [Design Tokens 详细文档](./src/styles/tokens/README.md)
- [SCSS 使用指南](./src/styles/scss/README.md)
- [样式系统总览](./src/styles/README.md)

## 🤝 贡献指南

### 添加新的设计令牌

1. 在 `src/styles/tokens/*.ts` 中添加
2. 在 `src/styles/scss/_variables.scss` 中同步
3. 更新相关文档

### 添加新的 Mixin

1. 在 `src/styles/scss/_mixins.scss` 中添加
2. 添加注释说明用法
3. 在 README 中添加示例

## 🎯 最佳实践

1. **优先使用语义化令牌**
   ```typescript
   // ✅ 推荐
   color: colors.primary
   
   // ❌ 不推荐
   color: '#1677ff'
   ```

2. **保持间距一致**
   ```typescript
   // ✅ 推荐
   padding: spacing.base
   
   // ❌ 不推荐
   padding: 15
   ```

3. **使用语义化字体**
   ```typescript
   // ✅ 推荐
   ...typography.h3
   
   // ❌ 不推荐
   fontSize: 24, fontWeight: '600'
   ```

4. **合理使用工具类**
   ```tsx
   // ✅ 简单布局用工具类
   <View className="flex items-center p-base" />
   
   // ✅ 复杂组件用自定义样式
   <View className="custom-component" />
   ```
