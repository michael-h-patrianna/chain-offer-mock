import { Variants } from 'motion/react'

export type AnimationType =
  | 'stagger-inview'
  | 'scale-rotate'
  | 'flip-reveal'
  | 'spring-physics'
  | 'fade-slide'
  | 'elastic-bounce'
  | 'orbital-reveal'
  | 'glitch-snap'
  | 'silk-unfold'
  | 'crystal-shimmer'
  | 'velvet-cascade'
  | 'none'

export interface RevealAnimation {
  id: AnimationType
  name: string
  description: string
  // Chain Offer variants
  containerVariants: Variants
  itemVariants: Variants
  headerImageVariants: Variants
  timerVariants: Variants
  titleVariants: Variants
  footerVariants: Variants
  // QuestLine variants
  questlineHeaderImageVariants: Variants
  questlineTimerVariants: Variants
  questlineDescriptionVariants: Variants
  questlineBonusRewardsVariants: Variants
  questlineProgressBarVariants: Variants
  questlineFooterVariants: Variants
  // Simple Quest variants
  simpleQuestHeaderImageVariants: Variants
  simpleQuestTimerVariants: Variants
  simpleQuestCardVariants: Variants
  simpleQuestButtonVariants: Variants
  simpleQuestFooterVariants: Variants
}
