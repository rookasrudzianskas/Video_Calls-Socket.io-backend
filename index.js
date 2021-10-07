const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Hello World! 🔥')
});


io.on('connection', (socket) => {
    console.log("Someone have connected 🔥");
    socket.on('join-room', () => {
        const roomId = 10;
        const userName = 'Rokas';
        console.log("User joined the room");
        console.log(roomId);
        console.log(userName);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
