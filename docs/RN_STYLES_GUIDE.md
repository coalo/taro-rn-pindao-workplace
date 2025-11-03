# React Native 样式使用注意事项

## ⚠️ 重要说明

由于 React Native 的样式系统与 Web 不同，公共样式模块的使用方式有所调整：

## 📝 正确的使用方式

### 1. 在组件的 SCSS 文件中引入

**✅ 推荐做法：**

```scss
// src/pages/your-page/index.scss
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.your-component {
  padding: $spacing-md;
  background-color: $bg-color;
  @include flex-center;
}
```

**❌ 错误做法：**
```scss
// app.scss 中全局引入（React Native 不支持）
@import './styles/index.scss';  // ❌ 不要这样做
```

### 2. 使用 React Native 的 StyleSheet

对于 React Native 特有的样式，推荐使用 StyleSheet API：

```tsx
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  }
})
```

### 3. 结合使用 SCSS 变量

```tsx
// Component.tsx
import { View } from '@tarojs/components'
import { StyleSheet } from 'react-native'
import './index.scss'

export default function Component() {
  return <View style={styles.container} />
}

const styles = StyleSheet.create({
  container: {
    // 可以在这里引用 SCSS 变量编译后的值
  }
})
```

```scss
// index.scss
@import '@/styles/variables.scss';

.container {
  padding: $spacing-md;  // 16px
  background-color: $bg-color;
}
```

## 🚫 React Native 不支持的 CSS 属性

以下 CSS 属性在 React Native 中无效，已从公共样式中移除或标注：

### 文本相关
- `text-overflow: ellipsis` （使用 `numberOfLines` 属性代替）
- `white-space: nowrap`
- `cursor: pointer`

### 布局相关
- `box-sizing`
- `outline`
- `list-style`

### 边框
- `border-top`, `border-bottom`, `border-left`, `border-right` 需分别写为：
  - `borderTopWidth`, `borderTopColor`
  - `borderBottomWidth`, `borderBottomColor`
  - 等等

### 字重
- 只支持 `normal` (400) 和 `bold` (700)
- 其他字重值（300, 500, 600）在 Android 上无效

## ✅ 推荐的样式组织方式

### 方案一：纯 SCSS（适用于简单样式）

```tsx
// Component.tsx
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Component() {
  return (
    <View className='container'>
      <Text className='title'>标题</Text>
    </View>
  )
}
```

```scss
// index.scss
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.container {
  padding: $spacing-md;
  background-color: $bg-color;
}

.title {
  font-size: $font-size-lg;
  font-weight: bold;
  color: $text-color;
}
```

### 方案二：StyleSheet + SCSS 变量（适用于复杂样式）

```tsx
// Component.tsx
import { View, Text } from '@tarojs/components'
import { StyleSheet } from 'react-native'

// 从 SCSS 编译后的变量导入（需要配置）
const COLORS = {
  primary: '#1677ff',
  bgColor: '#ffffff',
  textColor: '#333333',
}

const SPACING = {
  sm: 8,
  md: 16,
  lg: 20,
}

export default function Component() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>标题</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.bgColor,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
})
```

### 方案三：混合使用（推荐）

```tsx
import { View, Text } from '@tarojs/components'
import { StyleSheet } from 'react-native'
import './index.scss'

export default function Component() {
  return (
    <View className='container' style={styles.extraStyles}>
      <Text className='title'>标题</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  extraStyles: {
    // 仅用于 SCSS 无法实现的动态样式
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android 阴影
  },
})
```

## 📚 可用的公共样式资源

### 1. 变量 (variables.scss)
✅ **完全可用**
- 颜色变量
- 间距变量  
- 字号变量
- 圆角变量

### 2. Mixins (mixins.scss)
⚠️ **部分可用**（避免使用包含不支持属性的 Mixin）

**推荐使用的 Mixins：**
- `@include flex-center`
- `@include flex-between`
- `@include flex-column`
- `@include square($size)`
- `@include circle($size)`

**不推荐使用的 Mixins：**
- `@include text-ellipsis` （使用 RN 的 numberOfLines）
- `@include hide-scrollbar`
- `@include glass-effect`

### 3. 工具类 (utilities.scss)
❌ **不建议使用**

React Native 不支持类名级联，工具类在 RN 中效果有限。

## 💡 最佳实践

### 1. 创建设计 Token 文件

```typescript
// src/styles/tokens.ts
export const colors = {
  primary: '#1677ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  text: '#333333',
  textSecondary: '#666666',
  bg: '#ffffff',
  bgSecondary: '#f5f5f5',
}

export const spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
}

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
}
```

### 2. 在组件中使用 Token

```tsx
import { View, Text } from '@tarojs/components'
import { StyleSheet } from 'react-native'
import { colors, spacing, fontSize } from '@/styles/tokens'

export default function Component() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>标题</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
})
```

## 🎯 总结

1. **不要在 app.scss 中全局引入公共样式**
2. **在每个组件的 SCSS 文件中按需引入变量和 Mixins**
3. **创建 TypeScript tokens 文件供 StyleSheet 使用**
4. **优先使用 SCSS 处理静态样式**
5. **使用 StyleSheet 处理动态样式和平台特定样式**

这样既能利用 SCSS 的变量和 Mixins，又能保证 React Native 的兼容性。
