require('dotenv').config()
const PORT = process.env.PORT || 3000
const BOT_NAME = process.env.BOT_NAME || 'Bot'

const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

// utils
const { getCurrentUser, getRoomUsers, userJoin, userLeave } = require('./utils/users')
const { formatMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

// Run when a client connects
io.on('connection', (socket) => {

    console.log(`\nNEW CONNECTION: ${socket.id}`)

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)

        console.log('\n--- JOIN ROOM ---')
        console.log(user)

        socket.join(user.room)

        // Welcome newly connected user
        socket.emit('message', formatMessage(BOT_NAME, `Welcome to ${room}, ${username}!`))

        // Broadcast to others when a user connect
        socket.broadcast.to(user.room).emit('message', formatMessage(BOT_NAME, `${username} has joined the chat.`))

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    socket.on('invited', ({ username, room}, text) => {
        const user = userJoin(socket.id, username, room)

        console.log('\n----- INVITED -----')
        console.log(user)

        socket.join(user.room)

        // socket.emit('message', formatMessage(BOT_NAME, `You have reconnected to server.`))
        io.to(user.room).emit('message', formatMessage(user.username, text))
    })
    
    // Listen for chat message
    socket.on('chatMessage', (text) => {
        const user = getCurrentUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', formatMessage(user.username, text))
        } else {
            socket.emit('invite', text)
        }
    })

    // Run when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if (user) {
            io.to(user.room).emit('message', formatMessage(BOT_NAME, `${user.username} has left the chat.`))

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})

server.listen(PORT, () => {
    console.log(`Server is now listening to port ${PORT}`)
})