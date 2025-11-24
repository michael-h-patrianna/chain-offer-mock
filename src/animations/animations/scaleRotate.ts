import { RevealAnimation } from '../types'

export const scaleRotate: RevealAnimation = {
  id: 'scale-rotate',
  name: 'Scale & Rotate Pop',
  description: 'Pop effect',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  layer2Variants: {
    hidden: {
      scale: 0.85,
      rotate: -6,
      opacity: 0,
    },
    visible: {
      scale: [0.85, 1.06, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1], // pop easing
      },
    },
  },
  layer1Variants: {
    hidden: {
      scale: 0.7,
      rotate: -12,
      opacity: 0,
    },
    visible: {
      scale: [0.7, 1.1, 1],
      rotate: [-12, 3, 0],
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  layer3Variants: {
    hidden: {
      scaleX: 0.3,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
}
