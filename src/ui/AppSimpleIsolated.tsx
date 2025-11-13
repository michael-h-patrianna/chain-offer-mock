import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChainOfferDialog } from '../components'
import rawData from '../data/chainOffersData.json'
import { RootState } from '../store'
import { setChainOffersBootstrapped, setChainOffersItems } from '../store/chainOffersSlice'
import '../styles/chain-offers.scss'
import { transformChainOfferData } from '../utils/transformChainOfferData'

export function AppSimpleIsolated() {
  const dispatch = useDispatch()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const chainOffersState = useSelector((state: RootState) => state.chainOffers)

  useEffect(() => {
    // Inject realistic expiry (6d 5h) so timer formatting matches production presentation
    const expiresAt = new Date(Date.now() + 6 * 24 * 3600 * 1000 + 5 * 3600 * 1000).toISOString()
    const processed = (rawData as any).items.map((i: any) => ({ ...i, expiresAt }))
    dispatch(setChainOffersItems(processed))
    dispatch(setChainOffersBootstrapped())
  }, [dispatch])

  const assignedOffer = chainOffersState.items.find((i: any) => i.status === 'ASSIGNED')

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleItemButtonClick = (itemId: string) => {
    console.log('[App] Item button clicked:', itemId)
    // Handle purchase logic here
  }

  const dialogProps = assignedOffer && isDialogOpen ? transformChainOfferData(assignedOffer) : null

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Chain Offer Dialog - Isolated Components</h1>

        {/* Trigger button */}
        {assignedOffer && (
          <div className="offer-trigger">
            <img
              src={assignedOffer.iconLarge}
              alt='Chain Offer'
              className="offer-icon"
              onClick={handleOpenDialog}
            />
            <p className="offer-description">Click to open Chain Offer dialog</p>
          </div>
        )}

        {/* Our isolated ChainOfferDialog component */}
        {dialogProps && (
          <ChainOfferDialog
            {...dialogProps}
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onItemButtonClick={handleItemButtonClick}
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

        .offer-trigger {
          cursor: pointer;
          transition: transform 0.2s ease;
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
      `}</style>
    </div>
  )
}
