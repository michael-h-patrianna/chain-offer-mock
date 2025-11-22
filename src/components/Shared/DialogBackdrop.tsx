import { useEffect } from 'react'

export interface DialogBackdropProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  backdropClassName?: string
}

export const DialogBackdrop = ({
  isOpen,
  onClose,
  children,
  backdropClassName = '',
}: DialogBackdropProps) => {
  // Add Escape key handler for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={`dialog-backdrop ${backdropClassName}`} onClick={handleBackdropClick}>
      {children}
    </div>
  )
}
