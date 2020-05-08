const moment = require('moment')
const momentTimezone = require('moment-timezone')

const timezone = 'Asia/Manila'
const format = 'MMMM DD YYYY h:mm:ss a'

const getCurrentDate = (customFormat = format) => momentTimezone().tz(timezone).format(customFormat)
const getTimeElapsed =  (pastDate) => {
    console.log(pastDate)

    const past = momentTimezone(pastDate, format).tz(timezone, true)
    console.log(past)

    const now = moment()
    console.log(now)

    const elapsed = past.from(now)
    console.log(elapsed)

    return elapsed
}

module.exports = {
    format,
    timezone,
    getCurrentDate,
    getTimeElapsed
}
