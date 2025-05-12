import { io } from 'socket.io-client';

// Make sure the URL matches your backend server
const socket = io('http://localhost:8000');

export default socket;
