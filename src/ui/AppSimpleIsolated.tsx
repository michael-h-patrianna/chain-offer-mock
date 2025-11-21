import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { AnimationType } from '../animations/revealAnimations'
import { ChainOfferDialog } from '../components'
import { HamburgerButton } from '../components/HamburgerButton'
import { QuestLineDialog } from '../components/QuestLineDialog'
import { Sidebar } from '../components/Sidebar'
import { LobbyLayout } from '../components/LobbyLayout'
import { AnimationParametersProvider } from '../contexts/AnimationParametersContext'
import chainOffersRawData from '../data/chainOffersData.json'
import questlineRawData from '../data/questlineData.json'
import { RootState } from '../store'
import { setChainOffersBootstrapped, setChainOffersItems } from '../store/chainOffersSlice'
import '../styles/chain-offers.scss'
import { transformChainOfferData } from '../utils/transformChainOfferData'
import { transformQuestLineData } from '../utils/transformQuestLineData'

function AppSimpleIsolatedInner() {
  const dispatch = useDispatch()
  const [isChainOfferDialogOpen, setIsChainOfferDialogOpen] = useState(false)
  const [isQuestlineDialogOpen, setIsQuestlineDialogOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('stagger-inview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Default to open on desktop, closed on mobile
    return typeof window !== 'undefined' && window.innerWidth > 768
  })
  const chainOffersState = useSelector((state: RootState) => state.chainOffers)

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const handleCloseSidebar = () => {
    // Only close on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setIsSidebarOpen(false)
    }
  }

  useEffect(() => {
    // Inject realistic expiry (6d 5h) so timer formatting matches production presentation
    const expiresAt = new Date(Date.now() + 6 * 24 * 3600 * 1000 + 5 * 3600 * 1000).toISOString()
    const processed = (chainOffersRawData as any).items.map((i: any) => ({ ...i, expiresAt }))
    dispatch(setChainOffersItems(processed))
    dispatch(setChainOffersBootstrapped())
  }, [dispatch])

  const assignedOffer = chainOffersState.items.find((i: any) => i.status === 'ASSIGNED')

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

  const handleItemButtonClick = (itemId: string) => {
    console.log('[App] Item button clicked:', itemId)
    // Handle purchase logic here
  }

  const handleQuestAction = (questId: string, status: string) => {
    console.log('[App] Quest action:', questId, status)
  }

  const handleClaimBonus = () => {
    console.log('[App] Claiming bonus rewards')
  }

  const chainOfferDialogProps = assignedOffer && isChainOfferDialogOpen ? transformChainOfferData(assignedOffer) : null
  const questlineDialogProps = isQuestlineDialogOpen ? transformQuestLineData(questlineRawData as any) : null

  return (
    <div className="app-container">
      <Toaster
        position="top-right"
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
        onClose={handleCloseSidebar}
        selectedAnimation={selectedAnimation}
        onAnimationTypeChange={setSelectedAnimation}
      />

      {/* Hamburger Menu Button */}
      <HamburgerButton isOpen={isSidebarOpen} onClick={handleToggleSidebar} />

      <div className="app-content" style={{ 
        marginLeft: isSidebarOpen ? '280px' : '0', 
        transition: 'margin-left 0.3s ease-in-out',
        width: '100%',
        minHeight: '100vh'
      }}>
        
        <LobbyLayout 
          onQuestLineClick={handleOpenQuestlineDialog}
          onChainOfferClick={handleOpenChainOfferDialog}
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

export function AppSimpleIsolated() {
  return (
    <AnimationParametersProvider>
      <AppSimpleIsolatedInner />
    </AnimationParametersProvider>
  )
}