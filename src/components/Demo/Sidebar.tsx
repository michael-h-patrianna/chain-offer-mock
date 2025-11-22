import { AnimationType, getAnimationOptions } from '../../animations/revealAnimations'
import { AnimationParameterForm } from './AnimationParameterForm'

interface SidebarProps {
  isOpen: boolean
  selectedAnimation: AnimationType
  onAnimationTypeChange?: (animationType: AnimationType) => void
}

export function Sidebar({ isOpen, selectedAnimation, onAnimationTypeChange }: SidebarProps) {
  const animationOptions = getAnimationOptions()

  return (
    <>
      {/* Sidebar - no backdrop needed for demo controls */}
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
