# Twitch Chat Popular Message Bot

I originally wrote this because I had difficulty in manually keeping up with the emote-spam trains in xQc's chat during exciting moments xqcL

This Node.js script logs all chat messages in real-time from a specified Twitch channel (edit variables to your liking) and determines the most popular message that others have typed into chat. It then repeats that message back into chat. The script can also highlight a specified chatter's display name in bright green. I highlight my own name so I can see that the bot is working and know what message it sent into the chat.

## Prerequisites

You must have Node.js installed on your computer to run this script. You will also need a Twitch account and an OAuth token for that account with the `chat:read` and `chat:write` scopes. See [Twitch Chat OAuth Password Generator](https://twitchapps.com/tmi/) for generating an OAuth token.

## Installation

1. Clone this repository or download the script file.
2. Open a command prompt or terminal window in the directory where the script file is located.
3. Install the required dependencies by running the following command:

   ```
   npm install
   ```

## Usage

1. Edit the script file to include your Twitch account's username, OAuth token, and the Twitch channel you want to monitor and repeat messages in.
2. Open a command prompt or terminal window in the directory where the script file is located.
3. Run the following command to start the script:

   ```
   node bot.js
   ```

4. The script will log all chat messages in real-time to the console. It will also determine the most popular message that others have typed into chat and repeat that message back into chat.

## Modification

The script can be modified to highlight a specified chatter's display name in bright green instead of the bot owner's name. Simply edit the script file and replace `'Melogrunty'` in the following line with the desired display name:

```
if (tags['display-name']==='Melogrunty') {
  console.log(chalk.greenBright(`[${CHANNEL}] ${tags['display-name']}: ${message}`))
} else {
  console.log(`[${CHANNEL}] ${tags['display-name']}: ${message}`)
}
```

## Summary

This script uses the `tmi.js` library to connect to the Twitch chat API and log all chat messages in real-time. It then uses a map to keep track of the message counts for each unique message, and repeats the most popular message back into chat every 20 seconds.