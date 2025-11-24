import { RevealAnimation } from '../types'

export const silkUnfold: RevealAnimation = {
  id: 'silk-unfold',
  name: 'Silk Unfold',
  description: 'Flowing silk-like wave motion',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      scaleY: 0.3,
      scaleX: 0.95,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      scaleY: 0.2,
      scaleX: 0.9,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 17,
        mass: 0.9,
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      scaleX: 0.25,
      scaleY: 0.7,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      },
    },
  },
}
