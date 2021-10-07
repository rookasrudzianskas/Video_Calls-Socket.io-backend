const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! 🔥')
})

app.listen(port, () => {
    console.log(`App at http://localhost:${port} 🚀`)
})
