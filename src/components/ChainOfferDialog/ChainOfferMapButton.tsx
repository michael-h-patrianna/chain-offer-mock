import React from 'react'

export interface ChainOfferMapButtonProps {
  status: 'LOCKED' | 'UNLOCKED' | 'CLAIMED'
  type: 'FREE' | 'PURCHASE'
  price?: number
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export const ChainOfferMapButton = ({
  status,
  type,
  price,
  disabled,
  onClick,
  className = '',
}: ChainOfferMapButtonProps) => {
  const isLocked = status === 'LOCKED'
  const isClaimed = status === 'CLAIMED'
  const isDisabled = disabled || isLocked || isClaimed

  const getButtonText = () => {
    if (isClaimed) return 'CLAIMED'
    if (type === 'PURCHASE' && price) return `$${price.toFixed(2)}`
    return 'Free'
  }

  const getButtonClass = () => {
    const baseClass = 'chain-offer-map-button'
    const classes = [baseClass, className]

    if (isLocked) classes.push(`${baseClass}--locked`)
    if (isClaimed) classes.push(`${baseClass}--claimed`)
    if (type === 'PURCHASE') classes.push(`${baseClass}--purchase`)
    if (type === 'FREE') classes.push(`${baseClass}--free`)

    return classes.filter(Boolean).join(' ')
  }

  const getAriaLabel = () => {
    if (isLocked) return 'Locked offer. Complete previous offers to unlock.'
    if (isClaimed) return 'Offer already claimed'
    if (type === 'PURCHASE' && price) return `Purchase offer for $${price.toFixed(2)}`
    return 'Claim free offer'
  }

  return (
    <button
      type='button'
      className={getButtonClass()}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={getAriaLabel()}
    >
      {isLocked && (
        <span className='chain-offer-map-button__lock' aria-hidden>
          <svg
            className='chain-offer-map-button__lock-icon'
            viewBox='0 0 24 24'
            focusable='false'
            width='14'
            height='14'
          >
            <path
              fill='currentColor'
              d='M12 17a2 2 0 0 0 2-2c0-1.11-.9-2-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.9-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z'
            />
          </svg>
        </span>
      )}
      <span className='chain-offer-map-button__text'>{getButtonText()}</span>
    </button>
  )
}
