# SCSS 样式文件

该目录包含所有 SCSS 相关的样式文件，主要用于 **H5** 和 **小程序** 端。

> **注意**：React Native 开发请使用 `@/styles/tokens` (TypeScript)

## 📁 目录结构

```
scss/
├── _variables.scss    # SCSS 变量（与 tokens 同步）
├── _mixins.scss       # SCSS Mixins
├── _utilities.scss    # 原子类工具
├── index.scss         # 统一入口
└── README.md          # 说明文档
```

## 🎨 文件说明

### _variables.scss - SCSS 变量

包含与 `@/styles/tokens` 对应的 SCSS 变量：
- 颜色系统
- 间距系统
- 字体系统
- 圆角系统
- 阴影系统
- Z-Index
- 动画时长

**重要**：这些变量值应与 TypeScript tokens 保持同步！

### _mixins.scss - SCSS Mixins

提供常用的样式混合：
- 布局 Mixins（flex-center、flex-between 等）
- 文本 Mixins（text-ellipsis、text-ellipsis-multi 等）
- 尺寸 Mixins（square、circle、aspect-ratio 等）
- 定位 Mixins（absolute-center、absolute-full 等）
- 视觉效果 Mixins（clearfix、hide-scrollbar、glass-effect 等）
- 交互 Mixins（active-effect、hover-effect、disabled-state 等）
- 动画 Mixins（fade-in、slide-up、zoom-in 等）

### _utilities.scss - 原子类工具

提供常用的原子类：
- 间距工具类（m-*, p-*, mt-*, mb-* 等）
- 文本工具类（text-center、text-primary、text-ellipsis 等）
- Flex 工具类（flex、justify-center、items-center 等）
- 背景工具类（bg-white、bg-primary 等）
- 边框工具类（border、rounded-* 等）
- 阴影工具类（shadow-* 等）
- 显示工具类（block、inline-block、hidden 等）

## 💡 使用方式

### 方式 1：导入完整样式（包含变量和 Mixins）

```scss
@import '@/styles/scss/index.scss';

.my-component {
  padding: $spacing-base;
  color: $primary-color;
  @include flex-center;
}
```

### 方式 2：按需导入

```scss
// 只导入变量
@import '@/styles/scss/variables';

.my-component {
  padding: $spacing-base;
  color: $primary-color;
}
```

```scss
// 导入变量和 Mixins
@import '@/styles/scss/variables';
@import '@/styles/scss/mixins';

.my-component {
  @include flex-center;
  @include text-ellipsis;
}
```

```scss
// 导入工具类（全局使用）
@import '@/styles/scss/utilities';
```

### 方式 3：在页面中使用

```tsx
// 在 Taro 页面中
import './index.scss'

// index.scss
@import '@/styles/scss/index.scss';

.page {
  background-color: $bg-page;
  padding: $spacing-base;
  
  &-header {
    @include flex-between;
    height: $header-height;
  }
  
  &-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    @include text-ellipsis;
  }
}
```

## 📋 使用示例

### 示例 1：使用变量

```scss
@import '@/styles/scss/variables';

.card {
  background: $bg-card;
  border-radius: $radius-base;
  padding: $spacing-base;
  box-shadow: $shadow-sm;
}
```

### 示例 2：使用 Mixins

```scss
@import '@/styles/scss/mixins';

.button {
  @include flex-center;
  @include active-effect;
  
  &-icon {
    @include square(20px);
  }
}

.modal {
  @include fixed-full;
  @include flex-center;
  z-index: $z-index-modal;
}

.avatar {
  @include circle(40px);
}

.description {
  @include text-ellipsis-multi(3);
}
```

### 示例 3：使用工具类

```html
<!-- 在 H5 模板中 -->
<View className="flex items-center justify-between p-base">
  <Text className="text-primary text-lg font-bold">标题</Text>
  <View className="bg-primary rounded-full p-sm">
    <Text className="text-white text-sm">标签</Text>
  </View>
</View>
```

## ⚠️ 注意事项

### 1. 平台差异

- ✅ **H5/小程序**：使用 SCSS 文件
- ✅ **React Native**：使用 `@/styles/tokens` (TypeScript)

```tsx
// ❌ 错误：RN 中使用 SCSS
import './index.scss'  // RN 不支持

// ✅ 正确：RN 中使用 tokens
import { colors, spacing } from '@/styles/tokens'
const style = { color: colors.primary, padding: spacing.base }
```

### 2. 变量同步

SCSS 变量需要与 TypeScript tokens 保持同步：
- 修改设计令牌时，需要同时更新两处
- 建议以 `@/styles/tokens` 为准，SCSS 变量跟随更新

### 3. 导入顺序

```scss
// ✅ 正确：先导入变量，再使用
@import '@/styles/scss/variables';

.component {
  color: $primary-color; // 可以使用
}
```

```scss
// ❌ 错误：未导入变量就使用
.component {
  color: $primary-color; // 报错：未定义
}
```

### 4. Mixins 参数

```scss
@import '@/styles/scss/mixins';

// ✅ 使用带参数的 Mixin
.text {
  @include text-ellipsis-multi(3);  // 3行省略
}

.button {
  @include active-effect(0.95, 0.7);  // 自定义缩放和透明度
}
```

## 🔗 相关文档

- [TypeScript Tokens](../tokens/README.md) - RN 端使用
- [Sass 官方文档](https://sass-lang.com/)
- [Taro 样式文档](https://taro-docs.jd.com/docs/size)

## 🎯 最佳实践

1. **优先使用变量**
   ```scss
   // ✅ 推荐
   color: $primary-color;
   
   // ❌ 不推荐
   color: #1677ff;
   ```

2. **复用 Mixins**
   ```scss
   // ✅ 推荐
   @include flex-center;
   
   // ❌ 不推荐
   display: flex;
   align-items: center;
   justify-content: center;
   ```

3. **合理使用工具类**
   ```tsx
   // ✅ 推荐：简单布局使用工具类
   <View className="flex items-center p-base" />
   
   // ✅ 推荐：复杂样式使用自定义类
   <View className="custom-component" />
   ```

4. **避免重复定义**
   ```scss
   // ❌ 不推荐
   $my-primary-color: #1677ff;  // 与 $primary-color 重复
   
   // ✅ 推荐
   $primary-color: #1677ff;  // 使用统一变量
   ```
