import { ReactNode, useCallback, useState } from 'react'
import { AnimationType } from '../animations/revealAnimations'
import { AnimationParameters, defaultAnimationParameters } from '../types/animationParameters'
import { AnimationParametersContext, AnimationParametersContextValue } from './AnimationParametersContext'

interface AnimationParametersProviderProps {
  children: ReactNode
}

export function AnimationParametersProvider({ children }: AnimationParametersProviderProps) {
  // Store parameters for each animation type in a Map-like object
  const [parametersMap, setParametersMap] = useState<Record<AnimationType, AnimationParameters>>(() => {
    // Initialize with deep copy of defaults
    return structuredClone(defaultAnimationParameters)
  })

  const getParameters = useCallback(
    (animationType: AnimationType): AnimationParameters => {
      return parametersMap[animationType]
    },
    [parametersMap],
  )

  const updateParameter = useCallback(
    <K extends keyof AnimationParameters>(animationType: AnimationType, key: K, value: AnimationParameters[K]) => {
      setParametersMap((prev) => ({
        ...prev,
        [animationType]: {
          ...prev[animationType],
          [key]: value,
        },
      }))
    },
    [],
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
    [],
  )

  const updateWobbleParameter = useCallback((animationType: AnimationType, key: 'wobbleIntensity', value: number) => {
    setParametersMap((prev) => ({
      ...prev,
      [animationType]: {
        ...prev[animationType],
        wobble: {
          ...(prev[animationType].wobble || { wobbleIntensity: 1.0 }),
          [key]: value,
        },
      },
    }))
  }, [])

  const updateOrbitalParameter = useCallback((animationType: AnimationType, key: 'orbitDistance', value: number) => {
    setParametersMap((prev) => ({
      ...prev,
      [animationType]: {
        ...prev[animationType],
        orbital: {
          ...(prev[animationType].orbital || { orbitDistance: 100 }),
          [key]: value,
        },
      },
    }))
  }, [])

  const resetToDefaults = useCallback((animationType: AnimationType) => {
    setParametersMap((prev) => ({
      ...prev,
      [animationType]: structuredClone(defaultAnimationParameters[animationType]),
    }))
  }, [])

  const getAllParameters = useCallback(() => {
    return parametersMap
  }, [parametersMap])

  const setAllParameters = useCallback((params: Record<AnimationType, AnimationParameters>) => {
    setParametersMap(params)
  }, [])

  const value: AnimationParametersContextValue = {
    getParameters,
    updateParameter,
    updateSpringParameter,
    updateWobbleParameter,
    updateOrbitalParameter,
    resetToDefaults,
    getAllParameters,
    setAllParameters,
  }

  return <AnimationParametersContext.Provider value={value}>{children}</AnimationParametersContext.Provider>
}
