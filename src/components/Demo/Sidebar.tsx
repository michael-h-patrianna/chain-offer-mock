import { AnimationType, getAnimationOptions } from '../../animations/revealAnimations'
import { AnimationParameterForm } from './AnimationParameterForm'

interface SidebarProps {
  isOpen: boolean
  selectedAnimation: AnimationType
  onAnimationTypeChange?: (animationType: AnimationType) => void
  onClose?: () => void
  onReplay?: () => void
}

export function Sidebar({ isOpen, selectedAnimation, onAnimationTypeChange, onReplay }: SidebarProps) {
  const animationOptions = getAnimationOptions()

  return (
    <>
      {/* Sidebar - no backdrop needed for demo controls */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className='sidebar__content'>
          <div className='sidebar__section'>
            <select
              id='animation-select'
              className='sidebar__select'
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

          <AnimationParameterForm
            key={selectedAnimation}
            animationType={selectedAnimation}
            onAnimationTypeChange={onAnimationTypeChange}
            onReplay={onReplay}
          />
        </div>
      </aside>
    </>
  )
}
