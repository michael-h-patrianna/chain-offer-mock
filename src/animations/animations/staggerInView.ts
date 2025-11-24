import { RevealAnimation } from '../types'

export const staggerInView: RevealAnimation = {
  id: 'stagger-inview',
  name: 'Stagger In View',
  description: 'Smooth stagger',
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
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  headerImageVariants: {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
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
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
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
      scaleX: 0.5,
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
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestHeaderImageVariants: {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestTimerVariants: {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestCardVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestButtonVariants: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestFooterVariants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}
