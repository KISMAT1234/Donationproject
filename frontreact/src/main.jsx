import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import "./index.css"
import { store } from './store/store'
import { Provider } from 'react-redux'
import { socket } from './socket.jsx'
// import { io } from 'socket.io-client'

// const token = localStorage.getItem('token');
// let userId;

// if (token) {
//   const decodedToken = jwtDecode(token);
//   userId = decodedToken.id;
// }



// export const socket = io(import.meta.env.BackendServer).emit('join', 'userId')
// export const socket = io("http://localhost:8000", {
//     query: { userId },
//     withCredentials: true,
// });

// export const socket = io("http://localhost:8000",{
//   query: { userId }
// })
// // socket.emit('join', userId);
// // console.log(socket,'socket url')


// socket.on('connection', () => {
//   console.log('frontend connection successfully') // x8WIv7-mJelg7on_ALbx
// })

// socket.on('disconnect', () => {
//   console.log('frontend connection disconnect') // undefined
// })


  



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
          <App socket={socket}/>
        </Provider>
     </BrowserRouter>
)
