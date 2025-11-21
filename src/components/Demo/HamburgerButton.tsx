import './HamburgerButton.css'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      className={`hamburger ${isOpen ? 'hamburger--active' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
    </button>
  )
}
