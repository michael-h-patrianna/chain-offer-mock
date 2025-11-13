import { AnimationType } from '../animations/revealAnimations'

/**
 * Base parameters that apply to all animation types
 */
export interface BaseAnimationParameters {
  /** Multiplier for all duration values (0.5 = half speed, 2.0 = double speed) */
  durationScale: number
  /** Offset added to all delay values in seconds */
  delayOffset: number
  /** Time between staggered child animations in seconds */
  staggerChildren: number
  /** Initial delay before children start animating in seconds */
  delayChildren: number
}

/**
 * Additional parameters for spring physics animations
 */
export interface SpringPhysicsParameters {
  /** Spring stiffness (higher = faster/snappier) */
  stiffness: number
  /** Spring damping (higher = less bounce) */
  damping: number
  /** Mass of the animated object (higher = slower) */
  mass: number
}

/**
 * Complete parameter set for an animation type
 */
export type AnimationParameters = BaseAnimationParameters & {
  spring?: SpringPhysicsParameters
}

/**
 * Parameter metadata for UI rendering
 */
export interface ParameterConfig {
  key: keyof AnimationParameters | keyof SpringPhysicsParameters
  label: string
  description: string
  min: number
  max: number
  step: number
  defaultValue: number
}

/**
 * Default parameters for each animation type
 */
export const defaultAnimationParameters: Record<AnimationType, AnimationParameters> = {
  'stagger-inview': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
  'scale-rotate': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.15,
    delayChildren: 0.1,
  },
  'flip-reveal': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.12,
    delayChildren: 0.15,
  },
  'spring-physics': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.08,
    delayChildren: 0.1,
    spring: {
      stiffness: 200,
      damping: 15,
      mass: 1.0,
    },
  },
  'fade-slide': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.1,
    delayChildren: 0.15,
  },
  'none': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0,
    delayChildren: 0,
  },
}

/**
 * Parameter configurations for UI controls
 */
export const baseParameterConfigs: ParameterConfig[] = [
  {
    key: 'durationScale',
    label: 'Duration',
    description: 'Speed multiplier for all animations',
    min: 0.5,
    max: 3.0,
    step: 0.1,
    defaultValue: 1.0,
  },
  {
    key: 'delayOffset',
    label: 'Delay',
    description: 'Add or subtract delay from all animations',
    min: -1.0,
    max: 2.0,
    step: 0.1,
    defaultValue: 0,
  },
  {
    key: 'staggerChildren',
    label: 'Stagger',
    description: 'Time between child animations',
    min: 0,
    max: 0.5,
    step: 0.01,
    defaultValue: 0.1,
  },
  {
    key: 'delayChildren',
    label: 'Initial Delay',
    description: 'Delay before children start animating',
    min: 0,
    max: 2.0,
    step: 0.05,
    defaultValue: 0.2,
  },
]

export const springParameterConfigs: ParameterConfig[] = [
  {
    key: 'stiffness',
    label: 'Stiffness',
    description: 'Spring tension (higher = faster)',
    min: 50,
    max: 500,
    step: 10,
    defaultValue: 200,
  },
  {
    key: 'damping',
    label: 'Damping',
    description: 'Spring resistance (higher = less bounce)',
    min: 5,
    max: 50,
    step: 1,
    defaultValue: 15,
  },
  {
    key: 'mass',
    label: 'Mass',
    description: 'Object weight (higher = slower)',
    min: 0.1,
    max: 3.0,
    step: 0.1,
    defaultValue: 1.0,
  },
]
