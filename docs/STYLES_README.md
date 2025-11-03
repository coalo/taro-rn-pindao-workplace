# 公共样式模块说明

## 📦 已创建的文件

### 样式文件
```
src/styles/
├── index.scss        # 入口文件（已在 app.scss 中引入）
├── variables.scss    # 样式变量（颜色、字体、间距等）
├── mixins.scss       # Mixins（可复用的样式函数）
└── utilities.scss    # 工具类（原子类样式）
```

### 文档和示例
```
docs/
└── STYLES_GUIDE.md   # 详细使用文档

src/pages/
├── mine/             # "我的"页面（已重构，展示实际应用）
│   ├── index.tsx
│   └── index.scss
└── examples/         # 示例页面
    ├── quick-start.tsx
    └── quick-start.scss
```

## 🎯 核心特性

### 1. 设计系统规范
- ✅ **统一的颜色系统**：主色、功能色、中性色
- ✅ **完整的字体系统**：字号、字重、行高
- ✅ **标准化间距**：4px 基础单位，8 个间距级别
- ✅ **圆角和阴影**：7 种圆角 + 6 种阴影
- ✅ **Z-Index 管理**：统一的层级管理

### 2. 三种使用方式

#### 方式一：工具类（推荐用于简单布局）
```tsx
<View className="bg-white rounded-base shadow-base p-md">
  <Text className="text-lg font-bold">标题</Text>
</View>
```

#### 方式二：SCSS + 变量/Mixins（推荐用于复杂组件）
```scss
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.my-component {
  padding: $spacing-md;
  @include flex-center;
}
```

#### 方式三：混合使用（最佳实践）
```tsx
<View className="bg-white p-md custom-component">
  <Text className="text-lg font-bold">混合使用</Text>
</View>
```

### 3. 丰富的 Mixins 库

- **布局 Mixins**：flex-center, flex-between, flex-column-center 等
- **文本 Mixins**：text-ellipsis, text-ellipsis-multi, text-no-select
- **尺寸 Mixins**：square, circle, aspect-ratio
- **定位 Mixins**：absolute-center, absolute-full, fixed-full
- **视觉效果**：hide-scrollbar, glass-effect, gradient-bg
- **交互效果**：active-effect, hover-effect, disabled-state
- **动画**：fade-in, slide-up, zoom-in

### 4. 完整的工具类

200+ 原子类，涵盖：
- 间距（m-*, p-*, mt-*, mb-*, ml-*, mr-*, pt-*, pb-* 等）
- 文本（text-*, font-*, text-ellipsis）
- Flex 布局（flex, items-*, justify-*, flex-1）
- 颜色（bg-*, text-*, border-*）
- 圆角和阴影（rounded-*, shadow-*）
- 显示和定位（block, hidden, relative, absolute）

## 🚀 快速开始

### 1. 全局引入（已完成）
```scss
// src/app.scss
@import './styles/index.scss';
```

### 2. 在组件中使用工具类
```tsx
import { View, Text } from '@tarojs/components'

export default function MyComponent() {
  return (
    <View className="bg-white rounded-base shadow-base p-md m-md">
      <Text className="text-lg font-bold mb-sm">标题</Text>
      <Text className="text-sm text-secondary">描述文本</Text>
    </View>
  )
}
```

### 3. 在 SCSS 中使用变量和 Mixins
```scss
// your-component.scss
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.my-component {
  padding: $spacing-md;
  background-color: $bg-color;
  @include flex-center;
  
  .title {
    color: $primary-color;
    font-size: $font-size-lg;
    @include text-ellipsis;
  }
}
```

## 📝 实际应用示例

### 示例 1：查看"我的"页面
打开 `src/pages/mine/index.tsx` 查看完整的实际应用示例：
- 用户信息卡片
- 统计数据展示
- 菜单列表
- 徽章和图标

### 示例 2：查看快速开始示例
打开 `src/pages/examples/quick-start.tsx` 查看各种组合示例：
- 工具类使用
- SCSS 自定义样式
- 混合使用
- 常用组合模式

## 🎨 设计规范

### 颜色使用规范
```scss
// 主色 - 用于主要操作、链接
$primary-color: #1677ff

// 成功 - 用于成功提示、完成状态
$success-color: #52c41a

// 警告 - 用于警告提示、需要注意的内容
$warning-color: #faad14

// 错误 - 用于错误提示、危险操作
$error-color: #ff4d4f
```

### 间距使用规范
```scss
// 元素内部间距：p-sm (8px) 或 p-md (16px)
// 元素外部间距：m-md (16px) 或 m-lg (20px)
// 小间距：xs (4px), sm (8px)
// 大间距：xl (24px), xxl (32px)
```

### 字号使用规范
```scss
// 大标题：text-xl (20px) 或 text-xxl (24px)
// 标题：text-lg (18px) 或 text-md (16px)
// 正文：text-base (14px)
// 辅助文字：text-sm (12px) 或 text-xs (10px)
```

## 💡 最佳实践

### 1. 优先使用工具类
对于简单的布局和样式，优先使用工具类，避免编写额外的 CSS。

### 2. 复杂组件使用 Mixins
对于需要复用的复杂样式，使用 Mixins 提取公共逻辑。

### 3. 保持一致性
始终使用样式变量，避免硬编码颜色、间距等值。

### 4. 语义化命名
自定义类名要语义化，表达组件的功能而非样式。

### 5. 响应式设计
使用媒体查询和 rem/em 单位实现响应式布局。

## 📖 扩展文档

详细使用文档请查看：`docs/STYLES_GUIDE.md`

包含：
- 完整的变量列表
- 所有 Mixins 的详细说明
- 工具类速查表
- 高级用法和技巧
- 主题定制方法

## 🔄 维护和更新

### 添加新的设计规范
1. 在 `variables.scss` 中添加新变量
2. 在 `mixins.scss` 中添加新的 Mixin
3. 在 `utilities.scss` 中添加新的工具类
4. 更新 `STYLES_GUIDE.md` 文档

### 主题定制
修改 `variables.scss` 中的颜色变量即可实现主题切换。

## ✨ 优势总结

1. **提高开发效率**：工具类和 Mixins 大幅减少重复代码
2. **保持一致性**：统一的设计规范确保视觉一致
3. **易于维护**：集中管理样式，修改更方便
4. **团队协作**：清晰的规范便于团队成员理解和使用
5. **响应式友好**：基于变量的设计便于适配不同屏幕

## 🎯 下一步

1. ✅ 查看 `docs/STYLES_GUIDE.md` 详细文档
2. ✅ 参考 `src/pages/mine/index.tsx` 实际应用
3. ✅ 运行项目查看效果
4. ✅ 在新页面中应用公共样式
5. ✅ 根据项目需求定制主题

---

**Happy Styling! 🎨**
