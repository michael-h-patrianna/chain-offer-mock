import { motion } from 'motion/react'
import React, { useMemo } from 'react'
import type { AnimationType } from '../../animations/revealAnimations'
import { getRevealAnimation } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import { applyAnimationParameters } from '../../utils/applyAnimationParameters'
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
  const { getParameters } = useAnimationParameters()

  const completedQuests = useMemo(
    () => quests.filter((quest) => quest.status === 'completed').length,
    [quests]
  )

  const animation = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

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

        {/* Stagger container wrapping all content */}
        <motion.div
          key={`questline-stagger-${animationType}`}
          variants={animation.containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'visible', alignItems: 'center' }}
        >
          {/* Header Image */}
          <motion.img
            src={headerImageUrl}
            alt={title}
            className="questline-dialog__header-image"
            variants={animation.questlineHeaderImageVariants}
          />

          {/* Timer */}
          <motion.div variants={animation.questlineTimerVariants}>
            <ChainOfferTimer
              endTime={endTime}
              onCountdownEnd={() => {}}
              className="questline-dialog__timer"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            className="questline-dialog__description-wrapper"
            variants={animation.questlineDescriptionVariants}
          >
            <p className="questline-dialog__description">{description}</p>
          </motion.div>

          {/* Bonus Rewards */}
          <motion.div
            style={{ width: '100%', padding: '0 16px' }}
            variants={animation.questlineBonusRewardsVariants}
          >
            <BonusRewards
              {...bonusReward}
              completedQuests={completedQuests}
              onClaim={onClaimBonus}
            />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            style={{ width: '100%', padding: '0 16px' }}
            variants={animation.questlineProgressBarVariants}
          >
            <MilestoneProgressBar
              totalQuests={quests.length}
              completedQuests={completedQuests}
            />
          </motion.div>

          {/* Quest Cards - each staggered */}
          <div className="questline-dialog__quests">
            {quests.map((quest) => (
              <motion.div key={quest.questCode} variants={animation.itemVariants}>
                <QuestCard
                  {...quest}
                  onAction={onQuestAction}
                />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          {termsUrl && (
            <motion.div
              className="questline-dialog__footer"
              variants={animation.questlineFooterVariants}
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
        </motion.div>
      </div>
    </div>
  )
}
