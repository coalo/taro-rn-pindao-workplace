import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  /** 应用加载状态 */
  loading: boolean
  /** 当前主题 */
  theme: 'light' | 'dark'
  /** 当前语言 */
  locale: 'zh-CN' | 'en-US'
  /** 网络状态 */
  networkStatus: 'online' | 'offline'
}

const initialState: AppState = {
  loading: false,
  theme: 'light',
  locale: 'zh-CN',
  networkStatus: 'online',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
    setLocale: (state, action: PayloadAction<'zh-CN' | 'en-US'>) => {
      state.locale = action.payload
    },
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload
    },
  },
})

export const { setLoading, setTheme, setLocale, setNetworkStatus } = appSlice.actions
export default appSlice.reducer
