/**
 * Props for the LoyaltyLevelName component.
 */
export interface LoyaltyLevelNameProps {
  /** The current level number */
  levelNumber: number
  /** Optional custom level name (e.g., "Gold", "Platinum") */
  customName?: string
}

/**
 * LoyaltyLevelName displays the user's current loyalty level name.
 *
 * By default, it shows "Level X" where X is the level number.
 * Can be customized to show named levels like "Gold" or "Platinum".
 *
 * @param props - Component props
 * @returns The LoyaltyLevelName component
 *
 * @example
 * ```tsx
 * // Numbered level
 * <LoyaltyLevelName levelNumber={12} />
 *
 * // Named level
 * <LoyaltyLevelName levelNumber={12} customName="Gold" />
 * ```
 */
export const LoyaltyLevelName = ({
  levelNumber,
  customName,
}: LoyaltyLevelNameProps) => {
  const displayName = customName || `Level ${levelNumber}`

  return (
    <p className='loyalty-level-name'>
      {displayName}
    </p>
  )
}

export default LoyaltyLevelName
