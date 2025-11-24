import { RevealAnimation } from '../types'

export const crystalShimmer: RevealAnimation = {
  id: 'crystal-shimmer',
  name: 'Crystal Shimmer',
  description: 'Sharp refractive light catching effect',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      scale: 0.4,
    },
    visible: {
      opacity: [0, 0.3, 1, 0.4, 0.8, 1, 0.6, 1],
      scale: [0.4, 0.7, 0.95, 1.08, 0.92, 1.02, 0.98, 1],
      x: [0, 8, -5, 3, -2, 1, -0.5, 0],
      y: [0, -6, 4, -3, 2, -1, 0.5, 0],
      transition: {
        duration: 0.9,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: [0, 0.2, 1, 0.35, 0.75, 1, 0.55, 1],
      scale: [0.3, 0.6, 0.9, 1.12, 0.88, 1.04, 0.97, 1],
      x: [0, 10, -7, 4, -2.5, 1.5, -0.7, 0],
      y: [0, -8, 5, -4, 2.5, -1.5, 0.7, 0],
      transition: {
        duration: 1.0,

        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      scaleX: 0.28,
      scaleY: 0.85,
    },
    visible: {
      opacity: [0, 0.36, 1, 0.46, 0.88, 1, 0.66, 1],
      scaleX: [0.28, 0.64, 0.93, 1.08, 0.92, 1.025, 0.985, 1],
      scaleY: [0.85, 1.12, 0.94, 1.04, 0.96, 1.015, 0.995, 1],
      transition: {
        duration: 0.92,

        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
}
