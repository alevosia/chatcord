const moment = require('moment')
const momentTimezone = require('moment-timezone')

const timezone = 'Asia/Manila'
const format = 'MMMM DD YYYY h:mm:ss a'

const getCurrentDate = (customFormat = format) => momentTimezone().tz(timezone).format(customFormat)
const getTimeElapsed =  (pastDate) => momentTimezone(pastDate, format).tz(timezone).fromNow(true)

module.exports = {
    format,
    timezone,
    getCurrentDate,
    getTimeElapsed
}
