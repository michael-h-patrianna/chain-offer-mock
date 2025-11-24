/**
 * QuestlineViewer - Main Questline Display Component
 *
 * This component serves as the primary coordinator for displaying questline content.
 * It handles the overall layout, scaling, and orchestrates the rendering of all
 * questline components (quests, timer, header, rewards, button).
 *
 * Key Responsibilities:
 * - Calculate responsive scaling for questline display
 * - Coordinate component rendering using specialized renderer components
 * - Provide container structure and background rendering
 * - Handle component bounds calculation for overflow management
 *
 * Architecture Pattern:
 * This component follows a "coordinator pattern" where it manages layout and
 * delegates specific rendering responsibilities to specialized renderer components.
 * State management is handled by the useQuestlineState hook to maintain separation
 * of concerns.
 *
 * Usage:
 * The QuestlineViewer is designed to be a standalone, reusable component that can
 * be integrated into any React application. It handles all internal questline
 * logic while providing callback props for external integration.
 */

import { LazyMotion, domAnimation, m } from 'motion/react'
import React from 'react'
import { RevealAnimation } from '../../../../../../animations/types'
import { CloseButton } from '../../../Shared/CloseButton'
import { useQuestlineState } from '../hooks/useQuestlineState'
import { ExtractedAssets, QuestlineExport } from '../types'
import { calculateQuestlineContentBounds, calculateQuestlineScale } from '../utils/utils'
import './QuestlineViewer.css'

// Import specialized renderer components
import { ButtonRenderer } from './renderers/ButtonRenderer'
import { HeaderRenderer } from './renderers/HeaderRenderer'
import { QuestRenderer } from './renderers/QuestRenderer'
import { RewardsRenderer } from './renderers/RewardsRenderer'
import { TimerRenderer } from './renderers/TimerRenderer'

/**
 * Component visibility configuration
 */
type ComponentVisibilityType = {
  background: boolean
  header: boolean
  quests: boolean
  rewards: boolean
  timer: boolean
  button: boolean
}

/**
 * QuestlineViewer Props Interface
 *
 * Defines the external API for the QuestlineViewer component.
 * This interface represents what external applications need to provide
 * to integrate questline display functionality.
 */
interface QuestlineViewerProps {
  /** Questline export data from Figma plugin */
  questlineData: QuestlineExport

  /** Extracted assets including images and background */
  assets: ExtractedAssets

  /** Target display width for the questline */
  questlineWidth: number

  /** Target display height for the questline */
  questlineHeight: number

  /** Whether to show quest key overlays for debugging/development */
  showQuestKeys?: boolean

  /** Component visibility toggles (optional, defaults to all visible) */
  componentVisibility?: Partial<ComponentVisibilityType>

  /** Configuration for reveal animation */
  animationConfig?: RevealAnimation

  /** Callback function executed when questline button is clicked */
  onButtonClick?: () => void

  /** Callback function executed when close button is clicked */
  onClose?: () => void
}

/**
 * QuestlineViewer - Main Questline Display Component
 *
 * This component coordinates the display of an entire questline, including
 * all interactive components. It uses the useQuestlineState hook for state
 * management and specialized renderer components for display logic.
 */
export const QuestlineViewer: React.FC<QuestlineViewerProps> = ({
  questlineData,
  assets,
  questlineWidth,
  questlineHeight,
  showQuestKeys = false,
  componentVisibility = {},
  animationConfig,
  onButtonClick,
  onClose,
}) => {
  // Merge with default visibility (all visible)
  const visibility = {
    background: true,
    header: true,
    quests: true,
    rewards: true,
    timer: true,
    button: true,
    ...componentVisibility,
  }

  // ============================================================================
  // STATE MANAGEMENT (Delegated to Hook)
  // ============================================================================

  /**
   * All questline state management is handled by the useQuestlineState hook.
   * This separation allows developers to easily understand and modify state
   * behavior without touching rendering logic.
   */
  const {
    questStates,
    headerState,
    rewardsState,
    buttonState,
    cycleQuestState,
    cycleHeaderState,
    cycleRewardsState,
    handleButtonMouseEnter,
    handleButtonMouseLeave,
    handleButtonClick,
  } = useQuestlineState(questlineData)

  // ============================================================================
  // LAYOUT & SCALING CALCULATIONS (Delegated to Transform Utils)
  // ============================================================================

  /**
   * Calculate responsive scaling for the questline display.
   * This ensures the questline maintains proper aspect ratios while fitting
   * within the requested display dimensions.
   */
  const originalSize = {
    width: questlineData.frameSize.width || 800,
    height: questlineData.frameSize.height || 600,
  }

  const targetSize = {
    width: questlineWidth,
    height: questlineHeight,
  }

  const { scale, scaledWidth, scaledHeight } = calculateQuestlineScale(originalSize, targetSize)

  /**
   * Calculate content bounds to handle components that might extend beyond
   * the original frame boundaries. This is important for proper overflow
   * handling and scroll area calculations.
   */
  const contentBounds = calculateQuestlineContentBounds(questlineData, questStates, headerState, rewardsState, scale)

  // ============================================================================
  // COMPONENT RENDERING FUNCTIONS
  // ============================================================================

  /**
   * Render Quest Components
   *
   * Iterates through all quests and renders them using the QuestRenderer.
   * Each quest maintains its own state and handles its own click interactions.
   */
  const renderQuests = () => {
    if (!visibility.quests || !Array.isArray(questlineData.quests)) return null

    return questlineData.quests.map((quest) => {
      // Skip invalid quests
      if (!quest.questKey || !quest.stateBounds) return null

      const currentState = questStates[quest.questKey] || 'locked'
      const questImage = assets.questImages[quest.questKey][currentState]
      const bounds = quest.stateBounds[currentState]

      // Calculate center point for transform origin
      const transformOrigin = bounds ? `${bounds.x * scale}px ${bounds.y * scale}px` : 'center center'

      return (
        <m.div
          key={quest.questKey}
          variants={animationConfig?.layer2Variants}
          style={{
            position: 'relative',
            zIndex: 10,
            width: 0,
            height: 0,
            transformOrigin,
          }}
        >
          <QuestRenderer
            quest={quest}
            currentState={currentState}
            scale={scale}
            questImage={questImage}
            showQuestKeys={showQuestKeys}
            onCycleState={cycleQuestState}
          />
        </m.div>
      )
    })
  }

  /**
   * Render Timer Component
   *
   * Displays the questline timer if present in the questline data.
   * Timer rendering uses the TimerRenderer for consistent styling.
   */
  const renderTimer = () => {
    if (!visibility.timer || !questlineData.timer) return null

    const { position } = questlineData.timer
    const transformOrigin = `${position.x * scale}px ${position.y * scale}px`

    return (
      <m.div
        variants={animationConfig?.layer1Variants}
        style={{
          position: 'relative',
          zIndex: 25,
          width: 0,
          height: 0,
          transformOrigin,
        }}
      >
        <TimerRenderer timer={questlineData.timer} scale={scale} />
      </m.div>
    )
  }

  /**
   * Render Header Component
   *
   * Displays the questline header with state-based image selection.
   * Header states cycle through active -> success -> fail.
   */
  const renderHeader = () => {
    if (!visibility.header || !questlineData.header) return null

    const headerImage = assets.headerImages?.[headerState]
    const bounds = questlineData.header.stateBounds[headerState]
    const transformOrigin = bounds ? `${bounds.x * scale}px ${bounds.y * scale}px` : 'center center'

    return (
      <m.div
        variants={animationConfig?.layer1Variants}
        style={{
          position: 'relative',
          zIndex: 20,
          width: 0,
          height: 0,
          transformOrigin,
        }}
      >
        <HeaderRenderer
          header={questlineData.header}
          currentState={headerState}
          scale={scale}
          headerImage={headerImage}
          onCycleState={cycleHeaderState}
        />
      </m.div>
    )
  }

  /**
   * Render Rewards Component
   *
   * Displays the questline rewards with state-based image selection.
   * Rewards states cycle through active -> fail -> claimed.
   */
  const renderRewards = () => {
    if (!visibility.rewards || !questlineData.rewards) return null

    const rewardsImage = assets.rewardsImages?.[rewardsState]
    const bounds = questlineData.rewards.stateBounds[rewardsState]
    const transformOrigin = bounds ? `${bounds.x * scale}px ${bounds.y * scale}px` : 'center center'

    return (
      <m.div
        variants={animationConfig?.layer1Variants}
        style={{
          position: 'relative',
          zIndex: 15,
          width: 0,
          height: 0,
          transformOrigin,
        }}
      >
        <RewardsRenderer
          rewards={questlineData.rewards}
          currentState={rewardsState}
          scale={scale}
          rewardsImage={rewardsImage}
          onCycleState={cycleRewardsState}
        />
      </m.div>
    )
  }

  /**
   * Render Button Component
   *
   * Displays the interactive questline button with hover and click states.
   * Button interactions are handled through the state management hook.
   */
  const renderButton = () => {
    if (!visibility.button || !questlineData.button) return null

    const { position } = questlineData.button
    const transformOrigin = `${position.x * scale}px ${position.y * scale}px`

    return (
      <m.div
        variants={animationConfig?.layer3Variants}
        style={{
          position: 'relative',
          zIndex: 30,
          width: 0,
          height: 0,
          transformOrigin,
        }}
      >
        <ButtonRenderer
          button={questlineData.button}
          currentState={buttonState}
          scale={scale}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
          onClick={() => {
            handleButtonClick(onButtonClick)
          }}
        />
      </m.div>
    )
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <LazyMotion features={domAnimation}>
      <div className='questline-container-wrapper' role='region' aria-label='Questline game interface'>
        <m.div
          key={animationConfig?.id || 'default-animation'}
          className='questline-viewer questline-canvas'
          role='img'
          aria-label='Interactive questline with clickable quests and components'
          style={
            {
              '--questline-width': `${scaledWidth}px`,
              '--questline-height': `${scaledHeight}px`,
              '--content-bounds-left': `${contentBounds.minX}px`,
              '--content-bounds-top': `${contentBounds.minY}px`,
              '--content-bounds-width': `${contentBounds.width}px`,
              '--content-bounds-height': `${contentBounds.height}px`,
            } as React.CSSProperties
          }
          initial='hidden'
          animate='visible'
          variants={animationConfig?.containerVariants}
        >
          {/* Content bounds indicator for debugging/development */}
          <div className='content-bounds-indicator' />

          {/* Close Button - Positioned at top-right of calculated content bounds */}
          {onClose && (
            <div
              style={{
                position: 'absolute',
                top: 'var(--content-bounds-top)',
                left: 'calc(var(--content-bounds-left) + var(--content-bounds-width))',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
              }}
            >
              <CloseButton onClick={onClose} aria-label='Close' />
            </div>
          )}

          {/* Background image rendering */}
          {visibility.background && assets.backgroundImage && (
            <div className='questline-background'>
              <img
                src={assets.backgroundImage}
                alt='Questline background'
                className='questline-background-image'
                draggable={false}
              />
            </div>
          )}

          {/* Render all questline components in layered order */}
          {renderTimer()}
          {renderHeader()}
          {renderRewards()}
          {renderQuests()}
          {renderButton()}
        </m.div>
      </div>
    </LazyMotion>
  )
}
