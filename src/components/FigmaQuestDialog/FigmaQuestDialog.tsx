import React, { useEffect, useMemo, useState } from 'react'
import { getRevealAnimation } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import { AnimationType } from '../../types/animationParameters'
import { applyAnimationParameters } from '../../utils/applyAnimationParameters'
import { DialogBackdrop } from '../Shared/DialogBackdrop'
import { QuestlineViewer } from './lib/components/QuestlineViewer'
import { ExtractedAssets } from './lib/types'
import { extractQuestlineZip } from './lib/utils/zipExtractor'

interface FigmaQuestDialogProps {
  isOpen: boolean
  onClose: () => void
  animationType?: AnimationType
  replayTrigger?: number
}

export const FigmaQuestDialog: React.FC<FigmaQuestDialogProps> = ({
  isOpen,
  onClose,
  animationType = 'spring-physics',
  replayTrigger = 0,
}) => {
  const [extractedAssets, setExtractedAssets] = useState<ExtractedAssets | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [questlineWidth, setQuestlineWidth] = useState(375)
  const [questlineHeight, setQuestlineHeight] = useState(812)

  const { getParameters } = useAnimationParameters()

  const animationConfig = useMemo(() => {
    const baseAnimation = getRevealAnimation(animationType)
    const parameters = getParameters(animationType)
    return applyAnimationParameters(baseAnimation, parameters)
  }, [animationType, getParameters])

  useEffect(() => {
    const loadTheme = async () => {
      if (extractedAssets) return // Already loaded

      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/assets/theme.zip')
        if (!response.ok) throw new Error('Failed to fetch theme.zip')

        const blob = await response.blob()
        const file = new File([blob], 'theme.zip', { type: 'application/zip' })

        const assets = await extractQuestlineZip(file)
        setExtractedAssets(assets)

        const frameWidth = assets.questlineData.frameSize.width || 375
        const frameHeight = assets.questlineData.frameSize.height || 812
        setQuestlineWidth(frameWidth)
        setQuestlineHeight(frameHeight)
      } catch (err) {
        console.warn('Theme load failed:', err)
        setError(err instanceof Error ? err.message : 'Failed to load theme')
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      loadTheme()
    }
  }, [isOpen, extractedAssets])

  if (!isOpen) return null

  return (
    <DialogBackdrop isOpen={isOpen} onClose={onClose} backdropClassName='dialog-backdrop'>
      <dialog
        open
        className='questline-dialog'
        style={{
          padding: 0,
          background: 'transparent',
          border: 'none',
          maxWidth: '100vw',
          maxHeight: '100vh',
          overflow: 'visible',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative', // Ensure dialog is a positioning context if needed, though fixed works better for close button
        }}
        aria-modal='true'
      >
        {isLoading && <div style={{ color: 'white' }}>Loading theme...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        {extractedAssets && (
          <QuestlineViewer
            key={`${animationType}-${replayTrigger}`}
            questlineData={extractedAssets.questlineData}
            assets={extractedAssets}
            questlineWidth={questlineWidth}
            questlineHeight={questlineHeight}
            animationConfig={animationConfig}
            onButtonClick={onClose}
            onClose={onClose}
          />
        )}
      </dialog>
    </DialogBackdrop>
  )
}
