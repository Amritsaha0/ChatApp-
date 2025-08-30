import { WebSocketServer } from 'ws';
import express from 'express';
const app = express();
app.use(express.json());
app.listen(3000);
let userCount = 0;
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (socket) => {
    console.log('New User connected');
    userCount++;
    console.log(`Total users: ${userCount}`);
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        socket.send(`You said: ${message}`);
    });
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
console.log('WebSocket server is running on ws://localhost:8080');
//# sourceMappingURL=index.js.map