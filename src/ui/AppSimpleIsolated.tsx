import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimationType, getAnimationOptions } from '../animations/revealAnimations'
import { ChainOfferDialog } from '../components'
import { QuestLineDialog } from '../components/QuestLineDialog'
import chainOffersRawData from '../data/chainOffersData.json'
import questlineRawData from '../data/questlineData.json'
import { RootState } from '../store'
import { setChainOffersBootstrapped, setChainOffersItems } from '../store/chainOffersSlice'
import '../styles/chain-offers.scss'
import { transformChainOfferData } from '../utils/transformChainOfferData'
import { transformQuestLineData } from '../utils/transformQuestLineData'

export function AppSimpleIsolated() {
  const dispatch = useDispatch()
  const [isChainOfferDialogOpen, setIsChainOfferDialogOpen] = useState(false)
  const [isQuestlineDialogOpen, setIsQuestlineDialogOpen] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<AnimationType>('stagger-inview')
  const chainOffersState = useSelector((state: RootState) => state.chainOffers)

  const animationOptions = getAnimationOptions()

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
      <div className="app-content">
        <h1 className="app-title">Chain Offer & Questline - Animation Showcase</h1>

        {/* Animation Selector */}
        <div className="animation-selector">
          <label htmlFor="animation-select" className="animation-selector__label">
            Select Reveal Animation:
          </label>
          <select
            id="animation-select"
            className="animation-selector__dropdown"
            value={selectedAnimation}
            onChange={(e) => setSelectedAnimation(e.target.value as AnimationType)}
          >
            {animationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
        </div>

        {/* Trigger buttons */}
        <div className="trigger-container">
          {assignedOffer && (
            <div className="offer-trigger">
              <img
                src={assignedOffer.iconLarge}
                alt='Chain Offer'
                className="offer-icon"
                onClick={handleOpenChainOfferDialog}
              />
              <p className="offer-description">Chain Offer</p>
            </div>
          )}
          <div className="offer-trigger">
            <img
              src="/assets/images/questline-icon.png"
              alt='Questline'
              className="offer-icon"
              onClick={handleOpenQuestlineDialog}
            />
            <p className="offer-description">Questline</p>
          </div>
        </div>

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
      </div>

      <style>{`
        .app-container {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #1a0833 0%, #2d1b4d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .app-content {
          text-align: center;
          width: 100%;
          max-width: 800px;
        }

        .app-title {
          color: #fff;
          margin-bottom: 20px;
        }

        .trigger-container {
          display: flex;
          gap: 40px;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .offer-trigger {
          cursor: pointer;
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .offer-trigger:hover {
          transform: scale(1.05);
        }

        .offer-icon {
          width: 140px;
          height: 140px;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .offer-description {
          color: #ccc;
          margin-top: 10px;
        }

        .animation-selector {
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .animation-selector__label {
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }

        .animation-selector__dropdown {
          padding: 10px 20px;
          font-size: 14px;
          border-radius: 8px;
          border: 2px solid #5a3d7a;
          background: #2d1b4d;
          color: #fff;
          cursor: pointer;
          min-width: 400px;
          transition: border-color 0.2s ease;
        }

        .animation-selector__dropdown:hover {
          border-color: #7a5d9a;
        }

        .animation-selector__dropdown:focus {
          outline: none;
          border-color: #9a7dba;
        }
      `}</style>
    </div>
  )
}
