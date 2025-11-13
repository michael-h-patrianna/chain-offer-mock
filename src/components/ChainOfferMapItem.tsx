import React, { useCallback } from 'react'
import { ChainOfferMapButton } from './ChainOfferMapButton'
import { ChainOfferMapRewards, type Reward } from './ChainOfferMapRewards'

export interface ChainOfferMapItemProps {
  id: string
  name: string
  position: number
  status: 'LOCKED' | 'UNLOCKED' | 'CLAIMED'
  type: 'FREE' | 'PURCHASE'
  rewards: Reward[]
  price?: number
  backgroundImage?: string
  onButtonClick?: (id: string) => void
  className?: string
}

export const ChainOfferMapItem: React.FC<ChainOfferMapItemProps> = ({
  id,
  name,
  position,
  status,
  type,
  rewards,
  price,
  backgroundImage,
  onButtonClick,
  className = ''
}) => {
  const handleButtonClick = () => {
    if (onButtonClick && status === 'UNLOCKED') {
      onButtonClick(id)
    }
  }

  const getWrapperClass = () => {
    return 'chain-offer-map-item-wrapper'
  }

  const getItemClass = () => {
    const baseClass = 'chain-offer-map-item'
    const classes = [baseClass, className]

    if (status === 'LOCKED') classes.push(`${baseClass}--locked`)
    if (status === 'CLAIMED') classes.push(`${baseClass}--claimed`)
    if (type === 'PURCHASE') classes.push(`${baseClass}--purchase`)
    if (type === 'FREE') classes.push(`${baseClass}--free`)

    return classes.filter(Boolean).join(' ')
  }

  const wrapperRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.style.setProperty('--offer-step-order', `${position}`)
      node.style.setProperty('--offer-step-total', '6')
    }
  }, [position])

  const itemRefCallback = useCallback((node: HTMLDivElement | null) => {
    if (node && backgroundImage) {
      node.style.setProperty('--offer-step-background-image', `url(${backgroundImage})`)
    }
  }, [backgroundImage])

  const showDivider = position < 6

  return (
    <div ref={wrapperRefCallback} className={getWrapperClass()}>
      <div ref={itemRefCallback} className={getItemClass()}>
        <div className="chain-offer-map-item__content">
          <div className="chain-offer-map-item__offers">
            <ChainOfferMapRewards rewards={rewards} />
          </div>
          <div className="chain-offer-map-item__button-container">
            <ChainOfferMapButton
              status={status}
              type={type}
              price={price}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
      {showDivider && (
        <div className="chain-offer-map-item__divider" aria-hidden>
          <img
            alt="Next step"
            className="chain-offer-map-item__divider-image"
            src="https://storage.googleapis.com/www.playfame.com/images/Arrow_icon.png"
          />
        </div>
      )}
    </div>
  )
}
