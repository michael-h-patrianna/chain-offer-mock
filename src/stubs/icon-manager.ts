// Local lightweight icon manager matching required API
export class IconManager {
  private _icons = new Map<string, { desktop: string; mobile: string }>()
  setIcons(icons: Record<string, { desktop: string; mobile: string }>) {
    this._icons = new Map(Object.entries(icons))
  }
  getOfferIcon(name: string) {
    return this._icons.get(name) || null
  }
}
