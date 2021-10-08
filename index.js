const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const roomId = 10;
const userName = 'Rokas';

let users = [];

const addUser = (userName, roomId) => {
    users.push({
        userName: userName,
        roomId: roomId,
    })
}

const getRoomUsers = (roomId) => {
    return users.filter(user => (user.roomId === roomId));
}

const userLeave = (userName) => {
    users = users.filter(user => user.userName !== userName);
}


app.get('/', (req, res) => {
    res.send('Hello World! 🔥')
});


io.on('connection', (socket) => {
    console.log("Someone have connected 🔥");
    socket.on('join-room', ({}) => {
        console.log("User joined the room");
        console.log(roomId);
        console.log(userName);
        if(roomId && userName) {
            socket.join(roomId);
            addUser(userName, roomId);
            socket.to(roomId).emit("user-connected", userName);

            io.to(roomId).emit('all-users', getRoomUsers(roomId));
        }

        socket.on("disconnect", () => {
            console.log("disconnected");
            socket.leave(roomId);
            userLeave(userName);
            io.to(roomId).emit('all-users', getRoomUsers(roomId));
        })
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

// done
