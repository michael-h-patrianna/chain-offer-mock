import React from 'react'
import { useCountdownTimer } from '../../hooks/useCountdownTimer'

export interface QuestlineTimerProps {
  endTime: string | number
  onCountdownEnd?: () => void
  className?: string
}

export const QuestlineTimer: React.FC<QuestlineTimerProps> = ({
  endTime,
  onCountdownEnd,
  className = ''
}) => {
  const timeLeft = useCountdownTimer(endTime, onCountdownEnd)

  return (
    <div
      className={`questline-timer ${className}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Time remaining: ${timeLeft}`}
    >
      <p aria-hidden="true">{timeLeft}</p>
    </div>
  )
}
