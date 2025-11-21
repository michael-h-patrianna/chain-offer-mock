import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './ui/App';
// Minimal process polyfill for code referencing process.env.*
if (!(window as any).process) {
  ;(window as any).process = { env: { IMG_ORIGIN: '' } }
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
