import './tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { store } from './redux/store'
import { Auth0ProviderWithRedirectCallback } from './utils/auth'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0ProviderWithRedirectCallback>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>
)
