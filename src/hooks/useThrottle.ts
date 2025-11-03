import { useEffect, useRef, useState } from 'react'

/**
 * 节流 Hook
 * 
 * @param value - 需要节流的值
 * @param delay - 节流间隔（毫秒）
 * @returns 节流后的值
 * 
 * @example
 * ```tsx
 * const [scrollY, setScrollY] = useState(0)
 * const throttledScrollY = useThrottle(scrollY, 200)
 * 
 * useEffect(() => {
 *   // 只在滚动停止 200ms 内最多执行一次
 *   handleScrollChange(throttledScrollY)
 * }, [throttledScrollY])
 * ```
 */
export function useThrottle<T>(value: T, delay: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {
    const now = Date.now()
    const timeElapsed = now - lastExecuted.current

    if (timeElapsed >= delay) {
      // 已超过节流时间，立即更新
      lastExecuted.current = now
      setThrottledValue(value)
    } else {
      // 未超过节流时间，设置定时器在剩余时间后更新
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, delay - timeElapsed)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [value, delay])

  return throttledValue
}
