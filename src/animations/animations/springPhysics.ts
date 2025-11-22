import { RevealAnimation } from '../types'

export const springPhysics: RevealAnimation = {
  id: 'spring-physics',
  name: 'Spring Physics',
  description: 'Bounce bounce',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  itemVariants: {
    hidden: {
      scale: 0,
      y: -100,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 1.2,
      },
    },
  },
  headerImageVariants: {
    hidden: {
      scale: 0.5,
      y: -150,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 12,
        mass: 1.5,
        delay: 0.05,
      },
    },
  },
  timerVariants: {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 18,
        mass: 0.8,
        delay: 0.3,
      },
    },
  },
  titleVariants: {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 1,
        delay: 0.5,
      },
    },
  },
  footerVariants: {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.8,
        delay: 1.0,
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      scale: 0.4,
      y: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 160,
        damping: 11,
        mass: 1.8,
        delay: 0.05,
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 280,
        damping: 20,
        mass: 0.7,
        delay: 0.25,
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      y: 60,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 180,
        damping: 18,
        mass: 1.1,
        delay: 0.45,
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      scale: 0.5,
      y: -80,
      opacity: 0,
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 14,
        mass: 1.3,
        delay: 0.4,
      },
    },
  },
  questlineProgressBarVariants: {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 16,
        mass: 0.9,
        delay: 0.6,
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      y: 40,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 14,
        mass: 0.8,
        delay: 1.0,
      },
    },
  },
}
