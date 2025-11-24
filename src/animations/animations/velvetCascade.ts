import { RevealAnimation } from '../types'

export const velvetCascade: RevealAnimation = {
  id: 'velvet-cascade',
  name: 'Velvet Cascade',
  description: 'Smooth cascading with perspective',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      y: -80,
      scale: 0.85,
      rotateX: -15,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1000,
      transition: {
        duration: 1.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      y: -120,
      scale: 0.75,
      rotateX: -25,
      transformPerspective: 1200,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1200,
      transition: {
        duration: 1.3,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      y: -40,
      scaleX: 0.5,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      rotateX: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
}
