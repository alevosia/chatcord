const { getCurrentDate, getTimeElapsed } = require('./moment');

const users = []

function userJoin(id, username, room) {
    const user = { 
        id, 
        username, 
        room,
        joinedAt: getCurrentDate()
    }

    users.push(user)
    console.log(`+ ${user.joinedAt} - ${user.username} joined ${user.room}`)

    return user
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        const removed = users.splice(index, 1)

        if (removed.length > 0) {
            const user = removed[0]
            
            const leftAt = getCurrentDate()
            const duration = getTimeElapsed(user.joinedAt)
            console.log(`~ ${leftAt} - ${user.username} left ${user.room} [${duration}]`)

            return user
        }
    }
}

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