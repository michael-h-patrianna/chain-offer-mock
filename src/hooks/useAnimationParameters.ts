import { useContext } from 'react'
import { AnimationParametersContext } from '../contexts/AnimationParametersContext'

/**
 * Hook to access animation parameters context
 */
export function useAnimationParameters() {
  const context = useContext(AnimationParametersContext)

  if (!context) {
    throw new Error('useAnimationParameters must be used within AnimationParametersProvider')
  }

  return context
}
