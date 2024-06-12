import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { store } from './store/store'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'
import {jwtDecode} from 'jwt-decode';

const token = localStorage.getItem('token');
const decodedToken = jwtDecode(token);
const userId = decodedToken.id


// export const socket = io(import.meta.env.BackendServer).emit('join', 'userId')
export const socket = io('http://localhost:8000', {
    userId: { userId },
    withCredentials: true,
});
// console.log(socket,'socket url')


socket.on('connect', () => {
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
  socket.emit('join', userId);
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
