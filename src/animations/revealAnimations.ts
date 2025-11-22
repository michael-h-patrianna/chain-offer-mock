// Export types
export type { AnimationType, RevealAnimation } from './types'
import type { AnimationType, RevealAnimation } from './types'

// Import all animations
import { crystalShimmer } from './animations/crystalShimmer'
import { elasticBounce } from './animations/elasticBounce'
import { fadeSlide } from './animations/fadeSlide'
import { flipReveal } from './animations/flipReveal'
import { glitchSnap } from './animations/glitchSnap'
import { none } from './animations/none'
import { orbitalReveal } from './animations/orbitalReveal'
import { scaleRotate } from './animations/scaleRotate'
import { silkUnfold } from './animations/silkUnfold'
import { springPhysics } from './animations/springPhysics'
import { staggerInView } from './animations/staggerInView'
import { velvetCascade } from './animations/velvetCascade'

// Build the animations record
export const revealAnimations: Record<AnimationType, RevealAnimation> = {
  'stagger-inview': staggerInView,
  'scale-rotate': scaleRotate,
  'flip-reveal': flipReveal,
  'spring-physics': springPhysics,
  'fade-slide': fadeSlide,
  'elastic-bounce': elasticBounce,
  'orbital-reveal': orbitalReveal,
  'glitch-snap': glitchSnap,
  'silk-unfold': silkUnfold,
  'crystal-shimmer': crystalShimmer,
  'velvet-cascade': velvetCascade,
  none,
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
export function getAnimationOptions(): Array<{
  value: AnimationType
  label: string
  description: string
}> {
  return Object.values(revealAnimations).map((anim) => ({
    value: anim.id,
    label: anim.name,
    description: anim.description,
  }))
}
