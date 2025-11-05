import Taro from '@tarojs/taro'
import check from './check'

/**
 * 路由导航工具 - 与原生 navigate 保持同名导出
 */
class Navigate {
  /**
   * 跳转页面
   */
  to(url: string): void {
    if (!url) return
    Taro.navigateTo({ url })
  }
  
  /**
   * 返回上一页
   */
  back(delta: number = 1): void {
    Taro.navigateBack({ delta })
  }
  
  /**
   * 重启到页面
   */
  relaunch(url: string): void {
    if (!url) return
    Taro.reLaunch({ url })
  }

  /**
   * 重定向到页面
   */
  redirect(url: string): void {
    if (!url) return
    Taro.redirectTo({ url })
  }

  /**
   * 切换到Tab页面
   */
  switchTab(url: string): void {
    if (!url) return
    Taro.switchTab({ url })
  }

  /**
   * 路由拦截器
   */
  intercept(path: string, params?: string): boolean {
    // 简化版本，直接返回true允许跳转
    // 原始逻辑可能包含登录校验、权限检查等
    return true
  }
}

const navigate = new Navigate()
export default navigate
