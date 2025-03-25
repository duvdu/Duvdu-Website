import { io } from "socket.io-client";

const socketUrl = process.env.BASE_URL;

const socket = io(socketUrl, {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket; 