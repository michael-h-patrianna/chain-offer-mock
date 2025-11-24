import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimationType } from '../animations/revealAnimations'
import { ChainOfferDialog } from '../components/ChainOfferDialog/ChainOfferDialog'
import { FigmaQuestDialog } from '../components/FigmaQuestDialog/FigmaQuestDialog'
import { HamburgerButton } from '../components/Demo/HamburgerButton'
import { Sidebar } from '../components/Demo/Sidebar'
import { LobbyLayout } from '../components/MockWebpage/Lobby/LobbyLayout'
import { QuestLineDialog } from '../components/QuestLineDialog/QuestLineDialog'
import { SimpleQuestDialog } from '../components/SimpleQuestDialog/SimpleQuestDialog'
import { AnimationParametersProvider } from '../contexts/AnimationParametersProvider'
import { getDemoChainOfferDialogProps } from '../data/getDemoChainOffer'
import { getDemoQuestlineDialogProps, getSimpleQuestlineDialogProps } from '../data/getDemoQuestline'
import '../styles/main.scss'

function AppInner() {
  const [isChainOfferDialogOpen, setIsChainOfferDialogOpen] = useState(false)
  const [isQuestlineDialogOpen, setIsQuestlineDialogOpen] = useState(false)
  const [isSimpleQuestDialogOpen, setIsSimpleQuestDialogOpen] = useState(false)
  const [isFigmaQuestDialogOpen, setIsFigmaQuestDialogOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('stagger-inview')
  const [replayTrigger, setReplayTrigger] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    // Safe because app only runs in browser (no SSR)
    window.innerWidth > 768,
  )

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleReplay = () => {
    setReplayTrigger((prev) => prev + 1)
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

  const handleOpenFigmaQuestDialog = () => {
    setIsFigmaQuestDialogOpen(true)
  }

  const handleCloseFigmaQuestDialog = () => {
    setIsFigmaQuestDialogOpen(false)
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
        onReplay={handleReplay}
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
          onFigmaQuestClick={handleOpenFigmaQuestDialog}
          isSidebarOpen={isSidebarOpen}
        >
          {/* Chain Offer Dialog */}
          {chainOfferDialogProps && (
            <ChainOfferDialog
              key={`chain-offer-${replayTrigger}`}
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
              key={`questline-${replayTrigger}`}
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
              key={`simple-quest-${replayTrigger}`}
              {...simpleQuestDialogProps}
              isOpen={isSimpleQuestDialogOpen}
              onClose={handleCloseSimpleQuestDialog}
              onQuestAction={handleQuestAction}
              animationType={selectedAnimation}
            />
          )}
          {/* Figma Quest Dialog */}
          <FigmaQuestDialog
            isOpen={isFigmaQuestDialogOpen}
            onClose={handleCloseFigmaQuestDialog}
            animationType={selectedAnimation}
            replayTrigger={replayTrigger}
          />
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
