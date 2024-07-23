import { COMMAND_PREFIX } from "../constants.js"
import play from "./play.js"
import skip from "./skip.js"

const commands = {
  play,
  queue,
  rm,
  skip,
}

const isValidCommand = (name) => {
  return !!commands[name]
}

export const runCommand = async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(COMMAND_PREFIX)) return

  const [command, ...args] = msg.content
    .slice(COMMAND_PREFIX.length)
    .trim()
    .split(/ +/g)

  if (!isValidCommand(command)) {
    return msg.channel.send("Invalid command")
  }

  try {
    const commandHandler = commands[command]
    await commandHandler(args, msg)
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to run the command.")
  }
}
