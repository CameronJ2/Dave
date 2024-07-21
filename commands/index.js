import { COMMAND_PREFIX } from "../constants.js"
import play from "./play.js"

const commands = {
  play,
}

const isValidCommand = (name) => {
  return !!commands[name]
}

export const runCommand = async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(COMMAND_PREFIX)) return

  const [commandWithPrefix, ...args] = msg.content
    .slice(COMMAND_PREFIX.length)
    .trim()
    .split(/ +/g)

  const command = commandWithPrefix.toLowerCase().replace(COMMAND_PREFIX, "")

  if (!isValidCommand(command)) {
    return msg.channel.send("Invalid command")
  }

  try {
    await commands[command](args, msg)
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to run the command.")
  }
}
