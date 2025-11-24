import { RevealAnimation } from '../types'

export const none: RevealAnimation = {
  id: 'none',
  name: 'No Animation',
  description: 'No animation',
  containerVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
  itemVariants: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0 },
    },
  },
  headerImageVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  timerVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  titleVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  footerVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  questlineHeaderImageVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  questlineTimerVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  questlineDescriptionVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  questlineBonusRewardsVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  questlineProgressBarVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  questlineFooterVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  simpleQuestHeaderImageVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  simpleQuestTimerVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  simpleQuestCardVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  simpleQuestButtonVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  simpleQuestFooterVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
}
