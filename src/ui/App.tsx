import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimationType } from '../animations/revealAnimations'
import { ChainOfferDialog } from '../components/ChainOfferDialog/ChainOfferDialog'
import { HamburgerButton } from '../components/Demo/HamburgerButton'
import { Sidebar } from '../components/Demo/Sidebar'
import { LobbyLayout } from '../components/MockWebpage/Lobby/LobbyLayout'
import { SimpleQuestDialog } from '../components/QuestLineDialog/SimpleQuestDialog'
import { AnimationParametersProvider } from '../contexts/AnimationParametersProvider'
import { getDemoChainOfferDialogProps } from '../data/getDemoChainOffer'
import { getDemoQuestlineDialogProps, getSimpleQuestlineDialogProps } from '../data/getDemoQuestline'
import '../styles/main.scss'

function AppInner() {
  const [isChainOfferDialogOpen, setIsChainOfferDialogOpen] = useState(false)
  const [isQuestlineDialogOpen, setIsQuestlineDialogOpen] = useState(false)
  const [isSimpleQuestDialogOpen, setIsSimpleQuestDialogOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('stagger-inview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    // Safe because app only runs in browser (no SSR)
    window.innerWidth > 768,
  )

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleOpenChainOfferDialog = () => {
    setIsChainOfferDialogOpen(true)
  }

  const handleCloseChainOfferDialog = () => {
    setIsChainOfferDialogOpen(false)
  }

  const handleOpenQuestlineDialog = () => {
    setIsQuestlineDialogOpen(true)
  }

  const handleCloseQuestlineDialog = () => {
    setIsQuestlineDialogOpen(false)
  }

  const handleOpenSimpleQuestDialog = () => {
    setIsSimpleQuestDialogOpen(true)
  }

  const handleCloseSimpleQuestDialog = () => {
    setIsSimpleQuestDialogOpen(false)
  }

  const handleItemButtonClick = (itemId: string) => {
    // Handle purchase logic here
    void itemId
  }

  const handleQuestAction = (questId: string, status: string) => {
    void questId
    void status
  }

  const handleClaimBonus = () => {
    // Handle claim logic here
  }

  const chainOfferDialogProps = isChainOfferDialogOpen ? getDemoChainOfferDialogProps() : null
  const questlineDialogProps = isQuestlineDialogOpen ? getDemoQuestlineDialogProps() : null
  const simpleQuestDialogProps = isSimpleQuestDialogOpen ? getSimpleQuestlineDialogProps() : null

  return (
    <div className='app-container'>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        selectedAnimation={selectedAnimation}
        onAnimationTypeChange={setSelectedAnimation}
      />

      {/* Hamburger Menu Button */}
      <HamburgerButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />

      <div
        className='app-content'
        style={{
          marginLeft: isSidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <LobbyLayout
          onQuestLineClick={handleOpenQuestlineDialog}
          onChainOfferClick={handleOpenChainOfferDialog}
          onSimpleQuestClick={handleOpenSimpleQuestDialog}
          isSidebarOpen={isSidebarOpen}
        >
          {/* Chain Offer Dialog */}
          {chainOfferDialogProps && (
            <ChainOfferDialog
              {...chainOfferDialogProps}
              isOpen={isChainOfferDialogOpen}
              onClose={handleCloseChainOfferDialog}
              onItemButtonClick={handleItemButtonClick}
              animationType={selectedAnimation}
            />
          )}

          {/* Questline Dialog */}
          {questlineDialogProps && (
            <QuestLineDialog
              {...questlineDialogProps}
              isOpen={isQuestlineDialogOpen}
              onClose={handleCloseQuestlineDialog}
              onQuestAction={handleQuestAction}
              onClaimBonus={handleClaimBonus}
              animationType={selectedAnimation}
            />
          )}

          {/* Simple Quest Dialog */}
          {simpleQuestDialogProps && (
            <SimpleQuestDialog
              {...simpleQuestDialogProps}
              isOpen={isSimpleQuestDialogOpen}
              onClose={handleCloseSimpleQuestDialog}
              onQuestAction={handleQuestAction}
              animationType={selectedAnimation}
            />
          )}
        </LobbyLayout>
      </div>

      <style>{`
        .app-container {
          min-height: 100vh;
          width: 100%;
          background: #120a21; /* Match the dark background of the site */
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export function App() {
  return (
    <AnimationParametersProvider>
      <AppInner />
    </AnimationParametersProvider>
  )
}
