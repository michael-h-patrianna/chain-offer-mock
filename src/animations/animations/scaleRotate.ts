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
  itemVariants: {
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
  headerImageVariants: {
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
        delay: 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  timerVariants: {
    hidden: {
      scale: 0.5,
      rotate: 8,
      opacity: 0,
    },
    visible: {
      scale: [0.5, 1.15, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  titleVariants: {
    hidden: {
      scale: 0.85,
      opacity: 0,
    },
    visible: {
      scale: [0.85, 1.05, 1],
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  footerVariants: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.1,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      scale: 0.6,
      rotate: -15,
      opacity: 0,
    },
    visible: {
      scale: [0.6, 1.12, 1],
      rotate: [-15, 5, 0],
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      scale: 0.4,
      rotate: 10,
      opacity: 0,
    },
    visible: {
      scale: [0.4, 1.2, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.25,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: [0.9, 1.05, 1],
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.45,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      scale: 0.7,
      rotate: -8,
      opacity: 0,
    },
    visible: {
      scale: [0.7, 1.1, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  questlineProgressBarVariants: {
    hidden: {
      scaleX: 0.3,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 1.1,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  simpleQuestHeaderImageVariants: {
    hidden: {
      scale: 0.6,
      rotate: -15,
      opacity: 0,
    },
    visible: {
      scale: [0.6, 1.12, 1],
      rotate: [-15, 5, 0],
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.05,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  simpleQuestTimerVariants: {
    hidden: {
      scale: 0.4,
      rotate: 10,
      opacity: 0,
    },
    visible: {
      scale: [0.4, 1.2, 1],
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.25,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  simpleQuestCardVariants: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: [0.9, 1.05, 1],
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  simpleQuestButtonVariants: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
  simpleQuestFooterVariants: {
    hidden: {
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  },
}
