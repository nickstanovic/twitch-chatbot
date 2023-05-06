import tmi from 'tmi.js'
import chalk from 'chalk'


const USERNAME = ''
const OAUTH = ''
const CHANNEL = 'xqc'

const messagesHistory = new Map()
const countingTime = 20 * 1000

const client = new tmi.Client({
  identity: { username: USERNAME, password: OAUTH },
  channels: [CHANNEL],
})

client.connect()

console.log(`Connected to ${CHANNEL}'s Twitch chat`)
client.on('message', (CHANNEL, tags, message) => {
  if (tags['display-name']==='Melogrunty') {
    console.log(chalk.greenBright(`[${CHANNEL}] ${tags['display-name']}: ${message}`))
  } else {
    console.log(`[${CHANNEL}] ${tags['display-name']}: ${message}`)
  }
  if (messagesHistory.has(message)) {
    messagesHistory.set(message, messagesHistory.get(message) + 1)
  } else {
    messagesHistory.set(message, 1)
  }

  setTimeout(() => {
    const count = messagesHistory.get(message)
    if (count && count > 1) {
      messagesHistory.set(message, count - 1)
    } else {
      messagesHistory.delete(message)
    }
  }, countingTime)
})

setInterval(() => {
  let mostPopularString = ''
  let maxCount = 0

  messagesHistory.forEach((count, message) => {
    if (count > maxCount) {
      maxCount = count
      mostPopularString = message
    }
  })

  if (mostPopularString) {
    client.say(CHANNEL, mostPopularString)
  }
}, countingTime)