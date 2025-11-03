import { useEffect, useState } from 'react'

/**
 * 防抖 Hook
 * 
 * @param value - 需要防抖的值
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的值
 * 
 * @example
 * ```tsx
 * const [searchText, setSearchText] = useState('')
 * const debouncedSearchText = useDebounce(searchText, 500)
 * 
 * useEffect(() => {
 *   // 只在用户停止输入 500ms 后执行搜索
 *   if (debouncedSearchText) {
 *     performSearch(debouncedSearchText)
 *   }
 * }, [debouncedSearchText])
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 设置定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 清理函数：在值变化时清除上一个定时器
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
