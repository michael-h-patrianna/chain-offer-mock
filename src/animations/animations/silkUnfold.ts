import { RevealAnimation } from '../types'

export const silkUnfold: RevealAnimation = {
  id: 'silk-unfold',
  name: 'Silk Unfold',
  description: 'Flowing silk-like wave motion',
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
      opacity: 0,
      scaleY: 0.3,
      scaleX: 0.95,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      },
    },
  },
  headerImageVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.2,
      scaleX: 0.9,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 17,
        mass: 0.9,
        delay: 0.1,
      },
    },
  },
  timerVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.4,
      scaleX: 0.92,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 125,
        damping: 19,
        mass: 0.75,
        delay: 0.4,
      },
    },
  },
  titleVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.5,
      scaleX: 0.96,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 115,
        damping: 18,
        mass: 0.85,
        delay: 0.6,
      },
    },
  },
  footerVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.6,
      scaleX: 0.97,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 118,
        damping: 19,
        mass: 0.82,
        delay: 1.3,
      },
    },
  },
  questlineHeaderImageVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.15,
      scaleX: 0.88,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 105,
        damping: 16,
        mass: 1.0,
        delay: 0.1,
      },
    },
  },
  questlineTimerVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.35,
      scaleX: 0.9,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 122,
        damping: 18,
        mass: 0.78,
        delay: 0.35,
      },
    },
  },
  questlineDescriptionVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.45,
      scaleX: 0.94,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 117,
        damping: 18,
        mass: 0.83,
        delay: 0.55,
      },
    },
  },
  questlineBonusRewardsVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.25,
      scaleX: 0.91,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 113,
        damping: 17,
        mass: 0.88,
        delay: 0.5,
      },
    },
  },
  questlineProgressBarVariants: {
    hidden: {
      opacity: 0,
      scaleX: 0.25,
      scaleY: 0.7,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 18,
        mass: 0.8,
        delay: 0.7,
      },
    },
  },
  questlineFooterVariants: {
    hidden: {
      opacity: 0,
      scaleY: 0.55,
      scaleX: 0.96,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 116,
        damping: 18,
        mass: 0.84,
        delay: 1.2,
      },
    },
  },
}
