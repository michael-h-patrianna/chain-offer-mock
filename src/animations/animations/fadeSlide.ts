import { RevealAnimation } from '../types'

export const fadeSlide: RevealAnimation = {
  id: 'fade-slide',
  name: 'Fade & Slide',
  description: 'Simple fade with slide',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,

        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  layer3Variants: {
    hidden: {
      opacity: 0,
      scaleX: 0.6,
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
