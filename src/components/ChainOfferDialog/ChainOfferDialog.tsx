import { m, LazyMotion, domAnimation } from 'motion/react'
import { useMemo } from 'react'
import { getRevealAnimation, type AnimationType } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import { applyAnimationParameters } from '../../utils/applyAnimationParameters'
import { CloseButton } from '../Shared/CloseButton'
import { DialogBackdrop } from '../Shared/DialogBackdrop'
import { ChainOfferMapItem, type ChainOfferMapItemProps } from './ChainOfferMapItem'
import { ChainOfferTimer } from './ChainOfferTimer'

export interface ChainOfferDialogProps {
  isOpen: boolean
  imageSrc: string
  endTime: string | number
  title?: string
  items: Omit<ChainOfferMapItemProps, 'onButtonClick'>[]
  termsUrl?: string
  onClose: () => void
  onItemButtonClick?: (itemId: string) => void
  onCountdownEnd?: () => void
  className?: string
  animationType?: AnimationType
}

const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
}

let a = containerVariants;

export const ChainOfferDialog = ({
  isOpen,
  imageSrc,
  endTime,
  title,
  items,
  termsUrl,
  onClose,
  onItemButtonClick,
  onCountdownEnd,
  className = '',
  animationType = 'none',
}: ChainOfferDialogProps) => {
  const { getParameters } = useAnimationParameters()

  const animation = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

  if (!isOpen) return null

  return (
    <DialogBackdrop isOpen={isOpen} onClose={onClose} backdropClassName='dialog-backdrop'>
      <dialog open className={`chain-offer-dialog ${className}`} aria-modal='true' aria-labelledby='chain-offer-title'>
        <CloseButton onClick={onClose} aria-label='Close chain offer dialog' />
        <LazyMotion features={domAnimation}>
          {/* Stagger container wrapping all content */}
          <m.div
            key={`chain-offer-stagger-${animationType}`}
            variants={animation.containerVariants}
            initial='hidden'
            animate='visible'
            style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
          >
            {/* Header */}
            <header className='chain-offer-header'>
              {/* Header Image */}
              <m.div variants={animation.layer1Variants} className='chain-offer-header__image-box'>
                <img alt={title} className='chain-offer-header__image' src={imageSrc} />

                {/* Timer */}
                <m.div className='chain-offer-timer' key='timer' variants={animation.layer1Variants}>
                  <ChainOfferTimer endTime={endTime} onCountdownEnd={onCountdownEnd} />
                </m.div>
              </m.div>
              {/* Title */}
              {title && (
                <m.p className='chain-offer-header__title' key='title' variants={animation.layer1Variants}>
                  {title}
                </m.p>
              )}
            </header>

            {/* Items container */}
            <section className='chain-offer-dialog__content'>
              {/* Each item is staggered */}
              {items.map((item) => (
                <m.div style={{ width: '100%' }} key={item.id} variants={animation.layer2Variants}>
                  <ChainOfferMapItem
                    key={item.id}
                    {...item}
                    onButtonClick={onItemButtonClick}
                    animationVariants={animation.layer2Variants}
                  />
                </m.div>
              ))}
            </section>

            {/* Footer */}
            {termsUrl && (
              <m.footer className='chain-offer-dialog__footer' key='footer' variants={animation.layer2Variants}>
                <a href={termsUrl} className='chain-offer-dialog__terms-link' target='_blank' rel='noopener noreferrer'>
                  Terms & Conditions
                </a>
              </m.footer>
            )}
          </m.div>
        </LazyMotion>
      </dialog>
    </DialogBackdrop>
  )
}
