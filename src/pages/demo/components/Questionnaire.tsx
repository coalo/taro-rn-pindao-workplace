import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { tools, pathMap, check } from '@/utils'

interface QuestionnaireProps {
  pageFrom: string
  questionnaireInfo: any
  orderStoreId?: string
  orderStoreName?: string
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  pageFrom,
  questionnaireInfo,
  orderStoreId = '',
  orderStoreName = ''
}) => {
  const defaultImage = 'https://trade-marketing-prod-oss.pin-dao.cn/product/1717384736659.png'

  const handleJoinClick = () => {
    const { activityId } = questionnaireInfo

    // TODO: 实现 check.isMember 和登录拦截
    // if (!check.isMember()) {
    //   tools.loginIntercept({
    //     loginType: 'phone',
    //     callback: () => {
    //       if (check.isMember()) {
    //         Taro.navigateTo({
    //           url: `${pathMap.questionSurvey}?activityId=${activityId}&orderStoreId=${orderStoreId}&orderStoreName=${orderStoreName}`
    //         })
    //       }
    //     }
    //   })
    // } else {
    //   Taro.navigateTo({
    //     url: `${pathMap.questionSurvey}?activityId=${activityId}&orderStoreId=${orderStoreId}&orderStoreName=${orderStoreName}`
    //   })
    // }

    console.log('handleJoinClick:', activityId, orderStoreId, orderStoreName)
    Taro.showToast({
      title: '参与问卷调查',
      icon: 'none'
    })
  }

  if (!questionnaireInfo || !questionnaireInfo.activityId) {
    return null
  }

  return (
    <View className="questionnaire-container">
      <View className="questionnaire-card" onClick={handleJoinClick}>
        <Image
          className="questionnaire-image"
          src={questionnaireInfo.imageUrl || defaultImage}
          mode="aspectFill"
        />
        <View className="questionnaire-content">
          <Text className="questionnaire-title">
            {questionnaireInfo.title || '问卷调查'}
          </Text>
          <Text className="questionnaire-desc">
            {questionnaireInfo.desc || '参与调查，赢取好礼'}
          </Text>
          <View className="questionnaire-button">
            <Text>立即参与</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Questionnaire
