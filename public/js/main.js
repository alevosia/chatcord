const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

window.addEventListener('load', () => {
    const chatField = document.getElementById('msg')
    chatField.focus()
})

const { username, room } = getQuery()

const socket = io()

socket.emit('joinRoom', { username, room })

// event listeners
socket.on('message', (message) => {
    outputMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

socket.on('invite', (text) => {
    socket.emit('invited', { username, room }, text)
})

socket.on('roomUsers', ({ room, users }) => {
    roomName.innerText = room
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
})

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Get message text
    const text = event.target.elements.msg.value

    // Emit message to server
    socket.emit('chatMessage', text)

    // Clear input
    event.target.elements.msg.value = ''
    event.target.elements.msg.focus()
})

// get the username and room from url
function getQuery() {
    const search = decodeURI(location.search)

    if (!search || search.length === 0) {
        return null
    }

    const query = search.replace('?', '').replace(/\+/g, ' ').trim().split('&')

    return query.reduce((prev, curr) => {
        const [name, value] = curr.split('=')
        prev[name] = value
        return prev
    }, {})
}

// Render the message into the DOM
function outputMessage(message) {
    const div = document.createElement('div')

    div.classList.add('message')
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
    `;

    document.querySelector('.chat-messages').appendChild(div)
}