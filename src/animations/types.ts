import { Variants } from 'motion/react'

export type AnimationType =
  | 'stagger-inview'
  | 'scale-rotate'
  | 'flip-reveal'
  | 'spring-physics'
  | 'fade-slide'
  | 'elastic-bounce'
  | 'orbital-reveal'
  | 'glitch-snap'
  | 'silk-unfold'
  | 'crystal-shimmer'
  | 'velvet-cascade'
  | 'none'

export interface RevealAnimation {
  id: AnimationType
  name: string
  description: string
  containerVariants: Variants
  layer1Variants: Variants
  layer2Variants: Variants
  layer3Variants: Variants
}
