import type { Message } from "discord.js"
import { COMMAND_PREFIX } from "../constants"
import dev from "./dev"
import np from "./nowPlaying"
import { play } from "./play"
import queue from "./queue"
import remove from "./remove"
import skip from "./skip"
import stop from "./stop"
import pause from "./pause"
import resume from "./resume"

const commands: {
  [key: string]: (args: string[], msg: Message) => Promise<unknown>
} = {
  play,
  p: play,
  queue,
  q: queue,
  remove,
  rm: remove,
  skip,
  sk: skip,
  stop,
  st: stop,
  clear: stop,
  c: stop,
  np,
  dev,
  pause,
  resume,
}

type COMMAND = keyof typeof commands

const isValidCommand = (name: string) => {
  return name in commands
}

export const runCommand = async (msg: Message<boolean>) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(COMMAND_PREFIX)) return

  const [command, ...args] = msg.content
    .slice(COMMAND_PREFIX.length)
    .trim()
    .split(/ +/g)

  const lowercasedCommand = command.toLowerCase()

  if (!isValidCommand(lowercasedCommand)) {
    return msg.channel.send("Invalid command")
  }

  try {
    const commandHandler = commands[lowercasedCommand as COMMAND]
    await commandHandler(args, msg)
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to run the command.")
  }
}
