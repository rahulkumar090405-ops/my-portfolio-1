import { useEffect, useState } from 'react'

export function AnimatedCounter({ value, suffix = '', duration = 1200 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = Math.max(1, Math.ceil(value / (duration / 16)))

    const timer = window.setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        window.clearInterval(timer)
        return
      }
      setCount(start)
    }, 16)

    return () => window.clearInterval(timer)
  }, [value, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
