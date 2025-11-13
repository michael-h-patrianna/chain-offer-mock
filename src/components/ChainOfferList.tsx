import { motion } from 'motion/react'
import React from 'react'
import { AnimationType, getRevealAnimation } from '../animations/revealAnimations'
import { ChainOfferMapItem, type ChainOfferMapItemProps } from './ChainOfferMapItem'

export interface ChainOfferListProps {
  items: Omit<ChainOfferMapItemProps, 'onButtonClick'>[]
  onItemButtonClick?: (itemId: string) => void
  className?: string
  animationType?: AnimationType
}

export const ChainOfferList: React.FC<ChainOfferListProps> = ({
  items,
  onItemButtonClick,
  className = '',
  animationType = 'none'
}) => {
  const animation = getRevealAnimation(animationType)

  return (
    <motion.section
      className={`content ${className}`}
      variants={animation.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <ChainOfferMapItem
          key={item.id}
          {...item}
          onButtonClick={onItemButtonClick}
          animationVariants={animation.itemVariants}
        />
      ))}
    </motion.section>
  )
}
