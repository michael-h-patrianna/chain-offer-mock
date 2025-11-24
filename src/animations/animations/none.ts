import { RevealAnimation } from '../types'

export const none: RevealAnimation = {
  id: 'none',
  name: 'No Animation',
  description: 'No animation',
  containerVariants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  },
  layer2Variants: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { duration: 0 },
    },
  },
  layer1Variants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
  layer3Variants: {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0 } },
  },
}
