import cx from 'classnames'
import React from 'react'
import type { Quest } from '../../types/questline'
import { CompletedOverlay } from './CompletedOverlay'
import { LockedOverlay } from './LockedOverlay'
import './QuestCard.css'
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

  const isLocked = status === 'locked'
  const isCompleted = status === 'completed'
  const hasRewards = rewards.length > 0
  const canExpand = !isLocked && (description || hasRewards)

  const handleActionClick = () => {
    if (status === 'in_progress' && onAction) {
      onAction(questCode, 'go')
    } else if (status === 'unclaimed' && onAction) {
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
      <div className="quest-card__wrapper">
        <div className="quest-card__header">
          <div className="quest-card__header-content">
            <div className="quest-card__header-info">
              <h3 className="quest-card__title">{title}</h3>
              {isExpanded && description && !isLocked && (
                <p className="quest-card__description">{description}</p>
              )}
            </div>
            {!isLocked && status !== 'completed' && (
              <button className={getActionButtonClass()} onClick={handleActionClick}>
                {getActionButtonText()}
              </button>
            )}
          </div>
          <div className="quest-card__progress-wrapper">
            <div className="quest-card__progress-bar">
              <div className="quest-card__progress-fill" data-progress={Math.round(progress / 5) * 5} />
              <span className="quest-card__progress-text">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {isExpanded && hasRewards && !isLocked && (
          <div className="quest-card__content">
            <QuestRewards rewards={rewards} />
          </div>
        )}

        {canExpand && (
          <div className="quest-card__footer" onClick={() => setIsExpanded(!isExpanded)}>
            <span className="quest-card__footer-text">
              {isExpanded ? 'SHOW LESS' : 'SHOW DETAILS'}
            </span>
            <span className="quest-card__footer-icon">{isExpanded ? '▲' : '▼'}</span>
          </div>
        )}

        {isLocked && <LockedOverlay />}
        {isCompleted && <CompletedOverlay hasRewards={hasRewards} />}
      </div>
    </div>
  )
}
