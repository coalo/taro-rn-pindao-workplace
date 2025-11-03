# 公共样式模块使用文档

## 📁 目录结构

```
src/styles/
├── index.scss        # 入口文件，统一导入所有样式
├── variables.scss    # 样式变量（颜色、字体、间距等）
├── mixins.scss       # Mixins（可复用的样式函数）
└── utilities.scss    # 工具类（原子类样式）
```

## 🎨 一、样式变量 (variables.scss)

### 1.1 颜色系统

```scss
// 使用示例
.my-component {
  color: $primary-color;           // 主色
  background-color: $bg-color;     // 背景色
  border-color: $border-color;     // 边框色
}
```

**可用变量：**
- **主色系**：`$primary-color`, `$primary-light`, `$primary-dark`
- **功能色**：`$success-color`, `$warning-color`, `$error-color`, `$info-color`
- **文本色**：`$text-color`, `$text-color-secondary`, `$text-color-tertiary`
- **背景色**：`$bg-color`, `$bg-color-secondary`, `$bg-color-tertiary`
- **边框色**：`$border-color`, `$border-color-light`, `$divider-color`

### 1.2 字体系统

```scss
.title {
  font-size: $font-size-xl;        // 20px
  font-weight: $font-weight-bold;  // 700
  line-height: $line-height-tight; // 1.2
}
```

**可用变量：**
- **字号**：`$font-size-xs` ~ `$font-size-xxxl` (10px ~ 32px)
- **字重**：`$font-weight-light` ~ `$font-weight-bold` (300 ~ 700)
- **行高**：`$line-height-tight`, `$line-height-base`, `$line-height-loose`

### 1.3 间距系统

```scss
.card {
  padding: $spacing-md;      // 16px
  margin-bottom: $spacing-lg; // 20px
}
```

**可用变量：**
- `$spacing-xs`: 4px
- `$spacing-sm`: 8px
- `$spacing-base`: 12px
- `$spacing-md`: 16px
- `$spacing-lg`: 20px
- `$spacing-xl`: 24px
- `$spacing-xxl`: 32px

### 1.4 圆角和阴影

```scss
.button {
  border-radius: $border-radius-base; // 8px
  box-shadow: $shadow-base;            // 0 2px 8px rgba(0,0,0,0.06)
}
```

## 🔧 二、Mixins (mixins.scss)

### 2.1 布局 Mixins

```scss
// Flex 居中
.center-box {
  @include flex-center;  // display: flex; align-items: center; justify-content: center;
}

// Flex 两端对齐
.header {
  @include flex-between;  // display: flex; align-items: center; justify-content: space-between;
}

// Flex 列布局
.sidebar {
  @include flex-column;  // display: flex; flex-direction: column;
}
```

**可用 Mixins：**
- `@include flex-center` - Flex 居中
- `@include flex-align-center` - Flex 垂直居中
- `@include flex-justify-center` - Flex 水平居中
- `@include flex-between` - Flex 两端对齐
- `@include flex-around` - Flex 均匀分布
- `@include flex-column` - Flex 列布局
- `@include flex-column-center` - Flex 列布局居中

### 2.2 文本 Mixins

```scss
// 单行文本省略
.title {
  @include text-ellipsis;
}

// 多行文本省略（2行）
.description {
  @include text-ellipsis-multi(2);
}

// 文本不可选
.label {
  @include text-no-select;
}
```

### 2.3 尺寸 Mixins

```scss
// 正方形
.avatar {
  @include square(48px);  // width: 48px; height: 48px;
}

// 圆形
.icon {
  @include circle(32px);  // width: 32px; height: 32px; border-radius: 50%;
}
```

### 2.4 定位 Mixins

```scss
// 绝对定位居中
.modal {
  @include absolute-center;  // position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
}

// 绝对定位填满
.overlay {
  @include absolute-full;  // position: absolute; top: 0; right: 0; bottom: 0; left: 0;
}
```

### 2.5 视觉效果 Mixins

```scss
// 隐藏滚动条
.scroll-container {
  @include hide-scrollbar;
}

// 自定义滚动条
.custom-scroll {
  @include custom-scrollbar(8px, #ccc);
}

// 毛玻璃效果
.glass-panel {
  @include glass-effect(10px, 0.8);
}

// 渐变背景
.gradient-bg {
  @include gradient-bg(#1677ff, #4096ff, to bottom);
}
```

### 2.6 交互 Mixins

```scss
// 点击态
.button {
  @include active-effect(0.98, 0.8);
}

// 悬浮态
.card {
  @include hover-effect(1.05);
}

// 禁用态
.disabled-button {
  @include disabled-state;
}
```

### 2.7 动画 Mixins

```scss
// 淡入动画
.fade-element {
  @include fade-in(0.3s);
}

// 滑入动画（从下方）
.slide-element {
  @include slide-up(0.3s);
}

// 缩放进入动画
.zoom-element {
  @include zoom-in(0.3s);
}
```

## 🛠 三、工具类 (utilities.scss)

工具类可以直接在 HTML/JSX 中使用，无需编写 CSS。

### 3.1 间距工具类

```tsx
// Margin
<View className="m-md">内容</View>          // margin: 16px
<View className="mt-lg mb-sm">内容</View>   // margin-top: 20px; margin-bottom: 8px

// Padding
<View className="p-xl">内容</View>          // padding: 24px
<View className="pt-md pb-md">内容</View>   // padding-top: 16px; padding-bottom: 16px
```

### 3.2 文本工具类

```tsx
// 对齐
<Text className="text-center">居中文本</Text>

// 颜色
<Text className="text-primary">主色文本</Text>
<Text className="text-error">错误文本</Text>

// 字号
<Text className="text-lg font-bold">大标题</Text>
<Text className="text-sm text-secondary">副标题</Text>

// 省略
<Text className="text-ellipsis">这是一段很长的文本...</Text>
```

### 3.3 Flex 工具类

```tsx
// Flex 布局
<View className="flex items-center justify-between">
  <Text>左侧</Text>
  <Text>右侧</Text>
</View>

// Flex 列布局
<View className="flex flex-column items-center">
  <Text>上</Text>
  <Text>下</Text>
</View>

// Flex 增长
<View className="flex">
  <View className="flex-1">占满剩余空间</View>
  <View>固定宽度</View>
</View>
```

### 3.4 背景和边框工具类

```tsx
// 背景色
<View className="bg-white p-md rounded-base shadow-base">
  白色卡片
</View>

// 边框
<View className="border rounded-lg p-md">
  带边框的容器
</View>
```

### 3.5 完整示例

```tsx
import { View, Text } from '@tarojs/components'

export default function MyComponent() {
  return (
    <View className="bg-white rounded-base shadow-base p-md m-md">
      {/* 标题栏 */}
      <View className="flex items-center justify-between mb-md">
        <Text className="text-lg font-bold">标题</Text>
        <Text className="text-sm text-primary">更多</Text>
      </View>
      
      {/* 内容 */}
      <View className="border-t pt-md">
        <Text className="text-base text-secondary text-ellipsis">
          这是一段内容描述
        </Text>
      </View>
    </View>
  )
}
```

## 📝 四、在 SCSS 文件中使用

### 4.1 导入变量和 Mixins

```scss
// 在你的组件样式文件中
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.my-component {
  padding: $spacing-md;
  background-color: $bg-color;
  border-radius: $border-radius-base;
  @include flex-center;
  
  .title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $text-color;
    @include text-ellipsis;
  }
  
  .button {
    @include active-effect;
  }
}
```

### 4.2 响应式设计

```scss
.responsive-container {
  padding: $spacing-sm;
  
  // 平板以上
  @media (min-width: 768px) {
    padding: $spacing-lg;
  }
  
  // 桌面端
  @media (min-width: 1024px) {
    padding: $spacing-xl;
  }
}
```

## 🎯 五、最佳实践

### 1. 优先使用工具类

```tsx
// ✅ 推荐：使用工具类
<View className="flex items-center p-md bg-white rounded-base">
  <Text className="text-lg font-bold">标题</Text>
</View>

// ❌ 不推荐：为简单样式写额外的 SCSS
<View className="custom-container">
  <Text className="custom-title">标题</Text>
</View>
```

### 2. 复杂组件使用 Mixins

```scss
// ✅ 推荐：复杂组件使用 SCSS + Mixins
.complex-card {
  @include flex-column;
  padding: $spacing-md;
  background: $bg-color;
  border-radius: $border-radius-base;
  box-shadow: $shadow-base;
  
  .header {
    @include flex-between;
    margin-bottom: $spacing-sm;
  }
  
  .content {
    @include text-ellipsis-multi(3);
  }
}
```

### 3. 保持一致性

```scss
// ✅ 推荐：使用变量保持一致
.button {
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-base;
  background-color: $primary-color;
}

// ❌ 不推荐：硬编码值
.button {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #1677ff;
}
```

## 🚀 六、进阶用法

### 1. 主题定制

如需自定义主题，修改 `variables.scss` 中的颜色变量：

```scss
// 自定义主题色
$primary-color: #ff6b6b;  // 改为红色主题
$success-color: #51cf66;  // 自定义成功色
```

### 2. 扩展工具类

在 `utilities.scss` 中添加自定义工具类：

```scss
// 添加自定义工具类
.text-gradient {
  background: linear-gradient(to right, $primary-color, $primary-light);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### 3. 添加自定义 Mixin

在 `mixins.scss` 中添加：

```scss
// 添加自定义 Mixin
@mixin custom-card {
  background: $bg-color;
  border-radius: $border-radius-base;
  box-shadow: $shadow-base;
  padding: $spacing-md;
  @include active-effect;
}
```

## 📚 七、参考资源

- [Sass 官方文档](https://sass-lang.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/) - 工具类设计参考
- [Ant Design](https://ant.design/) - 设计规范参考
