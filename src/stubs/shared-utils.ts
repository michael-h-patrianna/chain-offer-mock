export const arrayFilterNullable = <T,>(arr?: (T | null | undefined)[]): T[] => (arr ? (arr.filter(Boolean) as T[]) : [])
export const noop = () => {}
export const nextTick = (cb: () => void) => setTimeout(cb, 0)
export const objectEntries = Object.entries as <T extends object>(o: T) => [keyof T, T[keyof T]][]

// Time formatting helpers (simplified for mock environment)
export const HH_MM_SS = '00:00:00'
export const MM_SS = '00:00'

export function getZeroPadded(n: number): string {
	return String(n).padStart(2, '0')
}

interface CountdownArgs { start: number; end: number }

export function getFormattedCountdownExtended({ start, end }: CountdownArgs): { countdown: string; pendingCountdown: string } {
	const totalMs = Math.max(0, end - start)
	const totalSeconds = Math.floor(totalMs / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	const countdown = [hours, minutes, seconds].map(getZeroPadded).join(':')
	return { countdown, pendingCountdown: HH_MM_SS }
}
