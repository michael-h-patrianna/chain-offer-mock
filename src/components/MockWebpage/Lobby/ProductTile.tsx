import React from 'react'

interface ProductTileProps {
  code: string
  title: string
  supplierCode: string
  tags?: string[] // Simplified for now
}

export const ProductTile = ({ code, title }: ProductTileProps) => {
  // Use remote URL pattern from the snapshot
  const imageUrl = `https://storage.googleapis.com/www.playfame.com/tiles/${code}/source.png`

  return (
    <div className="ProductTile_root__Dqjo0 ProductTile_rootVisible__76TQE">
      <div className="ProductTile_imageContainer__o2Irg" data-test={`game-tile-${code}`}>
        {/* Placeholder for tags if needed */}
        {/* <div className="ProductTileTags_tags__CcUoq">...</div> */}
        <picture>
          <img
            alt={title}
            className="styles_image__8mDPx ProductTile_image__KEVUt"
            width="87"
            height="116"
            loading="lazy"
            decoding="async"
            src={imageUrl}
            onError={(e) => {
              // Fallback to local placeholder if remote fails (optional, but good for dev)
              e.currentTarget.src = 'https://placehold.co/87x116?text=Game'
            }}
          />
        </picture>
      </div>
    </div>
  )
}
