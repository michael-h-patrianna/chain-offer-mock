type AnyInstance = any

async function fetchBlobUrl(url?: string | null): Promise<string | undefined> {
  if (!url) return undefined
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('bad status')
    const blob = await res.blob()
    return URL.createObjectURL(blob)
  } catch {
    return url // fallback to original
  }
}

export async function preloadChainOfferImages(instances: AnyInstance[]): Promise<AnyInstance[]> {
  return Promise.all(
    instances.map(async (inst) => {
      const clone = { ...inst }
      clone.iconLarge = (await fetchBlobUrl(clone.iconLarge)) || clone.iconLarge
      clone.iconSmall = (await fetchBlobUrl(clone.iconSmall)) || clone.iconSmall
      clone.arrowImgUrl = (await fetchBlobUrl(clone.arrowImgUrl)) || clone.arrowImgUrl

      const headerUrl = clone?.mapType?.params?.mapListHeader?.stringValue
      if (headerUrl) {
        clone.mapType.params.mapListHeader.stringValue = (await fetchBlobUrl(headerUrl)) || headerUrl
      }
      const bgList = clone?.mapType?.params?.mapListItemBackgrounds?.listValue
      if (Array.isArray(bgList)) {
        clone.mapType.params.mapListItemBackgrounds.listValue = await Promise.all(
          bgList.map(async (u: string) => (await fetchBlobUrl(u)) || u)
        )
      }
      return clone
    })
  )
}
