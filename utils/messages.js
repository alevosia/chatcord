// const { getCurrentDate } = require('./moment');
const { getCurrentDate } = require('./moment')

exports.formatMessage = (username, text) => {
    return {
        username,
        text,
        time: getCurrentDate('h:mm a')
    }
}