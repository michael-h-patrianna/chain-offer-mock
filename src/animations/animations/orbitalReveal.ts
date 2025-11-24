import { RevealAnimation } from '../types'

export const orbitalReveal: RevealAnimation = {
  id: 'orbital-reveal',
  name: 'Orbital Reveal',
  description: 'Elements orbit into position',
  containerVariants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
  layer2Variants: {
    hidden: {
      opacity: 0,
      x: 100,
      y: -100,
      scale: 0.5,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
        mass: 1.0,
      },
    },
  },
  layer1Variants: {
    hidden: {
      opacity: 0,
      y: -200,
      x: -50,
      scale: 0.4,
      rotate: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
        mass: 1.0,
      },
    },
  },

  layer3Variants: {
    hidden: {
      opacity: 0,
      x: -100,
      scaleX: 0.2,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      scaleX: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 12,
        mass: 1.0,
      },
    },
  },
}
