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
import { GoogleOAuthProvider } from '@react-oauth/google'


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// import dotenv from 'dotenv';
// dotenv.config();

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider>
         <Suspense fallback={<div className="text-4xl">Loading...</div>}>
            <App socket={socket} />
          </Suspense>
        </ApolloProvider>
      </QueryClientProvider>
    </Provider>
  </GoogleOAuthProvider>

  </BrowserRouter>
)
