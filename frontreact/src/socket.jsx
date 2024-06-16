import { io } from 'socket.io-client'
import {jwtDecode} from 'jwt-decode';
// import { socket } from './socket.jsx'

const token = localStorage.getItem('token');
let userId;

if (token) {
  const decodedToken = jwtDecode(token);
  userId = decodedToken.id;
}

export const socket = io("http://localhost:8000",{
  query: { userId }
})
// socket.emit('join', userId);
// console.log(socket,'socket url')


socket.on('connection', () => {
  console.log('frontend connection successfully') // x8WIv7-mJelg7on_ALbx
})

socket.on('disconnect', () => {
  console.log('frontend connection disconnect') // undefined
})