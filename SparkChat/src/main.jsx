import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'






import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.jsx'
import { SocketProvider } from './socket/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <BrowserRouter>
  
    <App />
    <Toaster />
    
   
    </BrowserRouter> 
  
  </SocketProvider>,
)
