import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { rememberPrerenderedBody } from './utils/prerendered'

const root = document.getElementById('root')!
// The prerendered article body (scripts/prerender-meta.js) is shown until the
// markdown chunk loads, so replacing #root never flashes an empty article.
rememberPrerenderedBody(root)

createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
