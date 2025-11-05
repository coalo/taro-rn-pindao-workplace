import { ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { getPlatform } from '@/utils/platform'
import { PdView, PdText, PdButton } from '@/components/PdCore'




export default function Demo() {
  useLoad(() => {
    console.log('Demo page loaded.')
  })

  const platform = getPlatform()
  console.log('Current platform:', platform)

  const handleButtonClick = (type: string) => {
    Taro.showToast({
      title: `点击了${type}按钮`,
      icon: 'none'
    })
  }

  return (
    <ScrollView className="bg-secondary">
      <PdView className="p-16">
        {/* 页面标题 */}
        <PdView className="bg-primary rounded-20 p-24 mb-16">
          <PdText className="font-24 text-inverse mb-8">Pd 组件演示</PdText>
          <PdText className="font-14 text-inverse">当前平台: {platform}</PdText>
        </PdView>

        <PdView className="py-8">
          <PdText className="font-14 text-secondary mb-16">
            Pd 组件跨端示例：RN 端原子类映射到 tokens；小程序端映射到 SCSS。
          </PdText>

          {/* 示例：布局与文字 */}
          <PdView className="flex flex-row items-center justify-between p-12 rounded-12">
            <PdText className="font-16 text-primary">PdView + PdText 示例</PdText>
            <PdText className="font-12 text-secondary">className → 跨端样式</PdText>
          </PdView>

          {/* 示例：按钮 */}
          <PdView className="mt-12 flex flex-row">
            <PdButton className="p-12 rounded-8 bg-primary mr-12" onClick={() => handleButtonClick('Primary')}>
              <PdText className="font-14">主按钮</PdText>
            </PdButton>
            <PdButton className="p-12 rounded-8 bg-success" onClick={() => handleButtonClick('Success')}>
              <PdText className="font-14">成功按钮</PdText>
            </PdButton>
          </PdView>
        </PdView>

        <PdView className="text-center py-32">
          <PdText className="font-14 text-secondary">以上示例均为跨端统一样式</PdText>
        </PdView>
      </PdView>
    </ScrollView>
  )
}
