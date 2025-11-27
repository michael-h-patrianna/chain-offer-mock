/**
 * Props for the LoyaltyProgressBar component.
 */
export interface LoyaltyProgressBarProps {
  /** Progress percentage (0-100) */
  percentage: number
  /** The next level number to display */
  nextLevelNumber: number
  /** Optional icon source for the next level badge */
  nextLevelIconSrc?: string
  /** Optional additional CSS class */
  className?: string
}

/**
 * LoyaltyProgressBar displays progress toward the next loyalty level.
 *
 * Shows a horizontal progress bar with the current percentage and
 * the next level indicator on the right side.
 *
 * @param props - Component props
 * @returns The LoyaltyProgressBar component
 *
 * @example
 * ```tsx
 * <LoyaltyProgressBar
 *   percentage={65}
 *   nextLevelNumber={13}
 * />
 * ```
 */
export const LoyaltyProgressBar = ({
  percentage,
  nextLevelNumber,
  nextLevelIconSrc,
  className = '',
}: LoyaltyProgressBarProps) => {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage))

  return (
    <div className={`loyalty-progress-bar ${className}`}>
      {/* Progress track */}
      <div className='loyalty-progress-bar__track'>
        {/* Progress fill */}
        <div
          className='loyalty-progress-bar__fill'
          style={{ width: `${clampedPercentage}%` }}
        />
        {/* Progress text */}
        <span className='loyalty-progress-bar__text'>
          {Math.round(clampedPercentage)}%
        </span>
      </div>

      {/* Next level indicator */}
      <div className='loyalty-progress-bar__next-level'>
        {nextLevelIconSrc ? (
          <img
            src={nextLevelIconSrc}
            alt={`Level ${nextLevelNumber}`}
            className='loyalty-progress-bar__next-icon'
          />
        ) : (
          <div className='loyalty-progress-bar__next-badge'>
            <span className='loyalty-progress-bar__next-number'>{nextLevelNumber}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoyaltyProgressBar
