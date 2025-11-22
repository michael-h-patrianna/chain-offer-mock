import { AnimationType, getAnimationOptions } from '../../animations/revealAnimations'
import { AnimationParameterForm } from './AnimationParameterForm'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedAnimation: AnimationType
  onAnimationTypeChange?: (animationType: AnimationType) => void
}

export function Sidebar({ isOpen, onClose, selectedAnimation, onAnimationTypeChange }: SidebarProps) {
  const animationOptions = getAnimationOptions()

  return (
    <>
      {/* Backdrop for mobile - click to close */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClose()
            }
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          <div className="sidebar__header">
            <h2 className="sidebar__title">Controls</h2>
          </div>

          <div className="sidebar__section">
            <label htmlFor="animation-select" className="sidebar__label">Animation Type</label>
            <select
              id="animation-select"
              className="sidebar__select"
              value={selectedAnimation}
              onChange={(e) => onAnimationTypeChange?.(e.target.value as AnimationType)}
            >
              {animationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sidebar__divider" />

          <AnimationParameterForm
            key={selectedAnimation}
            animationType={selectedAnimation}
            onAnimationTypeChange={onAnimationTypeChange}
          />
        </div>
      </aside>
    </>
  )
}
