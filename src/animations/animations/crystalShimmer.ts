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
  itemVariants: {
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
  headerImageVariants: {
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
        delay: 0.1,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.35,
    },
    visible: {
      opacity: [0, 0.25, 1, 0.38, 0.82, 1, 0.58, 1],
      scale: [0.35, 0.65, 0.92, 1.1, 0.9, 1.03, 0.98, 1],
      x: [0, 9, -6, 3.5, -2, 1.2, -0.6, 0],
      y: [0, -7, 4.5, -3.5, 2, -1.2, 0.6, 0],
      transition: {
        duration: 0.95,
        delay: 0.4,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
      scale: 0.45,
    },
    visible: {
      opacity: [0, 0.32, 1, 0.42, 0.85, 1, 0.62, 1],
      scale: [0.45, 0.72, 0.94, 1.06, 0.93, 1.02, 0.99, 1],
      x: [0, 7, -4.5, 2.5, -1.5, 0.8, -0.4, 0],
      y: [0, -5, 3.5, -2.5, 1.5, -0.8, 0.4, 0],
      transition: {
        duration: 0.85,
        delay: 0.6,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.42,
    },
    visible: {
      opacity: [0, 0.28, 1, 0.4, 0.78, 1, 0.6, 1],
      scale: [0.42, 0.68, 0.93, 1.07, 0.91, 1.015, 0.985, 1],
      x: [0, 6, -4, 2.2, -1.3, 0.7, -0.35, 0],
      y: [0, -4, 3, -2, 1.3, -0.7, 0.35, 0],
      transition: {
        duration: 0.8,
        delay: 1.2,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      scale: 0.25,
    },
    visible: {
      opacity: [0, 0.18, 1, 0.32, 0.72, 1, 0.52, 1],
      scale: [0.25, 0.55, 0.88, 1.14, 0.86, 1.05, 0.96, 1],
      x: [0, 12, -8, 5, -3, 1.8, -0.8, 0],
      y: [0, -10, 6, -5, 3, -1.8, 0.8, 0],
      transition: {
        duration: 1.1,
        delay: 0.1,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.32,
    },
    visible: {
      opacity: [0, 0.22, 1, 0.36, 0.78, 1, 0.56, 1],
      scale: [0.32, 0.62, 0.91, 1.11, 0.89, 1.035, 0.975, 1],
      x: [0, 9.5, -6.5, 3.8, -2.2, 1.3, -0.65, 0],
      y: [0, -7.5, 5, -3.8, 2.2, -1.3, 0.65, 0],
      transition: {
        duration: 1.0,
        delay: 0.35,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
      scale: 0.48,
    },
    visible: {
      opacity: [0, 0.34, 1, 0.44, 0.87, 1, 0.64, 1],
      scale: [0.48, 0.74, 0.95, 1.05, 0.94, 1.018, 0.99, 1],
      x: [0, 7.5, -5, 2.8, -1.6, 0.9, -0.45, 0],
      y: [0, -5.5, 4, -2.8, 1.6, -0.9, 0.45, 0],
      transition: {
        duration: 0.88,
        delay: 0.55,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      scale: 0.36,
    },
    visible: {
      opacity: [0, 0.26, 1, 0.38, 0.8, 1, 0.58, 1],
      scale: [0.36, 0.66, 0.92, 1.09, 0.9, 1.03, 0.98, 1],
      x: [0, 8.5, -5.8, 3.3, -1.9, 1.1, -0.55, 0],
      y: [0, -6.5, 4.8, -3.3, 1.9, -1.1, 0.55, 0],
      transition: {
        duration: 0.96,
        delay: 0.5,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  questlineProgressBarVariants: {
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
        delay: 0.7,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
      scale: 0.4,
    },
    visible: {
      opacity: [0, 0.3, 1, 0.41, 0.82, 1, 0.61, 1],
      scale: [0.4, 0.69, 0.935, 1.065, 0.915, 1.02, 0.99, 1],
      x: [0, 6.5, -4.3, 2.4, -1.4, 0.75, -0.38, 0],
      y: [0, -4.5, 3.3, -2.4, 1.4, -0.75, 0.38, 0],
      transition: {
        duration: 0.84,
        delay: 1.1,
        times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
        ease: 'linear',
      },
    },
  },
}
