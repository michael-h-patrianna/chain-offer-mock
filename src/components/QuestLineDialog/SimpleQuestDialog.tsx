import cx from 'classnames'
import { motion } from 'motion/react'
import React, { useMemo, useRef, useState } from 'react'
import { getRevealAnimation } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import type { QuestLineDialogProps } from '../../types/questline'
import { applyAnimationParameters } from '../../utils/applyAnimationParameters'
import { CloseButton } from '../Shared/CloseButton'
import { DialogBackdrop } from '../Shared/DialogBackdrop'
import { ModalCelebrationsCoinsFountain } from '../rewards/modal-celebrations/framer/ModalCelebrationsCoinsFountain'
import { BonusRewards } from './BonusRewards'
import { QuestlineTimer } from './QuestlineTimer'

export const SimpleQuestDialog = ({
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
  animationType = 'none',
}: QuestLineDialogProps) => {
  const { getParameters } = useAnimationParameters()
  const [showCoinFountain, setShowCoinFountain] = useState(false)
  const [fountainOrigin, setFountainOrigin] = useState({ x: 0, y: 0 })
  const [animationKey, setAnimationKey] = useState(0)
  const claimButtonRef = useRef<HTMLButtonElement>(null)

  // Simple Quest Logic: Focus on the first quest
  const activeQuest = quests[0]
  const status = activeQuest.status
  const questCode = activeQuest.questCode

  // For Simple Quest, "Bonus Reward" display usually reflects the main reward  // We use the bonusReward prop as the source of truth for the displayed reward
  const completedQuests = status === 'completed' ? 1 : 0

  const animation = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

  const handleActionClick = () => {
    if (!onQuestAction) return

    if (status === 'in_progress') {
      onQuestAction(questCode, 'go')
    } else if (status === 'unclaimed') {
      const button = claimButtonRef.current
      if (button) {
        const rect = button.getBoundingClientRect()
        setFountainOrigin({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
        setAnimationKey((prev) => prev + 1)
        setShowCoinFountain(true)
      }
      onQuestAction(questCode, 'claim')
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
    return cx('simple-quest-dialog__action-button', {
      'simple-quest-dialog__action-button--in-progress': status === 'in_progress',
      'simple-quest-dialog__action-button--unclaimed': status === 'unclaimed',
      'simple-quest-dialog__action-button--completed': status === 'completed',
    })
  }

  if (!isOpen) return null

  return (
    <DialogBackdrop isOpen={isOpen} onClose={onClose} backdropClassName='dialog-backdrop'>
      <dialog
        open
        className='questline-dialog simple-quest-dialog'
        aria-modal='true'
        aria-labelledby='simple-quest-title'
      >
        <h1 id='simple-quest-title' className='sr-only'>
          {title}
        </h1>
        <CloseButton onClick={onClose} aria-label='Close quest dialog' />

        <motion.div
          key={`simple-quest-stagger-${animationType}`}
          variants={animation.containerVariants}
          initial='hidden'
          animate='visible'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            alignItems: 'center',
          }}
        >
          {/* Header Image */}
          <motion.img
            src={headerImageUrl}
            alt={title}
            className='questline-dialog__header-image'
            variants={animation.questlineHeaderImageVariants}
          />

          {/* Timer */}

          <motion.div variants={animation.questlineTimerVariants}>
            <QuestlineTimer endTime={endTime} className='questline-dialog__timer' />
          </motion.div>

          <div className='simple-quest-dialog__content-wrapper'>
            {/* Task Section */}

            <motion.div
              className='simple-quest-dialog__card simple-quest-dialog__section'
              variants={animation.questlineDescriptionVariants}
            >
              <div className='simple-quest-dialog__card-content'>
                <h3 className='simple-quest-dialog__section-title'>DO THIS</h3>

                <div className='simple-quest-dialog__description-container'>
                  <p className='questline-dialog__description'>{description}</p>
                </div>

                {/* Progress Bar */}

                <div className='simple-quest-dialog__progress-bar'>
                  <div className='simple-quest-dialog__progress-track'>
                    <div
                      className='simple-quest-dialog__progress-fill'
                      style={{ width: `${String(activeQuest.progress)}%` }}
                    ></div>
                  </div>

                  <span className='simple-quest-dialog__progress-value'>{Math.round(activeQuest.progress)}%</span>
                </div>
              </div>
            </motion.div>

            {/* Reward Section */}

            <motion.div
              className='simple-quest-dialog__card simple-quest-dialog__section'
              variants={animation.questlineBonusRewardsVariants}
            >
              <div className='simple-quest-dialog__card-content'>
                <h3 className='simple-quest-dialog__section-title'>TO GET THIS</h3>

                <div className='simple-quest-dialog__rewards-wrapper'>
                  <BonusRewards {...bonusReward} completedQuests={completedQuests} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Button - Integrated directly into dialog body */}
          {status !== 'locked' && (
            <motion.button
              ref={claimButtonRef}
              className={getActionButtonClass()}
              onClick={handleActionClick}
              variants={animation.itemVariants} // Animate button in
              aria-label={`${getActionButtonText()} quest`}
              disabled={status === 'completed'}
            >
              {getActionButtonText()}
            </motion.button>
          )}

          {/* Footer */}
          {termsUrl && (
            <motion.div className='questline-dialog__footer' variants={animation.questlineFooterVariants}>
              <a href={termsUrl} className='questline-dialog__terms-link' target='_blank' rel='noopener noreferrer'>
                Terms & Conditions
              </a>
            </motion.div>
          )}
        </motion.div>
      </dialog>

      {/* Coin Fountain Animation */}
      {showCoinFountain && (
        <ModalCelebrationsCoinsFountain
          key={animationKey}
          originX={fountainOrigin.x}
          originY={fountainOrigin.y}
          onComplete={() => {
            setShowCoinFountain(false)
          }}
        />
      )}
    </DialogBackdrop>
  )
}
