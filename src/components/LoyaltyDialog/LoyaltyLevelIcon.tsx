/**
 * Props for the LoyaltyLevelIcon component.
 */
export interface LoyaltyLevelIconProps {
  /** The current level number to display */
  levelNumber: number
  /** Optional custom icon source URL */
  iconSrc?: string
  /** Alt text for the icon */
  alt?: string
}

/**
 * LoyaltyLevelIcon displays the user's current loyalty level badge.
 *
 * This component renders a numbered level badge with a decorative background.
 * It can display either a custom icon or a default styled badge with the level number.
 *
 * @param props - Component props
 * @returns The LoyaltyLevelIcon component
 *
 * @example
 * ```tsx
 * <LoyaltyLevelIcon levelNumber={12} />
 * ```
 */
export const LoyaltyLevelIcon = ({ levelNumber, iconSrc, alt = 'Level badge' }: LoyaltyLevelIconProps) => {
  if (iconSrc) {
    return (
      <div className='loyalty-level-icon'>
        <img src={iconSrc} alt={alt} className='loyalty-level-icon__image' />
      </div>
    )
  }

  // Default badge rendering without custom icon
  return (
    <div className='loyalty-level-icon loyalty-level-icon--default'>
      <div className='loyalty-level-icon__badge'>
        <span className='loyalty-level-icon__number'>{levelNumber}</span>
      </div>
    </div>
  )
}

export default LoyaltyLevelIcon
