/**
 * 全局状态管理 - 替代原生小程序的 globalData
 */
import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

// 全局状态接口定义
export interface GlobalState {
  // 授权相关
  authResolve: ((res: boolean) => void) | null
  accessToken: string | null
  openId: string | null
  unionId: string | null
  
  // 状态标记
  hasSilentLogin: boolean
  hasSelectStore: boolean
  
  // 业务数据
  channel: number
  stallType: string | null
  strategyGroup: Record<string, any>
  agreementInfo: any[]
  userInfo: Record<string, any>
  configInfo: Record<string, any>
  shareInfo: Record<string, any>
  addressInfo: Record<string, any>
  storeInfo: Record<string, any>
  normalCartInfo: Record<string, any>
  pieceCartInfo: Record<string, any>
  pieceInfo: Record<string, any>
  couponInfo: Record<string, any>
  activeInfo: Record<string, any>
  positionInfo: Record<string, any>
  systemInfo: Record<string, any>
  popupInfo: Record<string, any>
  queryInfo: Record<string, any>
}

// 默认状态
const defaultState: GlobalState = {
  authResolve: null,
  accessToken: null,
  openId: null,
  unionId: null,
  hasSilentLogin: false,
  hasSelectStore: false,
  channel: 2,
  stallType: null,
  strategyGroup: {},
  agreementInfo: [],
  userInfo: {},
  configInfo: {},
  shareInfo: {},
  addressInfo: {},
  storeInfo: {},
  normalCartInfo: {},
  pieceCartInfo: {},
  pieceInfo: {},
  couponInfo: {},
  activeInfo: {},
  positionInfo: {},
  systemInfo: {},
  popupInfo: {},
  queryInfo: {}
}

// Context 定义
interface AppContextType {
  state: GlobalState
  setState: (updater: Partial<GlobalState> | ((prev: GlobalState) => GlobalState)) => void
  updateState: (updates: Partial<GlobalState>) => void
}

const AppContext = createContext<AppContextType>({
  state: defaultState,
  setState: () => {},
  updateState: () => {}
})

// Provider 组件
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setInnerState] = useState<GlobalState>(defaultState)

  const setState = (updater: Partial<GlobalState> | ((prev: GlobalState) => GlobalState)) => {
    if (typeof updater === 'function') {
      setInnerState(updater)
    } else {
      setInnerState(prev => ({ ...prev, ...updater }))
    }
  }

  const updateState = (updates: Partial<GlobalState>) => {
    setInnerState(prev => ({ ...prev, ...updates }))
  }

  const value = useMemo(() => ({ state, setState, updateState }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Hook 导出
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

export default AppContext
