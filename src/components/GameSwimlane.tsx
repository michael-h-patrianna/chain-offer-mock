import React from 'react'
import { ProductTile } from './ProductTile'

interface Product {
  code: string
  title: string
  supplierCode: string
}

interface GameSwimlaneProps {
  title: string
  icon?: string
  products: Product[]
  categoryCode: string
}

export const GameSwimlane: React.FC<GameSwimlaneProps> = ({ title, icon, products, categoryCode }) => {
  return (
    <div className={`HomeContent_slotsRowContainer__vA7H_ ${categoryCode}`}>
      <div className="styles_root__TLTRh HomeContent_title__LYzGH gameRow">
        <div className="styles_root__92GMy HomeContent_title__LYzGH">
          <h3 className="styles_titleWithLink__LDKBF" data-test={`title-${title}`}>
            <span>{title}</span>
          </h3>
          <a
            className="styles_link__SbRkt"
            data-test={`show-all-${title}`}
            title={`View all ${title}`}
            href="#"
          >
            View all
          </a>
        </div>
        <div className="styles_scrollWrap__8juHy hidePrevlArrow" data-test={`${title}-games-row`}>
          <div className="styles_scrollContainer__42IUy styles_tilesGrid__MI3Dz styles_tilesContainer__SKLpg lines-1 style-large">
            {products.map((product) => (
              <ProductTile
                key={product.code}
                code={product.code}
                title={product.title}
                supplierCode={product.supplierCode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
