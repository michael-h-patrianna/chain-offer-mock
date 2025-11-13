import React from 'react'
const baseStyle: React.CSSProperties = { display: 'inline-block', width: 16, height: 16, textAlign: 'center' }
export const Close: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} aria-hidden="true" style={baseStyle}>×</span>
)
export const Timelapse: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} aria-hidden="true" style={baseStyle}>⏱</span>
)
export const CheckCircle: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} aria-hidden="true" style={baseStyle}>✔</span>
)
export const Lock: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} aria-hidden="true" style={baseStyle}>🔒</span>
)
