const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! 🔥')
});


io.on('connection', socket => {
    console.log("Someone have connected 🔥");
    socket.on('join-room', ({roomId, userName}) => {
        console.log("User joined the room");
        console.log(roomId);
        console.log(userName);
    });
})

app.listen(port, () => {
    console.log(`App at http://localhost:${port} 🚀`)
})
