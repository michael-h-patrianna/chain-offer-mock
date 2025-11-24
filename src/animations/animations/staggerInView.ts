import { RevealAnimation } from '../types'

export const staggerInView: RevealAnimation = {
  id: 'stagger-inview',
  name: 'Stagger In View',
  description: 'Smooth stagger',
  /* Staggered container settings */
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  /* Item animation settings */
  layer2Variants: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },

  layer1Variants: {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      scaleX: 0.5,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}
