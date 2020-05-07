require('dotenv').config()
const PORT = process.env.PORT || 3000;

const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log(`New SocketIO connection: ${socket.id}`)
})

server.listen(PORT, () => {
    console.log(`Server is now listening to port ${PORT}`)
})