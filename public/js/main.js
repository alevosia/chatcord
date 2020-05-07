const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io()

socket.on('message', (message) => {
    outputMessage(message)

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // Get message text
    const message = event.target.elements.msg.value

    // Emit message to server
    socket.emit('chatMessage', message)

    // Clear input
    event.target.elements.msg.value = ''
    event.target.elements.msg.focus()
})

// Render the message into the DOM
function outputMessage(message) {
    const div = document.createElement('div')

    div.classList.add('message')
    div.innerHTML = `
    <p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
      ${message}
    </p>
    `;

    document.querySelector('.chat-messages').appendChild(div)
}