import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserInfo } from '../models/user'

interface UserState {
  /** 当前登录用户信息 */
  userInfo: UserInfo | null
  /** 是否已登录 */
  isLogin: boolean
  /** 访问令牌 */
  token: string | null
}

const initialState: UserState = {
  userInfo: null,
  isLogin: false,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
      state.isLogin = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    login: (state, action: PayloadAction<{ userInfo: UserInfo; token: string }>) => {
      state.userInfo = action.payload.userInfo
      state.token = action.payload.token
      state.isLogin = true
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.isLogin = false
    },
    updateUserInfo: (state, action: PayloadAction<Partial<UserInfo>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload }
      }
    },
  },
})

export const { setUserInfo, setToken, login, logout, updateUserInfo } = userSlice.actions
export default userSlice.reducer
