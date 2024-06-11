import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { store } from './store/store'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'


export const socket = io(import.meta.env.BackendServer)
console.log(socket,'socket url')

socket.on('connect', () => {
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on('disconnect', () => {
  console.log(socket.id) // undefined
})



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
     </BrowserRouter>
)
