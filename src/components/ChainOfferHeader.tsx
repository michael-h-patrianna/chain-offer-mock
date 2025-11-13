import React from 'react'
import { ChainOfferTimer } from './ChainOfferTimer'

export interface ChainOfferHeaderProps {
  imageSrc: string
  endTime: string | number
  title?: string
  onCountdownEnd?: () => void
  className?: string
}

export const ChainOfferHeader: React.FC<ChainOfferHeaderProps> = ({
  imageSrc,
  endTime,
  title,
  onCountdownEnd,
  className = ''
}) => {
  return (
    <header className={`chain-offer-header ${className}`}>
      <div className="chain-offer-header__image-box">
        <img
          alt="title"
          className="chain-offer-header__image"
          src={imageSrc}
        />
        <div className="chain-offer-header__timer-box">
          <ChainOfferTimer
            endTime={endTime}
            onCountdownEnd={onCountdownEnd}
            className="chain-offer-header__timer"
          />
        </div>
      </div>
      {title && (
        <p className="chain-offer-header__title">
          {title}
        </p>
      )}
    </header>
  )
}
