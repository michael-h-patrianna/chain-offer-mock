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
  itemVariants: {
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
  headerImageVariants: {
    hidden: {
      opacity: 0,
      x: -60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 1.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      x: -70,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      x: 70,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineProgressBarVariants: {
    hidden: {
      opacity: 0,
      scaleX: 0.6,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}
