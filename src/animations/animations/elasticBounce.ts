import { RevealAnimation } from '../types'

export const elasticBounce: RevealAnimation = {
  id: 'elastic-bounce',
  name: 'Jello Wobble',
  description: 'Extreme jello-like wobble',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  },
  itemVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.5, 0.75, 1.2, 0.9, 1],
      rotate: [0, 25, -15, 10, -5, 0],
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  },
  headerImageVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.6, 0.8, 1.25, 0.95, 1],
      scaleY: [1, 0.75, 1.25, 0.9, 1.05, 1],
      rotate: [0, -20, 12, -6, 0],
      transition: {
        duration: 0.7,
        delay: 0,
        ease: 'easeOut',
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.7, 0.7, 1.3, 0.9, 1],
      rotate: [0, 20, -12, 6, 0],
      transition: {
        duration: 0.65,
        delay: 0.08,
        ease: 'easeOut',
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
      scaleX: 0,
    },
    visible: {
      opacity: 1,
      scaleX: [0, 1.5, 0.8, 1.2, 0.95, 1],
      scaleY: [1, 0.7, 1.3, 0.9, 1],
      transition: {
        duration: 0.6,
        delay: 0.15,
        ease: 'easeOut',
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.4, 0.85, 1.15, 0.95, 1],
      rotate: [0, 15, -8, 4, 0],
      transition: {
        duration: 0.6,
        delay: 0.45,
        ease: 'easeOut',
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.7, 0.75, 1.3, 0.9, 1],
      scaleY: [1, 0.7, 1.3, 0.9, 1.05, 1],
      rotate: [0, -25, 15, -8, 0],
      transition: {
        duration: 0.75,
        delay: 0,
        ease: 'easeOut',
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.8, 0.6, 1.35, 0.85, 1],
      rotate: [0, 22, -13, 7, 0],
      transition: {
        duration: 0.7,
        delay: 0.06,
        ease: 'easeOut',
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
      scaleX: 0,
    },
    visible: {
      opacity: 1,
      scaleX: [0, 1.5, 0.8, 1.2, 0.95, 1],
      scaleY: [1, 0.7, 1.3, 0.9, 1],
      transition: {
        duration: 0.65,
        delay: 0.12,
        ease: 'easeOut',
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.6, 0.75, 1.25, 0.9, 1],
      rotate: [0, -18, 10, -5, 0],
      transition: {
        duration: 0.7,
        delay: 0.1,
        ease: 'easeOut',
      },
    },
  },
  questlineProgressBarVariants: {
    hidden: {
      opacity: 0,
      scaleX: 0,
      scaleY: 1,
    },
    visible: {
      opacity: 1,
      scaleX: [0, 1.4, 0.8, 1.15, 0.95, 1],
      scaleY: [1, 1.5, 0.7, 1.25, 0.95, 1],
      transition: {
        duration: 0.65,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.45, 0.8, 1.18, 0.94, 1],
      rotate: [0, 18, -10, 5, 0],
      transition: {
        duration: 0.65,
        delay: 0.4,
        ease: 'easeOut',
      },
    },
  },
  simpleQuestHeaderImageVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.7, 0.75, 1.3, 0.9, 1],
      scaleY: [1, 0.7, 1.3, 0.9, 1.05, 1],
      rotate: [0, -25, 15, -8, 0],
      transition: {
        duration: 0.75,
        delay: 0,
        ease: 'easeOut',
      },
    },
  },
  simpleQuestTimerVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.8, 0.6, 1.35, 0.85, 1],
      rotate: [0, 22, -13, 7, 0],
      transition: {
        duration: 0.7,
        delay: 0.06,
        ease: 'easeOut',
      },
    },
  },
  simpleQuestCardVariants: {
    hidden: {
      opacity: 0,
      scaleX: 0,
    },
    visible: {
      opacity: 1,
      scaleX: [0, 1.5, 0.8, 1.2, 0.95, 1],
      scaleY: [1, 0.7, 1.3, 0.9, 1],
      transition: {
        duration: 0.65,
        delay: 0.12,
        ease: 'easeOut',
      },
    },
  },
  simpleQuestButtonVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.45, 0.8, 1.18, 0.94, 1],
      rotate: [0, 18, -10, 5, 0],
      transition: {
        duration: 0.65,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  },
  simpleQuestFooterVariants: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: [0, 1.45, 0.8, 1.18, 0.94, 1],
      rotate: [0, 18, -10, 5, 0],
      transition: {
        duration: 0.65,
        delay: 0.4,
        ease: 'easeOut',
      },
    },
  },
}
