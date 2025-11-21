import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/scrollbar.css';
import { App } from './ui/App';
import { AppSimpleIsolated } from './ui/AppSimpleIsolated';
import { Comparison } from './ui/Comparison';
import { SimpleHarness } from './ui/SimpleHarness';
// Minimal process polyfill for code referencing process.env.*
if (!(window as any).process) {
  ;(window as any).process = { env: { IMG_ORIGIN: '' } }
}

const params = new URLSearchParams(window.location.search)
const useIsolatedComponents = params.has('isolated')
const useComparison = params.has('compare')
const useSimple = params.has('simple')

// Switch between original and isolated components based on URL parameter
const AppComponent = useSimple ? SimpleHarness : (useComparison ? Comparison : (useIsolatedComponents ? AppSimpleIsolated : App))

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
)
