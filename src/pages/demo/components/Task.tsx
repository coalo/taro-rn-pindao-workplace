import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { tools, pathMap, check, request, apiMap } from '@/utils'

interface TaskProps {
  taskInfo: any
  storeInfo: any
  width?: string
  onRefreshTaskInfo?: () => void
}

const Task: React.FC<TaskProps> = ({ taskInfo, storeInfo, width, onRefreshTaskInfo }) => {
  const [lock, setLock] = useState(false)

  // 跳转任务详情
  const handleGoTaskDetail = () => {
    const { taskId, activityId, strategyId, expireTime } = taskInfo
    // TODO: 实现路径跳转
    // Taro.navigateTo({
    //   url: `${pathMap.taskDetail}?taskId=${taskId}&activityId=${activityId}&strategyId=${strategyId}&expireTime=${expireTime}`
    // })
    // getApp().gioGlobal.gio('track', 'clickTask', { id: taskId })
    console.log('handleGoTaskDetail:', taskId)
    Taro.showToast({ title: '任务详情', icon: 'none' })
  }

  // 点击任务
  const handleTaskClick = () => {
    if (lock) return

    const { taskId, taskState, activityId, serialNo, popTips, strategyId, buttonContent } = taskInfo

    if (taskState === 10) {
      // TODO: 实现 check.isMember
      // if (!check.isMember()) {
      //   tools.loginIntercept({
      //     loginType: 'phone',
      //     callback: () => {
      //       check.isMember() && gainTask(activityId, strategyId, serialNo)
      //     }
      //   })
      //   return
      // }
      gainTask(activityId, strategyId, serialNo)
    } else if (taskState === 11) {
      Taro.showToast({
        title: popTips,
        duration: 2000,
        icon: 'none'
      })
    } else if (taskState === 20) {
      // TODO: 实现路径跳转
      // Taro.navigateTo({
      //   url: `${pathMap.taskDetail}?taskId=${taskId}&activityId=${activityId}&strategyId=${strategyId}`
      // })
      console.log('任务进行中，跳转详情')
      Taro.showToast({ title: '任务进行中', icon: 'none' })
    } else if (taskState === 30) {
      clickTaskReward(taskId)
    }

    // TODO: 实现 GIO 埋点
    // getApp().gioGlobal.gio('track', 'IndexTaskClick', {
    //   TaskActivityID: activityId,
    //   storeID_var: storeInfo.storeId || '',
    //   TaskButton: buttonContent
    // })
    console.log('IndexTaskClick:', activityId, buttonContent)
  }

  // 点击任务奖励
  const clickTaskReward = async (taskId: string) => {
    try {
      // TODO: 实现 request
      // await request(apiMap.clickTaskReward, { taskId })
      // TODO: 打开奖励弹窗
      console.log('clickTaskReward:', taskId)
      Taro.showToast({ title: '领取奖励成功', icon: 'none' })
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
    }
  }

  // 领取任务
  const gainTask = async (activityId: string, strategyId: string, serialNo: string) => {
    setLock(true)

    try {
      // TODO: 实现 request
      // await request(apiMap.gainTask, { activityId, strategyId, serialNo })
      setLock(false)
      Taro.showToast({
        title: '任务领取成功',
        icon: 'none'
      })
      onRefreshTaskInfo?.()
      await getTemplateWxApp()
    } catch (err: any) {
      setLock(false)
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
    }
  }

  // 获取订阅消息模板
  const getTemplateWxApp = async () => {
    try {
      // TODO: 实现 request 和订阅消息
      // const res = await request(apiMap.postTemplateWxApp, { type: 23 })
      // Taro.requestSubscribeMessage({
      //   tmplIds: res.data,
      //   success: (suc) => {
      //     if (suc[res.data[0]] === 'accept') {
      //       subscribeMessage()
      //     }
      //     if (res.data.some(item => suc[item] && suc[item] === 'accept')) {
      //       request(apiMap.templateMsgSubscribe, {
      //         templateIdList: res.data,
      //         selectForever: false,
      //         sceneType: 23
      //       })
      //     }
      //   }
      // })
      console.log('getTemplateWxApp')
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
    }
  }

  // 订阅消息
  const subscribeMessage = async () => {
    try {
      // TODO: 实现 request
      // const res = await request(apiMap.getTaskSubscribe)
      // Taro.requestSubscribeMessage({
      //   tmplIds: res.data,
      //   success: (suc) => {
      //     if (res.data.some(item => suc[item] && suc[item] === 'accept')) {
      //       request(apiMap.templateMsgSubscribe, {
      //         templateIdList: res.data,
      //         selectForever: false
      //       })
      //     }
      //   }
      // })
      console.log('subscribeMessage')
    } catch (err: any) {
      Taro.showToast({
        icon: 'none',
        title: err.message || '请求错误'
      })
    }
  }

  if (!taskInfo || !taskInfo.taskId) {
    return null
  }

  return (
    <View className="task-container" style={{ width: width || 'auto' }}>
      <View className="task-card" onClick={handleTaskClick}>
        <View className="task-header" onClick={(e) => {
          e.stopPropagation()
          handleGoTaskDetail()
        }}>
          <Text className="task-title">{taskInfo.taskName || '任务'}</Text>
          <Text className="task-detail">详情 ›</Text>
        </View>
        <View className="task-content">
          <Text className="task-desc">{taskInfo.taskDesc || ''}</Text>
        </View>
        <View className="task-footer">
          <Text className="task-button">
            {taskInfo.buttonContent || '去完成'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Task
