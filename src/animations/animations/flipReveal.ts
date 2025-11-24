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
  itemVariants: {
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
  headerImageVariants: {
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
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      rotateY: 180,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      rotateX: -100,
      transformPerspective: 1200,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transformPerspective: 1200,
      transition: {
        duration: 0.9,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      rotateY: 180,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
      rotateX: 80,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineProgressBarVariants: {
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
        delay: 0.65,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 1.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestHeaderImageVariants: {
    hidden: {
      opacity: 0,
      rotateX: -100,
      transformPerspective: 1200,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transformPerspective: 1200,
      transition: {
        duration: 0.9,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestTimerVariants: {
    hidden: {
      opacity: 0,
      rotateY: 180,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestCardVariants: {
    hidden: {
      opacity: 0,
      rotateX: 80,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        delay: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestButtonVariants: {
    hidden: {
      opacity: 0,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  simpleQuestFooterVariants: {
    hidden: {
      opacity: 0,
      rotateX: -30,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 1.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
}
