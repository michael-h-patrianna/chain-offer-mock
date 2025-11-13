import { useRef, useEffect, useState } from 'react'

export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value)
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}

interface UseCountdownOptions { isActiveByDefault?: boolean }
export function useCountdown(endTime?: number | string, opts: UseCountdownOptions = {}) {
  const { isActiveByDefault = true } = opts
  // Normalize endTime to epoch ms
  const endMs = typeof endTime === 'string' ? Date.parse(endTime) : endTime
  const [now, setNow] = useState(() => Date.now())
  const isActive = Boolean(isActiveByDefault && endMs && endMs > now)
  useEffect(() => {
    if (!endMs) return
    if (!isActive) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [endMs, isActive])
  const remaining = Math.max(0, (endMs ?? now) - now)
  const totalSeconds = Math.floor(remaining / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  // Short forms: if more than 48h -> show e.g. "6d 5h" else show HH:MM:SS
  const hh = String(hours + days * 24).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  const hms = `${hh}:${mm}:${ss}`
  const short = days >= 2 ? `${days}d ${hours}h` : days === 1 ? `1d ${hours}h` : hms
  return { start: now, end: endMs ?? now, isActive, remainingMs: remaining, days, hours, minutes, seconds, hms, short }
}
