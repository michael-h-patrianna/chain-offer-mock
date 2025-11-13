import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
export const Loader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 40, height: 40, border: '4px solid #999', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)
const translations: Record<string, (vars?: any) => string> = {
  'chain_offers.reward_gc_text': ({ gc }: any) => `GC ${gc?.toLocaleString?.() ?? gc}`,
  'chain_offers.reward_sc_text': ({ sc }: any) => `Free SC ${sc}`,
  'chain_offers.reward_xp_text': ({ xp }: any) => `${xp} XP`,
  'chain_offers.reward_free_spins_text': ({ freeSpins }: any) => `${freeSpins} Free Spins`,
  'chain_offers.step_free_text': () => 'Free',
  'chain_offers.dialog_timer_text': ({ timer }: any) => {
    if (!timer) return ''
    if (typeof timer === 'string') {
      const m = timer.match(/^(\d{2,}):(\d{2})(?::(\d{2}))?$/)
      if (m) {
        const totalHours = parseInt(m[1], 10)
        if (totalHours >= 24) {
          const days = Math.floor(totalHours / 24)
          const hours = totalHours % 24
          return `Ends in ${days}d ${hours}h`
        }
        // Keep full HH:MM:SS for production parity
        if (!m[3]) return `Ends in ${m[1]}:${m[2]}`
        return `Ends in ${m[1]}:${m[2]}:${m[3]}`
      }
      return `Ends in ${timer}`
    }
    // Accept either production string (already formatted) or shared-hook enriched object
    // If object has hms or short, prefer short when contains 'd'
  const days = Number(timer.days) || 0
  const hours = Number(timer.hours) || 0
  const minutes = Number(timer.minutes) || 0
    // For dialog we always want HH:MM:SS when under 24h
    if (days > 0) {
      const totalHours = days * 24 + hours
      return `Ends in ${String(totalHours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(timer.seconds||0).padStart(2,'0')}`
    }
    return `Ends in ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(timer.seconds||0).padStart(2,'0')}`
  },
  'chain_offers.terms_text': () => 'Terms & Conditions',
  'chain_offers.snackbar_to_late_description': () => 'Offer expired',
}
export const useTranslation = () => (key: string, vars: any = {}) => {
  const fn = translations[key]
  return fn ? fn(vars) : key
}

// Minimal generic button base used across original components
export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'outlined' | 'contained'
  size?: 'small' | 'medium' | 'large'
}
export const ButtonBase: React.FC<PropsWithChildren<ButtonBaseProps>> = ({ children, className = '', disabled, ...rest }) => (
  <button className={`btn-base ${className}`.trim()} disabled={disabled} {...rest}>
    {children}
  </button>
)

// IconButton just forwards to button
export const IconButton: React.FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({ children, className = '', type = 'button', ...rest }) => (
  <button type={type} className={`icon-btn ${className}`.trim()} {...rest}>
    {children}
  </button>
)

// Simple conditional render component
export const Show: React.FC<PropsWithChildren<{ when: any }>> = ({ when, children }) => (when ? <>{children}</> : null)
