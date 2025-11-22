import React from 'react'
import { useCountdownTimer } from '../../hooks/useCountdownTimer'

export interface ChainOfferTimerProps {
  endTime: string | number
  onCountdownEnd?: () => void
}

export const ChainOfferTimer: React.FC<ChainOfferTimerProps> = ({
  endTime,
  onCountdownEnd
}) => {
  const timeLeft = useCountdownTimer(endTime, onCountdownEnd)

  return (
    <div
      className="chain-offer-timer__inner"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Time remaining: ${timeLeft}`}
    >
      <span aria-hidden="true">{timeLeft}</span>
    </div>
  )
}
