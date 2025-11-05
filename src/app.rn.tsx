import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import Taro, { useLaunch } from '@tarojs/taro'
import { store } from './store'

function App(props: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched (RN).')
    Taro.switchTab({ url: '/pages/demo-gy/index' })
  })

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
