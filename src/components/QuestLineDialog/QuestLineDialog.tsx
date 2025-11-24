import { motion } from 'motion/react'
import { useMemo } from 'react'
import { getRevealAnimation } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import type { QuestLineDialogProps } from '../../types/questline'
import { applyAnimationParameters } from '../../utils/applyAnimationParameters'
import { CloseButton } from '../Shared/CloseButton'
import { DialogBackdrop } from '../Shared/DialogBackdrop'
import { BonusRewards } from './BonusRewards'
import { MilestoneProgressBar } from './MilestoneProgressBar'
import { QuestCard } from './QuestCard'
import { QuestlineTimer } from './QuestlineTimer'

export const QuestLineDialog = ({
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
}: QuestLineDialogProps) => {
  const { getParameters } = useAnimationParameters()

  const completedQuests = useMemo(() => quests.filter((quest) => quest.status === 'completed').length, [quests])

  const animation = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

  if (!isOpen) return null

  return (
    <DialogBackdrop isOpen={isOpen} onClose={onClose} backdropClassName='dialog-backdrop'>
      <dialog open className='questline-dialog' aria-modal='true' aria-labelledby='questline-title'>
        <CloseButton onClick={onClose} aria-label='Close quest line dialog' />

        {/* Stagger container wrapping all content */}
        <motion.div
          key={`questline-stagger-${animationType}`}
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
            key='header-image'
            variants={animation.layer1Variants}
          />

          {/* Timer */}
          <motion.div key='timer' variants={animation.layer1Variants}>
            <QuestlineTimer endTime={endTime} className='questline-dialog__timer' />
          </motion.div>

          {/* Description */}
          <motion.div
            className='questline-dialog__description-wrapper'
            key='description'
            variants={animation.layer1Variants}
          >
            <p className='questline-dialog__description'>{description}</p>
          </motion.div>

          {/* Bonus Rewards */}
          <motion.div style={{ width: '100%' }} key='bonus-rewards' variants={animation.layer1Variants}>
            <BonusRewards {...bonusReward} completedQuests={completedQuests} onClaim={onClaimBonus} />
          </motion.div>

          {/* Progress Bar */}
          <motion.div style={{ width: '100%' }} key='progress-bar' variants={animation.layer3Variants}>
            <MilestoneProgressBar totalQuests={quests.length} completedQuests={completedQuests} />
          </motion.div>

          {/* Quest Cards - each staggered */}
          <div className='questline-dialog__quests'>
            {quests.map((quest) => (
              <motion.div style={{ width: '100%' }} key={quest.questCode} variants={animation.layer2Variants}>
                <QuestCard {...quest} onAction={onQuestAction} />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          {termsUrl && (
            <motion.div className='questline-dialog__footer' key='footer' variants={animation.layer2Variants}>
              <a href={termsUrl} className='questline-dialog__terms-link' target='_blank' rel='noopener noreferrer'>
                Terms & Conditions
              </a>
            </motion.div>
          )}
        </motion.div>
      </dialog>
    </DialogBackdrop>
  )
}
