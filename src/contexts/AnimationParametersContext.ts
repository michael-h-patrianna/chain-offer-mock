import { createContext } from 'react'
import { AnimationType } from '../animations/revealAnimations'
import { AnimationParameters } from '../types/animationParameters'

export interface AnimationParametersContextValue {
  /** Get parameters for a specific animation type */
  getParameters: (animationType: AnimationType) => AnimationParameters
  /** Update a specific parameter for an animation type */
  updateParameter: <K extends keyof AnimationParameters>(
    animationType: AnimationType,
    key: K,
    value: AnimationParameters[K],
  ) => void
  /** Update a spring parameter for an animation type */
  updateSpringParameter: (animationType: AnimationType, key: 'stiffness' | 'damping' | 'mass', value: number) => void
  /** Update a wobble parameter for an animation type */
  updateWobbleParameter: (animationType: AnimationType, key: 'wobbleIntensity', value: number) => void
  /** Update an orbital parameter for an animation type */
  updateOrbitalParameter: (animationType: AnimationType, key: 'orbitDistance', value: number) => void
  /** Reset all parameters for a specific animation type to defaults */
  resetToDefaults: (animationType: AnimationType) => void
  /** Get all parameters for all animation types (for export) */
  getAllParameters: () => Record<AnimationType, AnimationParameters>
  /** Set all parameters for all animation types (for import) */
  setAllParameters: (params: Record<AnimationType, AnimationParameters>) => void
}

export const AnimationParametersContext = createContext<AnimationParametersContextValue | null>(null)
