import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { store } from './store/store'
import { Provider } from 'react-redux'
import { socket } from './socket.jsx'
import ApolloProvider from './ApolloProvider.jsx'
import { Suspense } from 'react'
// import MemberList from './components/afterlogin/Members.jsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider>
        <Suspense fallback={<div className="text-4xl">Loading...</div>}>
            <App socket={socket} />
          </Suspense>
        </ApolloProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
)
