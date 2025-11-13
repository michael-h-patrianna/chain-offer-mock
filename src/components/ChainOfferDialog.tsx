import { motion } from 'motion/react'
import React, { useMemo } from 'react'
import type { AnimationType } from '../animations/revealAnimations'
import { getRevealAnimation } from '../animations/revealAnimations'
import { useAnimationParameters } from '../hooks/useAnimationParameters'
import { applyAnimationParameters } from '../utils/applyAnimationParameters'
import { ChainOfferTimer } from './ChainOfferTimer'
import { ChainOfferMapItem, type ChainOfferMapItemProps } from './ChainOfferMapItem'
import './styles.css'

export interface ChainOfferDialogProps {
  isOpen: boolean
  imageSrc: string
  endTime: string | number
  title?: string
  items: Omit<ChainOfferMapItemProps, 'onButtonClick'>[]
  termsUrl?: string
  onClose: () => void
  onItemButtonClick?: (itemId: string) => void
  onCountdownEnd?: () => void
  className?: string
  animationType?: AnimationType
}

export const ChainOfferDialog: React.FC<ChainOfferDialogProps> = ({
  isOpen,
  imageSrc,
  endTime,
  title,
  items,
  termsUrl,
  onClose,
  onItemButtonClick,
  onCountdownEnd,
  className = '',
  animationType = 'none'
}) => {
  const { getParameters } = useAnimationParameters()

  const animation = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="chain-offer-dialog-backdrop" onClick={handleBackdropClick}>
      <dialog open className={`chain-offer-dialog ${className}`}>
        <button
          className="chain-offer-dialog__close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z" />
          </svg>
        </button>

        {/* Scrollable wrapper */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} className="chain-offer-dialog__content">
          {/* Stagger container with visible overflow for scale animations */}
          <motion.div
            key={`chain-offer-stagger-${animationType}`}
            variants={animation.containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', overflow: 'visible', padding: '0 16px' }}
          >
            {/* Header - staggered */}
            <motion.div variants={animation.itemVariants}>
              <header className="chain-offer-header">
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
            </motion.div>

            {/* Items container */}
            <section className="content" style={{ overflow: 'visible' }}>
              {/* Each item is staggered */}
              {items.map((item) => (
                <ChainOfferMapItem
                  key={item.id}
                  {...item}
                  onButtonClick={onItemButtonClick}
                  animationVariants={animation.itemVariants}
                />
              ))}
            </section>

            {/* Footer - staggered */}
            {termsUrl && (
              <motion.footer
                className="chain-offer-dialog__footer"
                variants={animation.itemVariants}
              >
                <a
                  href={termsUrl}
                  className="chain-offer-dialog__terms-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </a>
              </motion.footer>
            )}
          </motion.div>
        </div>
      </dialog>
    </div>
  )
}
