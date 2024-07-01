import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { store } from './store/store'
import { Provider } from 'react-redux'
import { socket } from './socket.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


  



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App socket={socket}/>
          </QueryClientProvider>
        </Provider>
     </BrowserRouter>
)
