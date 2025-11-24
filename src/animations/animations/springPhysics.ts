import { RevealAnimation } from '../types'

export const springPhysics: RevealAnimation = {
  id: 'spring-physics',
  name: 'Spring Physics',
  description: 'Bounce bounce',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  layer2Variants: {
    hidden: {
      scale: 0,
      y: -100,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 1.2,
      },
    },
  },
  layer1Variants: {
    hidden: {
      scale: 0.5,
      y: -150,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 12,
        mass: 1.5,
      },
    },
  },

  layer3Variants: {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 16,
        mass: 0.9,
      },
    },
  },
}
