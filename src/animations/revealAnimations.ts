import { Variants } from 'motion/react'

export type AnimationType =
  | 'stagger-inview'
  | 'scale-rotate'
  | 'flip-reveal'
  | 'spring-physics'
  | 'fade-slide'
  | 'none'

export interface RevealAnimation {
  id: AnimationType
  name: string
  description: string
  containerVariants: Variants
  itemVariants: Variants
}

export const revealAnimations: Record<AnimationType, RevealAnimation> = {
  'stagger-inview': {
    id: 'stagger-inview',
    name: 'Stagger In View',
    description: 'Smooth stagger with opacity, scale, and vertical slide',
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
  },

  'scale-rotate': {
    id: 'scale-rotate',
    name: 'Scale & Rotate Pop',
    description: 'Pop effect with scale and subtle rotation',
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
  },

  'flip-reveal': {
    id: 'flip-reveal',
    name: 'Flip Reveal',
    description: '3D flip animation with scale',
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
  },

  'spring-physics': {
    id: 'spring-physics',
    name: 'Spring Physics',
    description: 'Bouncy spring-based entrance',
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
  },

  'fade-slide': {
    id: 'fade-slide',
    name: 'Fade & Slide',
    description: 'Simple fade with horizontal slide',
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
  },

  none: {
    id: 'none',
    name: 'No Animation',
    description: 'Instant appearance without animation',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    },
    itemVariants: {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { duration: 0 }
      },
    },
  },
}

/**
 * Get animation configuration by type
 */
export function getRevealAnimation(type: AnimationType): RevealAnimation {
  return revealAnimations[type]
}

/**
 * Get all available animation types for selection
 */
export function getAnimationOptions(): Array<{ value: AnimationType; label: string; description: string }> {
  return Object.values(revealAnimations).map((anim) => ({
    value: anim.id,
    label: anim.name,
    description: anim.description,
  }))
}
