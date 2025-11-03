# 公共样式模块

> 统一的设计系统和样式规范

## 📁 文件说明

- **variables.scss** - 样式变量（颜色、字体、间距等）
- **mixins.scss** - 可复用的样式函数
- **utilities.scss** - 原子类样式（工具类）
- **index.scss** - 入口文件（H5/小程序使用）
- **tokens.ts** - TypeScript Design Tokens（React Native 使用）

## 🚀 快速开始

### SCSS 使用方式

```scss
// 在组件的 .scss 文件中导入
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

.my-component {
  padding: $spacing-md;           // 使用变量
  background-color: $bg-color;
  @include flex-center;           // 使用 Mixin
}
```

### TypeScript 使用方式（React Native）

```tsx
import { StyleSheet } from 'react-native'
import { colors, spacing, getShadowStyle } from '@/styles/tokens'

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.bg,
    ...getShadowStyle('base'),
  },
})
```

## 📖 完整文档

查看项目根目录下的 `docs/` 文件夹：

- **STYLES_README.md** - 总览
- **STYLES_GUIDE.md** - 详细指南
- **RN_STYLES_GUIDE.md** - React Native 说明
- **STYLES_SUMMARY.md** - 完成总结

## 💡 常用变量

```scss
// 颜色
$primary-color: #1677ff
$success-color: #52c41a
$error-color: #ff4d4f

// 间距
$spacing-xs: 4px
$spacing-sm: 8px
$spacing-md: 16px
$spacing-lg: 20px

// 字号
$font-size-sm: 12px
$font-size-base: 14px
$font-size-lg: 18px
$font-size-xl: 20px
```

## 🔧 常用 Mixins

```scss
@include flex-center;           // Flex 居中
@include flex-between;          // Flex 两端对齐
@include text-ellipsis;         // 单行文本省略
@include text-ellipsis-multi(2);// 多行文本省略
@include square(48px);          // 正方形
@include circle(48px);          // 圆形
```

## 📝 示例

查看以下文件了解实际应用：

- `src/pages/mine/` - "我的"页面示例
- `src/pages/examples/quick-start.*` - 快速开始示例
