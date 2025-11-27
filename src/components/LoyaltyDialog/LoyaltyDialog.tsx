import { m, LazyMotion, domAnimation } from 'motion/react'
import { useMemo, useState } from 'react'
import { getRevealAnimation, type AnimationType } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import { applyAnimationParameters } from '../../utils/applyAnimationParameters'
import { CloseButton } from '../Shared/CloseButton'
import { DialogBackdrop } from '../Shared/DialogBackdrop'
import { LoyaltyLevelIcon } from './LoyaltyLevelIcon'
import { LoyaltyLevelName } from './LoyaltyLevelName'
import { LoyaltyProgressBar } from './LoyaltyProgressBar'

/**
 * Props for the LoyaltyDialog component.
 */
export interface LoyaltyDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean
  /** Current level number */
  currentLevel: number
  /** Current level name (e.g., "Newcomer 12", "Rising Star 5") */
  levelName?: string
  /** Progress percentage (0-100) */
  progressPercentage: number
  /** Next level number */
  nextLevel: number
  /** URL for the level badge icon */
  levelIconSrc?: string
  /** URL for the next level badge icon */
  nextLevelIconSrc?: string
  /** URL for the background image */
  backgroundImageSrc?: string
  /** XP variant name (e.g., "Loyalty Points") */
  xpVariantName?: string
  /** XP variant abbreviation (e.g., "LPs") */
  xpVariantAbbreviation?: string
  /** Callback when dialog is closed */
  onClose: () => void
  /** Optional additional CSS class */
  className?: string
  /** Animation type to use for reveal animation */
  animationType?: AnimationType
}

type TabValue = 'my-level' | 'how-to-earn'

/**
 * LoyaltyDialog displays the user's current loyalty level progress.
 *
 * This is a mock component that demonstrates reveal animations for the
 * Loyalty Progress Dialog used in production. It shows:
 * - Current loyalty level with icon
 * - Progress bar toward next level
 * - Tabs for "My Level" and "How to Earn" sections
 *
 * @param props - Component props
 * @returns The LoyaltyDialog component
 *
 * @example
 * ```tsx
 * <LoyaltyDialog
 *   isOpen={true}
 *   currentLevel={12}
 *   progressPercentage={65}
 *   nextLevel={13}
 *   onClose={() => setIsOpen(false)}
 *   animationType="fade-slide"
 * />
 * ```
 */
export const LoyaltyDialog = ({
  isOpen,
  currentLevel,
  levelName,
  progressPercentage,
  nextLevel,
  levelIconSrc,
  nextLevelIconSrc,
  backgroundImageSrc,
  xpVariantName = 'Loyalty Points',
  xpVariantAbbreviation = 'LPs',
  onClose,
  className = '',
  animationType = 'none',
}: LoyaltyDialogProps) => {
  const { getParameters } = useAnimationParameters()
  const [activeTab, setActiveTab] = useState<TabValue>('my-level')

  const animation = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

  if (!isOpen) return null

  return (
    <DialogBackdrop isOpen={isOpen} onClose={onClose} backdropClassName='dialog-backdrop'>
      <dialog
        open
        className={`loyalty-dialog ${className}`}
        aria-modal='true'
        aria-labelledby='loyalty-dialog-title'
      >
        <CloseButton onClick={onClose} aria-label='Close loyalty dialog' />
        <LazyMotion features={domAnimation}>
          <m.div
            key={`loyalty-stagger-${animationType}`}
            variants={animation.containerVariants}
            initial='hidden'
            animate='visible'
            className='loyalty-dialog__container'
          >
            {/* Header Title */}
            <m.header className='loyalty-dialog__header' variants={animation.layer1Variants}>
              <h4 id='loyalty-dialog-title' className='loyalty-dialog__title'>
                My Perks
              </h4>
            </m.header>

            {/* Tabs */}
            <m.div className='loyalty-dialog__tabs' variants={animation.layer1Variants}>
              <button
                type='button'
                className={`loyalty-dialog__tab ${activeTab === 'my-level' ? 'loyalty-dialog__tab--active' : ''}`}
                onClick={() => setActiveTab('my-level')}
                aria-selected={activeTab === 'my-level'}
                role='tab'
              >
                My Level
              </button>
              <button
                type='button'
                className={`loyalty-dialog__tab ${activeTab === 'how-to-earn' ? 'loyalty-dialog__tab--active' : ''}`}
                onClick={() => setActiveTab('how-to-earn')}
                aria-selected={activeTab === 'how-to-earn'}
                role='tab'
              >
                How to Earn {xpVariantAbbreviation}
              </button>
            </m.div>

            {/* Tab Content */}
            <m.div className='loyalty-dialog__content' role='tabpanel' variants={animation.layer2Variants}>
              {activeTab === 'my-level' ? (
                <div className='loyalty-dialog__my-level'>
                  {/* Background Image */}
                  {backgroundImageSrc && (
                    <img
                      className='loyalty-dialog__background'
                      src={backgroundImageSrc}
                      alt=''
                      role='presentation'
                      aria-hidden='true'
                    />
                  )}

                  <div className='loyalty-dialog__level-content'>
                    {/* Level Icon */}
                    <div>
                      <LoyaltyLevelIcon
                        levelNumber={currentLevel}
                        iconSrc={levelIconSrc}
                      />
                    </div>

                    {/* Level Name */}
                    <div>
                      <LoyaltyLevelName levelNumber={currentLevel} customName={levelName} />
                    </div>

                    {/* Progress Bar */}
                    <div className='loyalty-dialog__progress-wrapper'>
                      <LoyaltyProgressBar
                        percentage={progressPercentage}
                        nextLevelNumber={nextLevel}
                        nextLevelIconSrc={nextLevelIconSrc}
                      />
                    </div>

                    {/* Description */}
                    <p className='loyalty-dialog__description'>
                      Earn {xpVariantName} to level up and unlock exclusive rewards!
                    </p>
                  </div>
                </div>
              ) : (
                <div className='loyalty-dialog__how-to-earn'>
                  <div className='loyalty-dialog__earn-card'>
                    <h5 className='loyalty-dialog__earn-title'>Ways to Earn {xpVariantAbbreviation}</h5>
                    <ul className='loyalty-dialog__earn-list'>
                      <li>Make purchases in the store</li>
                      <li>Complete daily challenges</li>
                      <li>Play featured games</li>
                      <li>Refer friends</li>
                    </ul>
                  </div>
                </div>
              )}
            </m.div>

            {/* Footer */}
            <m.footer className='loyalty-dialog__footer' variants={animation.layer2Variants}>
              <a
                href='#terms'
                className='loyalty-dialog__terms-link'
                onClick={(e) => e.preventDefault()}
              >
                Terms & Conditions
              </a>
            </m.footer>
          </m.div>
        </LazyMotion>
      </dialog>
    </DialogBackdrop>
  )
}

export default LoyaltyDialog
