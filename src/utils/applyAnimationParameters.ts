import { Variants } from 'motion/react'
import { RevealAnimation } from '../animations/revealAnimations'
import { AnimationParameters } from '../types/animationParameters'

/**
 * Deep clone and apply parameters to animation variants
 */
export function applyAnimationParameters(
  baseAnimation: RevealAnimation,
  parameters: AnimationParameters,
): RevealAnimation {
  // Deep clone to avoid mutating the original
  const cloned = structuredClone(baseAnimation)

  // Recursively apply parameters to all variant objects
  return {
    ...cloned,
    containerVariants: applyToVariant(cloned.containerVariants, parameters, true),
    layer1Variants: applyToVariant(cloned.layer1Variants, parameters, false),
    layer2Variants: applyToVariant(cloned.layer2Variants, parameters, false),
    layer3Variants: applyToVariant(cloned.layer3Variants, parameters, false),
  }
}

/**
 * Apply parameters to a variant object (recursive for all states)
 */
function applyToVariant(variant: Variants, parameters: AnimationParameters, isContainer: boolean): Variants {
  if (typeof variant !== 'object') {
    return variant
  }

  const result: Record<string, unknown> = {}

  // Process each state in the variant (hidden, visible, etc.)
  for (const [key, value] of Object.entries(variant)) {
    if (typeof value === 'object') {
      result[key] = applyToState(value as Record<string, unknown>, parameters, isContainer)
    } else {
      result[key] = value
    }
  }

  return result as Variants
}

/**
 * Apply parameters to a single state object
 */
function applyToState(
  state: Record<string, unknown>,
  parameters: AnimationParameters,
  isContainer: boolean,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...state }

  // Apply wobble intensity to scale and rotate arrays
  if (parameters.wobble) {
    const intensity = parameters.wobble.wobbleIntensity

    // Scale arrays: multiply deviations from 1.0 by intensity
    if (Array.isArray(result.scale)) {
      result.scale = result.scale.map((val: number) => {
        if (val === 0) return 0 // Keep start at 0
        const deviation = val - 1.0
        return 1.0 + deviation * intensity
      })
    }
    if (Array.isArray(result.scaleX)) {
      result.scaleX = result.scaleX.map((val: number) => {
        if (val === 0) return 0
        const deviation = val - 1.0
        return 1.0 + deviation * intensity
      })
    }
    if (Array.isArray(result.scaleY)) {
      result.scaleY = result.scaleY.map((val: number) => {
        if (val === 0 || val === 1) return val // Keep start/end values
        const deviation = val - 1.0
        return 1.0 + deviation * intensity
      })
    }

    // Rotate arrays: multiply by intensity
    if (Array.isArray(result.rotate)) {
      result.rotate = result.rotate.map((val: number) => val * intensity)
    }
  }

  // Apply orbital distance to x/y position values
  if (parameters.orbital) {
    const distanceScale = parameters.orbital.orbitDistance / 100 // Normalize to default of 100

    if (typeof result.x === 'number' && result.x !== 0) {
      result.x = result.x * distanceScale
    }
    if (typeof result.y === 'number' && result.y !== 0) {
      result.y = result.y * distanceScale
    }
  }

  // If this state has a transition, apply parameters to it
  if (result.transition && typeof result.transition === 'object') {
    result.transition = applyToTransition(result.transition as Record<string, unknown>, parameters, isContainer)
  }

  return result
}

/**
 * Apply parameters to a transition object
 */
function applyToTransition(
  transition: Record<string, unknown>,
  parameters: AnimationParameters,
  isContainer: boolean,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...transition }

  // Container-specific properties
  if (isContainer) {
    if (result.staggerChildren !== undefined) {
      result.staggerChildren = parameters.staggerChildren
    }
    if (result.delayChildren !== undefined) {
      // Fix: Don't offset delayChildren with delayOffset twice
      result.delayChildren = parameters.delayChildren
    }
  }

  // Apply duration scale
  if (typeof result.duration === 'number') {
    result.duration = result.duration * parameters.durationScale
  }

  // Apply delay offset
  if (typeof result.delay === 'number') {
    result.delay = Math.max(0, result.delay + parameters.delayOffset)
  }

  // Apply spring physics parameters
  if (result.type === 'spring' && parameters.spring) {
    if (typeof result.stiffness === 'number') {
      result.stiffness = parameters.spring.stiffness
    }
    if (typeof result.damping === 'number') {
      result.damping = parameters.spring.damping
    }
    if (typeof result.mass === 'number') {
      result.mass = parameters.spring.mass
    }
  }

  return result
}
