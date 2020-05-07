const users = []

// Join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room }

    users.push(user)

    return user
}

function userLeave(id) {

    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        const removed = users.splice(index, 1)
        return removed.length > 0 ? removed[0] : null
    }
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    userLeave,
    getCurrentUser,
    getRoomUsers
}