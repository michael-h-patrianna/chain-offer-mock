import React, { useMemo } from 'react'
import type { QuestLineDialogProps } from '../../types/questline'
import { ChainOfferTimer } from '../ChainOfferTimer'
import { BonusRewards } from './BonusRewards'
import { MilestoneProgressBar } from './MilestoneProgressBar'
import { QuestCard } from './QuestCard'
import './QuestLineDialog.css'

export const QuestLineDialog: React.FC<QuestLineDialogProps> = ({
  isOpen,
  title,
  description,
  headerImageUrl,
  endTime,
  quests,
  bonusReward,
  termsUrl,
  onClose,
  onQuestAction,
  onClaimBonus,
}) => {
  const completedQuests = useMemo(
    () => quests.filter((quest) => quest.status === 'completed').length,
    [quests]
  )

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="questline-dialog-backdrop" onClick={handleBackdropClick}>
      <div className="questline-dialog">
        <button
          className="questline-dialog__close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z" />
          </svg>
        </button>

        <img
          src={headerImageUrl}
          alt={title}
          className="questline-dialog__header-image"
        />

        <ChainOfferTimer
          endTime={endTime}
          onCountdownEnd={() => {}}
          className="questline-dialog__timer"
        />

        <div className="questline-dialog__description-wrapper">
          <p className="questline-dialog__description">{description}</p>
        </div>

        <BonusRewards
          {...bonusReward}
          completedQuests={completedQuests}
          onClaim={onClaimBonus}
        />

        <MilestoneProgressBar
          totalQuests={quests.length}
          completedQuests={completedQuests}
        />

        <div className="questline-dialog__quests">
          {quests.map((quest) => (
            <QuestCard
              key={quest.questCode}
              {...quest}
              onAction={onQuestAction}
            />
          ))}
        </div>

        {termsUrl && (
          <div className="questline-dialog__footer">
            <a
              href={termsUrl}
              className="questline-dialog__terms-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
