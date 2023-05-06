// Import the tmi.js and chalk libraries
import tmi from 'tmi.js'
// https://tmijs.com/ - twitch chat api (javascript version)
import chalk from 'chalk'
// https://www.npmjs.com/package/chalk - adds color to your console text

// read this https://dev.twitch.tv/docs/authentication/register-app/
// Twitch account and channel configuration
const USERNAME = ''
const OAUTH = ''
// change this to CHANNEL to anything you want but this is an example of a fast chat xqcL
const CHANNEL = 'xqc'

// counting time is the interval messages are sent in milliseconds
// so, 20 * 1000ms = 20s basically
const countingTime = 20 * 1000
// lowering this from 20 seconds risks bans or warnings of sending messages too quickly
// using this bot in a slow-moving chat will make you look like a spambot so don't do that


// create a map function to hold message history
const messagesHistory = new Map()

// Create a new tmi.js client instance with the specified configuration
const client = new tmi.Client({
  identity: { username: USERNAME, password: OAUTH },
  channels: [CHANNEL],
})

// Connect the client to the Twitch chat
client.connect()

// Log a message indicating the successful connection
console.log(`Connected to ${CHANNEL}'s Twitch chat`)

// Set up an event listener for incoming messages in the Twitch chat
client.on('message', (CHANNEL, tags, message) => {
  if (tags['display-name']==='Melogrunty') {
    console.log(chalk.greenBright(`[${CHANNEL}] ${tags['display-name']}: ${message}`))
  } else {
    console.log(`[${CHANNEL}] ${tags['display-name']}: ${message}`)
  }
  // Increment the message count in the messagesHistory map
  if (messagesHistory.has(message)) {
    messagesHistory.set(message, messagesHistory.get(message) + 1)
  } else {
    messagesHistory.set(message, 1)
  }

  // Set a timer to decrement the message count after the specified time interval (20 seconds)
  setTimeout(() => {
    const count = messagesHistory.get(message)
    if (count && count > 1) {
      messagesHistory.set(message, count - 1)
    } else {
      messagesHistory.delete(message)
    }
  }, countingTime)
})

// initialize the popular string and maxCount
// not initializing will leave it undefined and not able to determine most popular message
setInterval(() => {
  let mostPopularString = ''
  let maxCount = 0

  // iterate through the messagesHistory map to find the most popular string
  messagesHistory.forEach((count, message) => {
    // update the most popular string and its count if the current message has a higher count
    if (count > maxCount) {
      maxCount = count
      mostPopularString = message
    }
  })

  // If a most popular say it in Twitch chat
  if (mostPopularString) {
    client.say(CHANNEL, mostPopularString)
  }
}, countingTime)
