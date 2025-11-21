import { motion } from 'motion/react'
import type { Variants } from 'motion/types'
import React from 'react'
import { ChainOfferTimer } from './ChainOfferTimer'

export interface ChainOfferHeaderProps {
  imageSrc: string
  endTime: string | number
  title?: string
  onCountdownEnd?: () => void
  className?: string
  headerImageVariants?: Variants
  timerVariants?: Variants
  titleVariants?: Variants
}

export const ChainOfferHeader: React.FC<ChainOfferHeaderProps> = ({
  imageSrc,
  endTime,
  title,
  onCountdownEnd,
  className = '',
  headerImageVariants,
  timerVariants,
  titleVariants
}) => {
  return (
    <header className={`chain-offer-header ${className}`}>
      <motion.div
        className="chain-offer-header__image-box"
        variants={headerImageVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          alt="title"
          className="chain-offer-header__image"
          src={imageSrc}
        />
        <motion.div
          className="chain-offer-header__timer-box"
          variants={timerVariants}
          initial="hidden"
          animate="visible"
        >
          <ChainOfferTimer
            endTime={endTime}
            onCountdownEnd={onCountdownEnd}
            className="chain-offer-header__timer"
          />
        </motion.div>
      </motion.div>
      {title && (
        <motion.p
          className="chain-offer-header__title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.p>
      )}
    </header>
  )
}
