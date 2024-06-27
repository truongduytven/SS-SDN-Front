import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { UserProvider } from './contexts/userContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster richColors position='top-right' />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
