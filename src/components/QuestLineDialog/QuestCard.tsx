import cx from 'classnames'
import React from 'react'
import type { Quest } from '../../types/questline'
import { ModalCelebrationsCoinsFountain } from '../rewards/modal-celebrations/framer/ModalCelebrationsCoinsFountain'
import { CompletedOverlay } from './CompletedOverlay'
import { LockedOverlay } from './LockedOverlay'
import { QuestRewards } from './QuestRewards'

export interface QuestCardProps extends Quest {
  onAction?: (questCode: string, action: 'go' | 'claim') => void
}

export const QuestCard: React.FC<QuestCardProps> = ({
  questCode,
  title,
  description,
  status,
  progress,
  rewards,
  onAction,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [showCoinFountain, setShowCoinFountain] = React.useState(false)
  const [fountainOrigin, setFountainOrigin] = React.useState({ x: 0, y: 0 })
  const [animationKey, setAnimationKey] = React.useState(0)
  const claimButtonRef = React.useRef<HTMLButtonElement>(null)

  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const hasRewards = rewards.length > 0
  const canExpand = !isLocked && (description || hasRewards)

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === 'in_progress' && onAction) {
      onAction(questCode, 'go')
    } else if (status === 'unclaimed' && onAction) {
      // Get button position for fountain origin
      const button = claimButtonRef.current
      if (button) {
        const rect = button.getBoundingClientRect()
        setFountainOrigin({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
        // Increment key to force remount and replay animation
        setAnimationKey(prev => prev + 1)
        setShowCoinFountain(true)
      }
      onAction(questCode, 'claim')
    }
  }

  const getActionButtonText = () => {
    switch (status) {
      case 'in_progress':
        return 'Go'
      case 'unclaimed':
        return 'Claim'
      case 'completed':
        return 'Completed'
      default:
        return ''
    }
  }

  const getActionButtonClass = () => {
    return cx('quest-card-action-button', {
      'quest-card-action-button--in-progress': status === 'in_progress',
      'quest-card-action-button--unclaimed': status === 'unclaimed',
      'quest-card-action-button--completed': status === 'completed',
    })
  }

  return (
    <div
      className={cx('quest-card', { 'quest-card--completed': isCompleted })}
    >
      <div className={isLocked ? 'quest-card__wrapper quest-card__wrapper__locked' : 'quest-card__wrapper'}>
        <div className="quest-card__header">
          <div className="quest-card__header-content">
            <div className="quest-card__header-info">
              <h3 className="quest-card__title">{title}</h3>
              {isExpanded && description && !isLocked && (
                <p className="quest-card__description">{description}</p>
              )}
            </div>
            {!isLocked && status !== 'completed' && (
              <button
                ref={claimButtonRef}
                className={getActionButtonClass()}
                onClick={handleActionClick}
                aria-label={`${getActionButtonText()} quest: ${title}`}
              >
                {getActionButtonText()}
              </button>
            )}
          </div>
          <div className="quest-card__progress-wrapper">
            <div
              className="quest-card__progress-bar"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Quest progress: ${Math.round(progress)}%`}
            >
              <div className="quest-card__progress-fill" data-progress={Math.round(progress / 5) * 5} />
              <span className="quest-card__progress-text" aria-hidden="true">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {isExpanded && hasRewards && !isLocked && (
          <div className="quest-card__content">
            <QuestRewards rewards={rewards} />
          </div>
        )}

        {canExpand && (
          <button
            type="button"
            className="quest-card__footer"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Hide quest details' : 'Show quest details'}
          >
            <span className="quest-card__footer-text">
              {isExpanded ? 'SHOW LESS' : 'SHOW DETAILS'}
            </span>
            <span className="quest-card__footer-icon" aria-hidden="true">{isExpanded ? '▲' : '▼'}</span>
          </button>
        )}

        {isLocked && <LockedOverlay />}
        {isCompleted && <CompletedOverlay hasRewards={hasRewards} />}
      </div>

      {/* Coin Fountain Animation */}
      {showCoinFountain && (
        <ModalCelebrationsCoinsFountain
          key={animationKey}
          originX={fountainOrigin.x}
          originY={fountainOrigin.y}
          onComplete={() => setShowCoinFountain(false)}
        />
      )}
    </div>
  )
}
