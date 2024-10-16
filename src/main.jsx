import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './store'
import { AuthContextProvider } from './store/context/AuthContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </StrictMode>
)
