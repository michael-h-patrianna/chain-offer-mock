import { RevealAnimation } from '../types'

export const glitchSnap: RevealAnimation = {
  id: 'glitch-snap',
  name: 'Glitch Snap',
  description: 'Sharp digital glitch effect',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    visible: {
      opacity: [0, 1, 0.3, 1, 0.5, 1],
      x: [0, 20, -15, 8, -5, 0],
      y: [0, -12, 15, -8, 5, 0],
      transition: {
        duration: 0.25,
        times: [0, 0.15, 0.3, 0.5, 0.7, 1],
        ease: 'linear',
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    visible: {
      opacity: [0, 1, 0.4, 1, 0.6, 1],
      x: [0, -25, 30, -12, 8, 0],
      y: [0, 15, -20, 10, -5, 0],
      scale: [0.9, 1.1, 0.95, 1.05, 0.98, 1],
      transition: {
        duration: 0.3,

        times: [0, 0.15, 0.3, 0.5, 0.75, 1],
        ease: 'linear',
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      scaleX: 0.5,
    },
    visible: {
      opacity: [0, 1, 0.5, 1, 0.7, 1],
      x: [0, -15, 20, -10, 5, 0],
      scaleX: [0.5, 1.2, 0.8, 1.1, 0.95, 1],
      transition: {
        duration: 0.28,

        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
}
