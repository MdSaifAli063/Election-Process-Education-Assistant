import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider }   from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'
import App from './App.jsx'
import { initErrorReporting } from './services/monitoring'

initErrorReporting();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
