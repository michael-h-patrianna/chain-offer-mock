import { AnimationType } from '../animations/revealAnimations'
import { AnimationParameterForm } from './AnimationParameterForm'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedAnimation: AnimationType
}

export function Sidebar({ isOpen, onClose, selectedAnimation }: SidebarProps) {
  return (
    <>
      {/* Backdrop for mobile - click to close */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__content">
          <AnimationParameterForm key={selectedAnimation} animationType={selectedAnimation} />
        </div>
      </aside>
    </>
  )
}
