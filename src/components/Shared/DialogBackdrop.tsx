import React from 'react'

export interface DialogBackdropProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  backdropClassName?: string
}

export const DialogBackdrop: React.FC<DialogBackdropProps> = ({
  isOpen,
  onClose,
  children,
  backdropClassName = '',
}) => {
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
