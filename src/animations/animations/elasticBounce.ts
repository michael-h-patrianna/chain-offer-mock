import { RevealAnimation } from '../types'

export const elasticBounce: RevealAnimation = {
  id: 'elastic-bounce',
  name: 'Jello Wobble',
  description: 'Extreme jello-like wobble',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.5, 0.75, 1.2, 0.9, 1],
      rotate: [0, 25, -15, 10, -5, 0],
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.6, 0.8, 1.25, 0.95, 1],
      scaleY: [1, 0.75, 1.25, 0.9, 1.05, 1],
      rotate: [0, -20, 12, -6, 0],
      transition: {
        duration: 0.7,

        ease: 'easeOut',
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      scaleX: 0,
      scaleY: 1,
    },
    visible: {
      opacity: 1,
      scaleX: [0, 1.4, 0.8, 1.15, 0.95, 1],
      scaleY: [1, 1.5, 0.7, 1.25, 0.95, 1],
      transition: {
        duration: 0.65,

        ease: 'easeOut',
      },
    },
  },
}
