import React from 'react'
import { ChainOfferMapItem, type ChainOfferMapItemProps } from './ChainOfferMapItem'

export interface ChainOfferListProps {
  items: Omit<ChainOfferMapItemProps, 'onButtonClick'>[]
  onItemButtonClick?: (itemId: string) => void
  className?: string
}

export const ChainOfferList: React.FC<ChainOfferListProps> = ({
  items,
  onItemButtonClick,
  className = ''
}) => {
  return (
    <section className={`chain-offer-list ${className}`}>
      {items.map((item, index) => (
        <ChainOfferMapItem
          key={item.id}
          {...item}
          onButtonClick={onItemButtonClick}
        />
      ))}
    </section>
  )
}
