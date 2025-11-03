import { useCallback, useEffect, useState } from 'react'

/**
 * 异步请求状态
 */
export interface AsyncState<T> {
  /** 加载中 */
  loading: boolean
  /** 响应数据 */
  data: T | null
  /** 错误信息 */
  error: Error | null
}

/**
 * 异步请求 Hook 返回值
 */
export interface AsyncResult<T, P extends any[]> extends AsyncState<T> {
  /** 执行异步函数 */
  execute: (...args: P) => Promise<void>
  /** 重置状态 */
  reset: () => void
}

/**
 * 异步请求 Hook
 * 
 * @param asyncFunction - 异步函数
 * @param immediate - 是否立即执行（默认 false）
 * @returns 异步请求状态和控制方法
 * 
 * @example
 * ```tsx
 * const { data, loading, error, execute } = useAsync(
 *   async (userId: string) => {
 *     const response = await fetch(`/api/users/${userId}`)
 *     return response.json()
 *   }
 * )
 * 
 * // 手动触发
 * const handleClick = () => {
 *   execute('123')
 * }
 * 
 * return (
 *   <View>
 *     {loading && <Text>加载中...</Text>}
 *     {error && <Text>错误: {error.message}</Text>}
 *     {data && <Text>{JSON.stringify(data)}</Text>}
 *   </View>
 * )
 * ```
 */
export function useAsync<T, P extends any[] = []>(
  asyncFunction: (...args: P) => Promise<T>,
  immediate: boolean = false
): AsyncResult<T, P> {
  const [state, setState] = useState<AsyncState<T>>({
    loading: immediate,
    data: null,
    error: null,
  })

  const execute = useCallback(
    async (...args: P) => {
      setState({ loading: true, data: null, error: null })
      try {
        const data = await asyncFunction(...args)
        setState({ loading: false, data, error: null })
      } catch (error) {
        setState({
          loading: false,
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
        })
      }
    },
    [asyncFunction]
  )

  const reset = useCallback(() => {
    setState({ loading: false, data: null, error: null })
  }, [])

  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as P))
    }
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
