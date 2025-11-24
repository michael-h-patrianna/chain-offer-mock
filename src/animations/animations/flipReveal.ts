import { RevealAnimation } from '../types'

export const flipReveal: RevealAnimation = {
  id: 'flip-reveal',
  name: 'Flip Reveal',
  description: '3D flip',
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
      scale: 0,
      opacity: 0,
      rotateY: -180,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      rotateX: -90,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transformPerspective: 1000,
      transition: {
        duration: 0.8,

        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  layer3Variants: {
    hidden: {
      opacity: 0,
      rotateX: -45,
      scaleX: 0.5,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      scaleX: 1,
      transition: {
        duration: 0.7,

        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}
