/**
 * Consolidated Utility Functions
 *
 * This module contains all the utility functions actually used by the questline components.
 * Consolidates functionality from utils.simple.ts and questlineDataTransform.ts.
 */

import { DropShadow, Fill, HeaderState, QuestlineExport, QuestState, RewardsState } from '../types'

// ============================================================================
// STYLE CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert Fill object to CSS background
 * Supports solid colors, linear gradients, radial gradients, and conic gradients
 */
export function convertFillToCSS(fill: Fill): string {
  if (!fill) return 'transparent'

  if (fill.type === 'solid') {
    return fill.color || 'transparent'
  }

  if (fill.type === 'gradient' && fill.gradient) {
    const { gradient } = fill
    const stops = gradient.stops.map((stop: any) => `${stop.color} ${(stop.position * 100).toFixed(1)}%`).join(', ')

    switch (gradient.type) {
      case 'linear':
        const angle = gradient.rotation || 0
        return `linear-gradient(${angle}deg, ${stops})`

      case 'radial':
        return `radial-gradient(circle, ${stops})`

      case 'angular':
        const conicalAngle = gradient.rotation || 0
        return `conic-gradient(from ${conicalAngle}deg, ${stops})`

      default:
        return 'transparent'
    }
  }

  return 'transparent'
}

/**
 * Convert drop shadows to CSS box-shadow
 * Supports multiple shadows and scaling
 */
export function convertShadowsToCSS(shadows: DropShadow[], scale: number = 1): string {
  if (!shadows || shadows.length === 0) return 'none'

  return shadows
    .map(
      (shadow: any) =>
        `${shadow.x * scale}px ${shadow.y * scale}px ${shadow.blur * scale}px ${shadow.spread * scale}px ${shadow.color}`,
    )
    .join(', ')
}

// ============================================================================
// SCALING CALCULATIONS
// ============================================================================

/**
 * Scale calculation result for responsive questline display
 */
interface ScaleCalculation {
  scale: number
  scaledWidth: number
  scaledHeight: number
}

/**
 * Calculate the scale factor for responsive questline display
 * Maintains aspect ratio while fitting within target dimensions
 */
export function calculateQuestlineScale(
  originalSize: { width: number; height: number },
  targetSize: { width: number; height: number },
): ScaleCalculation {
  const scaleX = targetSize.width / originalSize.width
  const scaleY = targetSize.height / originalSize.height
  const scale = Math.min(scaleX, scaleY)

  const scaledWidth = originalSize.width * scale
  const scaledHeight = originalSize.height * scale

  return { scale, scaledWidth, scaledHeight }
}

/**
 * Calculate simple content bounds for questline
 * Iterates through all active components to find the true visual bounding box
 */
export function calculateQuestlineContentBounds(
  questlineData: QuestlineExport,
  questStates: Record<string, QuestState>,
  headerState: HeaderState,
  rewardsState: RewardsState,
  scale: number,
) {
  if (!questlineData || !questlineData.frameSize) {
    return {
      minX: 0,
      minY: 0,
      maxX: 800 * scale,
      maxY: 600 * scale,
      width: 800 * scale,
      height: 600 * scale,
    }
  }

  // Start with frame bounds
  let minX = 0
  let minY = 0
  let maxX = questlineData.frameSize.width * scale
  let maxY = questlineData.frameSize.height * scale

  // Helper to expand bounds
  const expandBounds = (x: number, y: number, w: number, h: number) => {
    const halfW = (w * scale) / 2
    const halfH = (h * scale) / 2
    const centerX = x * scale
    const centerY = y * scale

    minX = Math.min(minX, centerX - halfW)
    minY = Math.min(minY, centerY - halfH)
    maxX = Math.max(maxX, centerX + halfW)
    maxY = Math.max(maxY, centerY + halfH)
  }

  // 1. Quests
  if (questlineData.quests) {
    questlineData.quests.forEach((quest) => {
      const state = questStates[quest.questKey] || 'locked'
      const bounds = quest.stateBounds[state]
      if (bounds) {
        expandBounds(bounds.x, bounds.y, bounds.width, bounds.height)
      }
    })
  }

  // 2. Header
  if (questlineData.header) {
    const bounds = questlineData.header.stateBounds[headerState]
    if (bounds) {
      expandBounds(bounds.x, bounds.y, bounds.width, bounds.height)
    }
  }

  // 3. Rewards
  if (questlineData.rewards) {
    const bounds = questlineData.rewards.stateBounds[rewardsState]
    if (bounds) {
      expandBounds(bounds.x, bounds.y, bounds.width, bounds.height)
    }
  }

  // 4. Timer
  if (questlineData.timer) {
    const { position, dimensions } = questlineData.timer
    expandBounds(position.x, position.y, dimensions.width, dimensions.height)
  }

  // 5. Button
  if (questlineData.button) {
    // Button dimensions might depend on state/layout, but usually we can use a default or current state estimate
    // For simple bounds, we'll assume the button exists at its position.
    // The ButtonComponent type uses stateStyles which has dimensions inside 'frame'.
    // We'll verify buttonState exists or default to 'default'
    // Note: In the types, ButtonComponent doesn't have top-level dimensions, it's in stateStyles.
    // We'll pick 'default' style for basic bounds if specific state size isn't critical (usually they are similar size)
    const style = questlineData.button.stateStyles['default']
    // If autolayout, dimensions might be dynamic/missing, fallback to a safe default if needed
    const width = style.frame.dimensions?.width || 160
    const height = style.frame.dimensions?.height || 60

    expandBounds(questlineData.button.position.x, questlineData.button.position.y, width, height)
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  }
}
