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
  itemVariants: {
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
  headerImageVariants: {
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
        delay: 0.05,
        times: [0, 0.15, 0.3, 0.5, 0.75, 1],
        ease: 'linear',
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: [0, 1, 0.3, 1, 0.4, 1],
      x: [0, 30, -20, 15, -8, 0],
      scale: [0.8, 1.2, 0.9, 1.1, 0.95, 1],
      transition: {
        duration: 0.28,
        delay: 0.15,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 0.5, 1, 0.7, 1],
      x: [0, -18, 22, -10, 6, 0],
      y: [0, 12, -15, 8, -4, 0],
      transition: {
        duration: 0.26,
        delay: 0.25,
        times: [0, 0.18, 0.36, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 0.4, 1, 0.6, 1],
      x: [0, 15, -12, 8, -5, 0],
      y: [0, -10, 12, -6, 3, 0],
      transition: {
        duration: 0.24,
        delay: 0.7,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 0.3, 1, 0.5, 1],
      x: [0, -30, 35, -15, 10, 0],
      y: [0, 20, -25, 12, -8, 0],
      scale: [0.85, 1.15, 0.9, 1.08, 0.96, 1],
      transition: {
        duration: 0.32,
        delay: 0.05,
        times: [0, 0.15, 0.3, 0.5, 0.75, 1],
        ease: 'linear',
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.75,
    },
    visible: {
      opacity: [0, 1, 0.4, 1, 0.5, 1],
      x: [0, 35, -25, 18, -10, 0],
      scale: [0.75, 1.25, 0.85, 1.12, 0.94, 1],
      transition: {
        duration: 0.3,
        delay: 0.12,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 0.5, 1, 0.6, 1],
      x: [0, -20, 25, -12, 8, 0],
      y: [0, 15, -18, 10, -5, 0],
      transition: {
        duration: 0.28,
        delay: 0.22,
        times: [0, 0.18, 0.36, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 0.4, 1, 0.5, 1],
      x: [0, 22, -28, 15, -8, 0],
      y: [0, -15, 20, -10, 6, 0],
      scale: [0.9, 1.1, 0.92, 1.06, 0.97, 1],
      transition: {
        duration: 0.3,
        delay: 0.18,
        times: [0, 0.17, 0.34, 0.55, 0.75, 1],
        ease: 'linear',
      },
    },
  },
  questlineProgressBarVariants: {
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
        delay: 0.35,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: [0, 1, 0.4, 1, 0.6, 1],
      x: [0, 18, -15, 10, -5, 0],
      y: [0, -12, 15, -8, 4, 0],
      transition: {
        duration: 0.26,
        delay: 0.65,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'linear',
      },
    },
  },
}
