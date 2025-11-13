import { createContext, ReactNode, useCallback, useState } from 'react'
import { AnimationType } from '../animations/revealAnimations'
import { AnimationParameters, defaultAnimationParameters } from '../types/animationParameters'

interface AnimationParametersContextValue {
  /** Get parameters for a specific animation type */
  getParameters: (animationType: AnimationType) => AnimationParameters
  /** Update a specific parameter for an animation type */
  updateParameter: <K extends keyof AnimationParameters>(
    animationType: AnimationType,
    key: K,
    value: AnimationParameters[K]
  ) => void
  /** Update a spring parameter for an animation type */
  updateSpringParameter: (
    animationType: AnimationType,
    key: 'stiffness' | 'damping' | 'mass',
    value: number
  ) => void
  /** Reset all parameters for a specific animation type to defaults */
  resetToDefaults: (animationType: AnimationType) => void
}

export const AnimationParametersContext = createContext<AnimationParametersContextValue | null>(null)

interface AnimationParametersProviderProps {
  children: ReactNode
}

export function AnimationParametersProvider({ children }: AnimationParametersProviderProps) {
  // Store parameters for each animation type in a Map-like object
  const [parametersMap, setParametersMap] = useState<Record<AnimationType, AnimationParameters>>(() => {
    // Initialize with deep copy of defaults
    return JSON.parse(JSON.stringify(defaultAnimationParameters))
  })

  const getParameters = useCallback(
    (animationType: AnimationType): AnimationParameters => {
      return parametersMap[animationType] || defaultAnimationParameters[animationType]
    },
    [parametersMap]
  )

  const updateParameter = useCallback(
    <K extends keyof AnimationParameters>(
      animationType: AnimationType,
      key: K,
      value: AnimationParameters[K]
    ) => {
      setParametersMap((prev) => ({
        ...prev,
        [animationType]: {
          ...prev[animationType],
          [key]: value,
        },
      }))
    },
    []
  )

  const updateSpringParameter = useCallback(
    (animationType: AnimationType, key: 'stiffness' | 'damping' | 'mass', value: number) => {
      setParametersMap((prev) => ({
        ...prev,
        [animationType]: {
          ...prev[animationType],
          spring: {
            ...(prev[animationType].spring || { stiffness: 200, damping: 15, mass: 1.0 }),
            [key]: value,
          },
        },
      }))
    },
    []
  )

  const resetToDefaults = useCallback((animationType: AnimationType) => {
    setParametersMap((prev) => ({
      ...prev,
      [animationType]: JSON.parse(JSON.stringify(defaultAnimationParameters[animationType])),
    }))
  }, [])

  const value: AnimationParametersContextValue = {
    getParameters,
    updateParameter,
    updateSpringParameter,
    resetToDefaults,
  }

  return (
    <AnimationParametersContext.Provider value={value}>
      {children}
    </AnimationParametersContext.Provider>
  )
}
