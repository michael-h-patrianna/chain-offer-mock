import { useEffect, useState } from 'react'

/**
 * Shared countdown timer hook
 * Formats time differently based on remaining duration:
 * - More than 24 hours: "Ends in 6d 4h"
 * - Less than 24 hours: "Ends in 23:55:07"
 */
export function useCountdownTimer(
  endTime: string | number,
  onCountdownEnd?: () => void
): string {
  const [timeLeft, setTimeLeft] = useState('')
  const [hasEnded, setHasEnded] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = typeof endTime === 'string'
        ? new Date(endTime).getTime()
        : endTime
      const now = Date.now()
      const difference = targetTime - now

      if (difference <= 0) {
        if (!hasEnded) {
          setHasEnded(true)
          onCountdownEnd?.()
        }
        return 'Expired'
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      // Format like production: "Ends in 23:55:07" for <24h, "Ends in 6d 4h" for >24h
      if (days > 0) {
        return `Ends in ${String(days)}d ${String(hours)}h`
      } else {
        return `Ends in ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      }
    }

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft())
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [endTime, onCountdownEnd, hasEnded])

  return timeLeft
}
