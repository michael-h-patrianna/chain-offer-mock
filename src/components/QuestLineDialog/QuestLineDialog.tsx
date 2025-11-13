import { motion } from 'motion/react'
import React, { useMemo } from 'react'
import type { AnimationType } from '../../animations/revealAnimations'
import { getRevealAnimation } from '../../animations/revealAnimations'
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
  animationType = 'none',
}) => {
  const completedQuests = useMemo(
    () => quests.filter((quest) => quest.status === 'completed').length,
    [quests]
  )

  const animation = getRevealAnimation(animationType)

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

        <motion.img
          src={headerImageUrl}
          alt={title}
          className="questline-dialog__header-image"
          variants={animation.questlineHeaderImageVariants}
          initial="hidden"
          animate="visible"
        />

        <motion.div
          variants={animation.questlineTimerVariants}
          initial="hidden"
          animate="visible"
        >
          <ChainOfferTimer
            endTime={endTime}
            onCountdownEnd={() => {}}
            className="questline-dialog__timer"
          />
        </motion.div>

        <motion.div
          className="questline-dialog__description-wrapper"
          variants={animation.questlineDescriptionVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="questline-dialog__description">{description}</p>
        </motion.div>

        <motion.div
          style={{ width: '100%', padding: '0 16px' }}
          variants={animation.questlineBonusRewardsVariants}
          initial="hidden"
          animate="visible"
        >
          <BonusRewards
            {...bonusReward}
            completedQuests={completedQuests}
            onClaim={onClaimBonus}
          />
        </motion.div>

        <motion.div
          style={{ width: '100%', padding: '0 16px' }}
          variants={animation.questlineProgressBarVariants}
          initial="hidden"
          animate="visible"
        >
          <MilestoneProgressBar
            totalQuests={quests.length}
            completedQuests={completedQuests}
          />
        </motion.div>

        <motion.div
          key={`quest-container-${animationType}`}
          className="questline-dialog__quests"
          variants={animation.containerVariants}
          initial="hidden"
          animate="visible"
        >
          {quests.map((quest) => (
            <motion.div key={quest.questCode} variants={animation.itemVariants}>
              <QuestCard
                {...quest}
                onAction={onQuestAction}
              />
            </motion.div>
          ))}
        </motion.div>

        {termsUrl && (
          <motion.div
            className="questline-dialog__footer"
            variants={animation.questlineFooterVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href={termsUrl}
              className="questline-dialog__terms-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>
          </motion.div>
        )}
      </div>
    </div>
  )
}
