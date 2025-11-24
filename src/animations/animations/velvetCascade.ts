import { RevealAnimation } from '../types'

export const velvetCascade: RevealAnimation = {
  id: 'velvet-cascade',
  name: 'Velvet Cascade',
  description: 'Smooth cascading with perspective',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  },
  itemVariants: {
    hidden: {
      opacity: 0,
      y: -80,
      scale: 0.85,
      rotateX: -15,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1000,
      transition: {
        duration: 1.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  headerImageVariants: {
    hidden: {
      opacity: 0,
      y: -120,
      scale: 0.75,
      rotateX: -25,
      transformPerspective: 1200,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1200,
      transition: {
        duration: 1.3,
        delay: 0.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      y: -60,
      scale: 0.7,
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        delay: 0.35,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
      y: -50,
      rotateX: -12,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.0,
        delay: 0.6,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.95,
        delay: 1.2,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      y: -150,
      scale: 0.7,
      rotateX: -30,
      transformPerspective: 1400,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1400,
      transition: {
        duration: 1.4,
        delay: 0.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      y: -70,
      scale: 0.65,
      rotateX: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.25,
        delay: 0.3,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
      y: -55,
      rotateX: -14,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.05,
        delay: 0.55,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      y: -90,
      scale: 0.8,
      rotateX: -18,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.15,
        delay: 0.5,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  questlineProgressBarVariants: {
    hidden: {
      opacity: 0,
      y: -40,
      scaleX: 0.5,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleX: 1,
      rotateX: 0,
      transition: {
        duration: 1.1,
        delay: 0.7,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.88,
      rotateX: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        delay: 1.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  simpleQuestHeaderImageVariants: {
    hidden: {
      opacity: 0,
      y: -150,
      scale: 0.7,
      rotateX: -30,
      transformPerspective: 1400,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1400,
      transition: {
        duration: 1.4,
        delay: 0.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  simpleQuestTimerVariants: {
    hidden: {
      opacity: 0,
      y: -70,
      scale: 0.65,
      rotateX: 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.25,
        delay: 0.3,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  simpleQuestCardVariants: {
    hidden: {
      opacity: 0,
      y: -55,
      rotateX: -14,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.05,
        delay: 0.55,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  simpleQuestButtonVariants: {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.88,
      rotateX: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        delay: 0.9,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
  simpleQuestFooterVariants: {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.88,
      rotateX: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        delay: 1.1,
        ease: [0.16, 1.0, 0.3, 1.0],
      },
    },
  },
}
