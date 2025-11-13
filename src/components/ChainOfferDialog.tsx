import { motion } from 'motion/react'
import React from 'react'
import type { AnimationType } from '../animations/revealAnimations'
import { getRevealAnimation } from '../animations/revealAnimations'
import { ChainOfferHeader } from './ChainOfferHeader'
import { ChainOfferList } from './ChainOfferList'
import type { ChainOfferMapItemProps } from './ChainOfferMapItem'
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
  if (!isOpen) return null

  const animation = getRevealAnimation(animationType)

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

        <ChainOfferHeader
          imageSrc={imageSrc}
          endTime={endTime}
          title={title}
          onCountdownEnd={onCountdownEnd}
          headerImageVariants={animation.headerImageVariants}
          timerVariants={animation.timerVariants}
          titleVariants={animation.titleVariants}
        />

        <ChainOfferList
          items={items}
          onItemButtonClick={onItemButtonClick}
          className="chain-offer-dialog__content"
          animationType={animationType}
        />

        {termsUrl && (
          <motion.footer
            className="chain-offer-dialog__footer"
            variants={animation.footerVariants}
            initial="hidden"
            animate="visible"
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
      </dialog>
    </div>
  )
}
