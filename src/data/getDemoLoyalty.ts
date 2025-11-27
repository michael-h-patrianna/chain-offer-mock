import { LoyaltyDialogProps } from '../components/LoyaltyDialog'

/**
 * Returns mock data for the LoyaltyDialog demo.
 *
 * @returns Mock LoyaltyDialog props excluding isOpen and onClose
 */
export function getDemoLoyaltyDialogProps(): Omit<LoyaltyDialogProps, 'isOpen' | 'onClose' | 'animationType'> {
  return {
    currentLevel: 12,
    levelName: 'Newcomer 12',
    progressPercentage: 84,
    nextLevel: 13,
    levelIconSrc: '/images/134cce0e47648296d1dfabe3b9df1a88.png',
    nextLevelIconSrc: '/images/a1778d478f694a15fdad05cbba703991.png',
    backgroundImageSrc: 'https://storage.googleapis.com/www.playfame.com/images/new-loyalty-program/progress-card-background.png',
    xpVariantName: 'FamePoints',
    xpVariantAbbreviation: 'FP',
  }
}
