// Minimal stubs for intervalToDuration & formatDuration sufficient for countdown formatting
export interface Interval { start: number; end: number }

export function intervalToDuration({ start, end }: Interval) {
  const ms = Math.max(0, end - start)
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

interface FormatDurationOptions { format?: string[]; zero?: boolean; delimiter?: string; locale?: { formatDistance: (_: string, count: number) => string } }

export function formatDuration(duration: any, opts: FormatDurationOptions = {}) {
  const { format = ['hours','minutes','seconds'], delimiter=':', locale } = opts
  const parts: string[] = []
  for (const token of format) {
    const raw = duration[token]
    const n = typeof raw === 'number' ? raw : 0
    const val = locale ? locale.formatDistance(token, n) : String(n)
    parts.push(val.padStart(2,'0'))
  }
  return parts.join(delimiter)
}
