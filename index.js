const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const roomId = 10;
const userName = 'Rokas';

app.get('/', (req, res) => {
    res.send('Hello World! 🔥')
});


io.on('connection', (socket) => {
    console.log("Someone have connected 🔥");
    socket.on('join-room', () => {
        console.log("User joined the room");
        console.log(roomId);
        console.log(userName);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
