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

// Run when a client connects
io.on('connection', (socket) => {
    console.log(`New SocketIO connection: ${socket.id}`)

    // Welcome newly connected user
    socket.emit('message', 'Welcome to Chatcord!')

    // Broadcast to others when a user connect
    socket.broadcast.emit('message', 'A user has joined the chat')

    // Listen for chat message
    socket.on('chatMessage', (message) => {
        io.emit('message', message)
    })

    // Run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})

server.listen(PORT, () => {
    console.log(`Server is now listening to port ${PORT}`)
})