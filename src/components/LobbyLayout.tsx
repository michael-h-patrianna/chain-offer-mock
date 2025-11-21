import React from 'react'
import { QuestLinesIcon } from './QuestLinesIcon'
import { ChainOfferIcon } from './ChainOfferIcon'

interface LobbyLayoutProps {
  onQuestLineClick: () => void
  onChainOfferClick: () => void
  children: React.ReactNode
}

export const LobbyLayout: React.FC<LobbyLayoutProps> = ({
  onQuestLineClick,
  onChainOfferClick,
  children
}) => {
  return (
    <>
        {/* Global Background from single.html */}
        <picture>
            <img role="presentation" alt="" width="2000" height="2000" style={{position:'fixed',top:0,left:0,bottom:0,right:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',zIndex:-1}} src="/images/7c8e8aa28974bb10b475ff173f9c3acf.webp" />
            <source srcSet="/images/27d7e81f35cb17e372b170be1a3aa226.webp 600w, /images/7c8e8aa28974bb10b475ff173f9c3acf.webp 2000w" sizes="100vw" />
        </picture>

        {/* Ensure root-layout is positioned relative so absolute children move with it */}
        <section id="root-layout" style={{ position: 'relative' }}>
            <main 
                className="Layout_main__IhRQB Layout_fullContent__5V2R5 Layout_isFullWidthContainer__vTeyo" 
                style={{
                    maxWidth: '414px', 
                    width: '100%',
                    margin: '0 auto', 
                    minHeight: '100vh', 
                    backgroundColor: '#120a21',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                }}
            >
                <style>{`
                    .Layout_main__IhRQB.Layout_fullContent__5V2R5.Layout_isFullWidthContainer__vTeyo {
                        max-width: 414px !important;
                        width: 100% !important;
                        padding-top: 0 !important;
                    }
                    /* Force Header layout to prevent overlap */
                    .Header_mobileHeader__Jh8Ni {
                        display: flex !important;
                        justify-content: space-between !important;
                        align-items: center !important;
                        width: 100% !important;
                        position: relative !important;
                    }
                    /* Reset margins/positioning on children */
                    .Header_logoColumn__zJ_9i, .Header_mobileHeaderRightCol__MNhAo {
                        position: relative !important;
                        flex-shrink: 0 !important;
                    }
                    /* Reduce spacing between categories and games */
                    .HomeContent_slotsRowContainer__vA7H_ {
                        margin-top: 0 !important;
                    }
                    .CategoriesStickyWrapper_root__m05aG {
                        margin-bottom: 10px !important;
                    }
                `}</style>
                
                {/* PLAYFAME GLOBAL HEADER */}
                <header data-testid="app-bar" className="mt-appbar Header_root__t1iyN" style={{position: 'sticky', top: 0, width: '100%', zIndex: 100}}>
                    <div className="main-container Header_headerWrapper__5GHns">
                        <div className="Header_mobileHeader__Jh8Ni">
                            <div className="Header_logoColumn__zJ_9i">
                                <a data-testid="logo-link" href="/">
                                    <img 
                                        alt="playfame" 
                                        width="135" 
                                        height="60" 
                                        className="BrandLogoLink_logo__DmhPX" 
                                        src="/images/6e907de4db52d7b0543a2837798ef615.png" 
                                        style={{width: '135px', height: '60px', objectFit: 'contain'}} 
                                    />
                                </a>
                            </div>
                            <div className="Header_mobileHeaderRightCol__MNhAo">
                                <button data-disabled="false" className="mt-button-base-root mt-icon-button-root mt-icon-button-root-sizeMedium Header_searchButton__1DxVY" data-testid="button-base" aria-label="back button">
                                    <span className="mt-icon-button-label">
                                        <img width="28" height="28" alt="Search" src="/images/2aa9997c3f066e630d621917812531e9.svg" />
                                    </span>
                                </button>
                                <div className="styles_root__mCTjK">
                                    <div className="styles_cashBalanceWrap__dpZ0n">
                                        <div className="styles_root__yxf9b styles_headerMode__4pypJ" data-test="cash-balance-header">
                                            <div className="styles_labels__DcaxE styles_reversedText__K3fjq styles_link__1ezVS">
                                                <div className="styles_label__9sAzS"> {/* GC Balance */}
                                                    <div className="mt-typography-caption styles_currencyText__vrOmj styles_currencyGCText__tbYPp styles_currencyTextWithBg__sxFdY">
                                                        <img className="styles_icon__lMiVC" alt="gold coin icon" src="/images/6c76d12c955544717c33b18a97187b7f.png" />
                                                        <span><span className="styles_currencyName__3N9eT">GC </span>0</span>
                                                    </div>
                                                </div>
                                                <div className="styles_label__9sAzS styles_labelMobile__A4kyI"> {/* SC Balance */}
                                                    <div className="mt-typography-caption styles_currencyText__vrOmj styles_currencySCText__SfUqM styles_currencyTextWithBg__sxFdY">
                                                        <img className="styles_icon__lMiVC" alt="sc icon" src="/images/04221fd8e99647ee1689af9cc7382951.png" />
                                                        <span><span className="styles_currencyName__3N9eT">SC </span>0.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="main-container limited" style={{flex: 1}}> {/* flex:1 pushes footer down */}
                    
                    <div id="smart-banner-container"></div>

                    {/* Features / Swimlane Section */}
                    <div className="FeaturesIcons_root__bTCHZ FeaturesIcons_root__H45hJ" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="BackgroungImage_vars__WiRUP BackgroungImage_root__f3757 FeaturesIcons_root__H45hJ">
                            <div className="BackgroungImage_coverContainer__Aa4N1">
                                <img alt="" className="BackgroungImage_cover__ZAkC9" src="/images/header.jpg" />
                            </div>
                        </div>

                        <div className="SwimlaneLayout_vars__9Bu1Y SwimlaneLayout_iconsSwimlane__ohefI">
                            <div className="WidgetContainer_vars__5xkTP WidgetContainer_widgetWrapper___GVpc WidgetContainer_bottom__SuNn_ WidgetContainer_swimlane__piJeN WidgetContainer_samePlacement__QG_gF">
                                <div className="WidgetContainer_widgetContainer__C77Iu">
                                    <div>
                                        <section className="WidgetV1_root__JlI6g WidgetV1_namedProgress__U8z19 Loyalty_widget__CyXWY">
                                            <div className="ProgressBarWithLevel_wrapper__TmLRK WidgetV1_progressBar__J4tw_">
                                                {/* Left Icon: Rising Star 12 */}
                                                <div className="ProgressBarWithLevel_levelIconContainer__ktokE ProgressBarWithLevel_currentLevel__7XWpc" data-icon-type="numbered">
                                                    <img alt="Rising Star 12" src="/images/134cce0e47648296d1dfabe3b9df1a88.png" style={{width: '48px', height: 'auto'}} />
                                                </div>
                                                
                                                <div className="ProgressBar_root__00qoq" style={{'--loyalty-progress-value': '84'} as any}>
                                                    <div className="ProgressBar_progressBar__5YY32 IconAwareProgressBar_progressBar__l1GWF IconAwareProgressBar_namedProgress__miLiN"></div>
                                                    <span className="ProgressBar_progressText__DcXRn">84%</span>
                                                </div>

                                                {/* Right Icon: Rising Star 13 */}
                                                <div className="ProgressBarWithLevel_levelIconContainer__ktokE ProgressBarWithLevel_nextLevel__CZ921" data-icon-type="numbered">
                                                    <img alt="Rising Star 13" src="/images/a1778d478f694a15fdad05cbba703991.png" style={{width: '48px', height: 'auto'}} />
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="WidgetContainer_timerWrapper__677co"></div>
                                </div>
                            </div>

                            <div className="styles_scrollWrap__rOHSF SwimlaneLayout_swimlaneContainerRoot__3_lrd SwimlaneLayout_bottom__fGfHZ SwimlaneLayout_mobile__jqEAO hidePrevlArrow">
                                <div className="styles_scrollContainer__SPCjI SwimlaneLayout_iconsSwimlaneContainer__3e_Q6">
                                    {/* 1. Purchase Offer */}
                                    <div className="SwimlaneLayout_swimlaneItem__T471I FeaturesIcons_swimlaneItem__ovgn4">
                                        <button data-feature-id="purchase_offers_101" className="Feature_iconWrapper__DM0lH">
                                            <img alt="" className="Feature_icon__eN4Mv" src="/images/561248f9780b3500d53ff1a5f1e46de7.png" />
                                        </button>
                                    </div>
                                    {/* 2. Quest Lines */}
                                    <div className="SwimlaneLayout_swimlaneItem__T471I FeaturesIcons_swimlaneItem__ovgn4">
                                        <div data-feature-id="quest_lines_107" className="Placeholder_placeholderWrapper__CbrcB FeaturesIcons_placeholderWrapper__O88P1">
                                            <QuestLinesIcon onClick={onQuestLineClick} />
                                        </div>
                                    </div>
                                    {/* 3. Random Rewards */}
                                    <div className="SwimlaneLayout_swimlaneItem__T471I FeaturesIcons_swimlaneItem__ovgn4">
                                        <div data-feature-id="random_rewards_99" className="Placeholder_placeholderWrapper__CbrcB FeaturesIcons_placeholderWrapper__O88P1">
                                            <ChainOfferIcon onClick={onChainOfferClick} />
                                        </div>
                                    </div>
                                    {/* 4. Daily Rewards */}
                                    <div className="SwimlaneLayout_swimlaneItem__T471I FeaturesIcons_swimlaneItem__ovgn4">
                                        <button data-feature-id="daily_rewards_102" className="Feature_iconWrapper__DM0lH">
                                            <img alt="" className="Feature_icon__eN4Mv" src="/images/4c9db3d4efe4b1ef3532c448de751573.png" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Categories Header */}
                    <div style={{position: 'relative', zIndex: 90}}>
                        <div className="CategoriesStickyWrapper_stickyBorderWrapper__f9VRk"></div>
                        <div className="CategoriesStickyWrapper_root__m05aG HomeStickyCategories_categoriesStickyWrapper__i1Yhe CategoriesStickyWrapper_stickyRoot__upTa0">
                            <div className="CategoriesStickyWrapper_pageContent__gc_S0">
                                <div className="styles_scrollWrap__8juHy Categories_root__3uEw5 hidePrevlArrow">
                                    <div className="styles_scrollContainer__42IUy Categories_categories__pG6vs">
                                        <div data-pill="/lobby"><a href="#" className="Pill_pillRoot__JLx0P Categories_pill__cIW57 Pill_selectedPill__mhp3S"><span className="Pill_pillLabel__jFAZB">Lobby</span></a></div>
                                        <div data-pill="/recommended"><a href="#" className="Pill_pillRoot__JLx0P Categories_pill__cIW57"><span className="Pill_pillLabel__jFAZB">For You</span></a></div>
                                        <div data-pill="/slots/popular"><a href="#" className="Pill_pillRoot__JLx0P Categories_pill__cIW57"><span className="Pill_pillLabel__jFAZB">Popular</span></a></div>
                                        <div data-pill="/slots/hold-and-win"><a href="#" className="Pill_pillRoot__JLx0P Categories_pill__cIW57"><span className="Pill_pillLabel__jFAZB">Hold and Win</span></a></div>
                                        <div data-pill="/slots/new"><a href="#" className="Pill_pillRoot__JLx0P Categories_pill__cIW57"><span className="Pill_pillLabel__jFAZB">New</span></a></div>
                                        <div data-pill="/slots"><a href="#" className="Pill_pillRoot__JLx0P Categories_pill__cIW57"><span className="Pill_pillLabel__jFAZB">Slots</span></a></div>
                                    </div>
                                </div>
                                <div className="HomeStickyCategories_decorativeBackground__fxKbb"></div>
                            </div>
                        </div>
                    </div>

                    {/* Most Popular Games Row */}
                    <div className="HomeContent_slotsRowContainer__vA7H_ top">
                        <div className="styles_root__TLTRh HomeContent_title__LYzGH gameRow">
                            <div className="styles_root__92GMy HomeContent_title__LYzGH">
                                <h3 className="styles_titleWithLink__LDKBF" data-test="title-Most Popular Games"><span>Most Popular Games</span></h3>
                                <a className="styles_link__SbRkt" data-test="show-all-Most Popular Games" title="View all Most Popular Games" href="#">View all</a>
                            </div>
                            <div className="styles_scrollWrap__8juHy hidePrevlArrow" data-test="Most Popular Games-games-row">
                                <div className="styles_scrollContainer__42IUy styles_tilesGrid__MI3Dz styles_tilesContainer__SKLpg lines-1 style-large">
                                    {/* Mad Hit Slippery Soap */}
                                    <div className="ProductTile_root__Dqjo0 ProductTile_rootVisible__76TQE">
                                        <div className="ProductTile_imageContainer__o2Irg" data-test="game-tile-rp_857">
                                            <div className="ProductTileTags_tags__CcUoq">
                                                <div className="ProductTileTags_textTags__Jlb6X ProductTileTags_textTagsLarge__zIhgt">
                                                    <span className="ProductTileTags_textTag___C397 ProductTileTags_primaryColorTag__MQ_C_">
                                                        <span className="ProductTileTags_textTagBody__IOaYq">New</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <picture>
                                                <img alt="Mad Hit Slippery Soap" className="styles_image__8mDPx ProductTile_image__KEVUt" width="87" height="116" loading="lazy" decoding="async" src="/images/66a1b61a984fd98144cc917d5399df05.webp" />
                                            </picture>
                                        </div>
                                    </div>
                                    
                                    {/* Wild Wick */}
                                    <div className="ProductTile_root__Dqjo0 ProductTile_rootVisible__76TQE">
                                        <div className="ProductTile_imageContainer__o2Irg" data-test="game-tile-WildWick">
                                            <div className="ProductTileTags_tags__CcUoq">
                                                <div className="ProductTileTags_textTags__Jlb6X ProductTileTags_textTagsLarge__zIhgt">
                                                    <span className="ProductTileTags_textTag___C397 ProductTileTags_primaryColorTag__MQ_C_">
                                                        <span className="ProductTileTags_textTagBody__IOaYq">New</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <picture>
                                                <img alt="Wild Wick" className="styles_image__8mDPx ProductTile_image__KEVUt" width="87" height="116" loading="lazy" decoding="async" src="/images/4769d0f1a35ffa678a13f977121bffef.webp" />
                                            </picture>
                                        </div>
                                    </div>

                                    {/* 3 Super Hot Chillies */}
                                    <div className="ProductTile_root__Dqjo0 ProductTile_rootVisible__76TQE">
                                        <div className="ProductTile_imageContainer__o2Irg" data-test="game-tile-oa_3_super_hot_chillies">
                                            <picture>
                                                <img alt="3 Super Hot Chillies: Hold and Win" className="styles_image__8mDPx ProductTile_image__KEVUt" width="87" height="116" loading="lazy" decoding="async" src="/images/41903ae386f9a68a5841896582c4b893.webp" />
                                            </picture>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="Layout_footer__cFYCg Layout_footerWithNoOffset___PDj_">
                    <footer className="styles_root__iAhT_ main-container limited">
                        <div className="styles_footerLogoHolder__VoVBR">
                            <img alt="playfame" width="135" height="60" className="BrandLogoLink_logo__DmhPX styles_logo__wk5aS" src="/images/7fc6d99544cb5726df4744f31d7b5c99.png" style={{objectFit: 'contain'}} />
                            <p className="styles_text__g2Fxh">© 2025 PlayFame.com | All rights reserved.</p>
                        </div>
                    </footer>
                </div>

                {/* Mobile Bottom Navigation - Sticky Bottom */}
                <div className="MenuMobile_root__SqU53" style={{position: 'sticky', bottom: 0, zIndex: 100, width: '100%'}}>
                    
                    {/* Special Offer Button - Now inside sticky container to float above nav */}
                    <div className="SpecialOfferButton_root__u5BwC" style={{position: 'absolute', bottom: '70px', right: '10px', zIndex: 90, height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span className="SpecialOfferButton_amount__vAPAQ">4</span>
                        <button type="button" className="SpecialOfferButton_button__2B1LR">
                            <img width="90" height="103" className="SpecialOfferButton_present__TdCTD SpecialOfferButton_animation__i6TGg" alt="" src="/images/b935454bfcb3de1c16e5edf695b65258.png" />
                        </button>
                    </div>

                    <div className="mt-bottom-navigation-root MenuMobile_bottomNavigation__DhLlg" style={{position: 'relative', background: 'none'}}>
                        {/* Restored SVG Background */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" preserveAspectRatio="none" viewBox="0 0 414 66" className="MenuBackground_root__RQY0Y" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1}}>
                            <g filter="url(#a)">
                                <path fill="#2A1C4D" d="M0 38.213c0-11.045 8.953-20 19.999-20H130.5c5.813 0 12.411 0 19.227-3.144C155.179 12.553 160.804 10 166.809 10H245.251c8.009 0 15.451 4.76 23.164 6.913 5.561 1.553 11.7 1.3 16.585 1.3h109.032c11.045 0 19.968 8.955 19.968 20V66H0V38.213Z"></path>
                                <path stroke="url(#b)" d="M.5 38.213c0-10.77 8.73-19.5 19.499-19.5H130.53c5.8 0 12.491 0 19.406-3.19 5.469-2.524 10.996-5.023 16.873-5.023H245.251c3.909 0 7.702 1.162 11.515 2.616 1.109.423 2.223.872 3.342 1.324 2.699 1.088 5.426 2.188 8.173 2.955 4.968 1.387 10.386 1.354 14.921 1.326.617-.004 1.217-.008 1.798-.008H394.032c10.768 0 19.468 8.73 19.468 19.5V65.5H.5V38.213Z"></path>
                            </g>
                            <defs>
                                <linearGradient id="b" x1="143" x2="253.526" y1="10" y2="104.693" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#AC67D7"></stop>
                                    <stop offset="1" stopColor="#9458D3"></stop>
                                </linearGradient>
                                <filter id="a" width="442" height="84" x="-14" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                    <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                    <feOffset dy="4"></feOffset>
                                    <feGaussianBlur stdDeviation="7"></feGaussianBlur>
                                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"></feColorMatrix>
                                    <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2773_15707"></feBlend>
                                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_2773_15707" result="shape"></feBlend>
                                </filter>
                            </defs>
                        </svg>

                        <button className="mt-button-base-root mt-bottom-navigation-action-root MenuMobile_navigationButton__K7JoC MenuMobile_navigationButtonActive__x1vbx">
                            <span className="mt-bottom-navigation-action-wrapper">
                                <img height="24" width="24" className="mt-bottom-navigation-action-icon" alt="Home" src="/images/7118534896a1b95c3f938c0952f35d56.svg" />
                                <span className="mt-bottom-navigation-action-label">Lobby</span>
                            </span>
                        </button>
                        <button className="mt-button-base-root mt-bottom-navigation-action-root MenuMobile_navigationButton__K7JoC">
                            <span className="mt-bottom-navigation-action-wrapper">
                                <img height="24" width="24" className="mt-bottom-navigation-action-icon" alt="Promotions" src="/images/dd1960b2237f55813c197258fbb017d7.svg" />
                                <span className="mt-bottom-navigation-action-label">Promotions</span>
                            </span>
                        </button>
                        {/* Middle Space for Get Coins - visual spacer or button */}
                        <div style={{width: '80px'}}></div> 

                        <button className="mt-button-base-root mt-bottom-navigation-action-root MenuMobile_navigationButton__K7JoC">
                            <span className="mt-bottom-navigation-action-wrapper">
                                <span className="NotificationIcon_root__ZpRzb">
                                    <div className="NotificationIcon_badge__osWhY">
                                        <div className="CountBadge_badge__CYC4L CountBadge_sizeSm__BPbNg">3</div>
                                    </div>
                                    <img className="mt-bottom-navigation-action-icon NotificationIcon_image__zWV_x" height="24" width="24" alt="notifications" src="/images/a4cc9e03f5169c47cfeeec34e3d3f5bf.svg" />
                                </span>
                                <span className="mt-bottom-navigation-action-label">Notifications</span>
                            </span>
                        </button>
                        <button className="mt-button-base-root mt-bottom-navigation-action-root MenuMobile_navigationButton__K7JoC">
                            <span className="mt-bottom-navigation-action-wrapper">
                                <div className="OpenDrawerIcon_menuBox__V7cU8" aria-label="burger menu">
                                    <div className="OpenDrawerIcon_badge__JVLm6">
                                        <div className="CountBadge_badge__CYC4L CountBadge_sizeSm__BPbNg">3</div>
                                    </div>
                                    <div className="OpenDrawerIcon_menu__O8EhV">
                                        <div className="OpenDrawerIcon_bar__edn7l"></div>
                                        <div className="OpenDrawerIcon_bar__edn7l"></div>
                                        <div className="OpenDrawerIcon_bar__edn7l"></div>
                                    </div>
                                </div>
                                <span className="mt-bottom-navigation-action-label">Menu</span>
                            </span>
                        </button>
                    </div>
                    
                    {/* Get Coins Floating Button */}
                    <div className="MenuMobile_mainActionWrapper__3dS4f" style={{position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10}}>
                        <div className="MenuMobile_cashShop__7UDkx">
                            <button className="mt-button-base-root mt-button-contained styles_root__YiphY bottom-navigation-get-coins-btn styles_size-md__t_xLu" data-testid="button-base" data-test="common-header-buy-button" role="button">Get Coins</button>
                        </div>
                    </div>
                </div>

            </main>
            
            {/* Move children INSIDE the main wrapper to ensure they are constrained by the 414px width */}
            <div 
                className="Layout_main__IhRQB Layout_fullContent__5V2R5 Layout_isFullWidthContainer__vTeyo" 
                style={{
                    maxWidth: '414px', 
                    width: '100%',
                    margin: '0 auto', 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    pointerEvents: 'none' // Allow clicks to pass through wrapper, but children (dialogs) will need pointer-events: auto
                }}
            >
                <div style={{pointerEvents: 'auto'}}>
                    {children}
                </div>
            </div>
        </section>
    </>
  )
}