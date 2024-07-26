import type { Message } from "discord.js"
import { distubeInstance } from "../index"
import skip from "./skip"

export default async (args: string[], msg: Message) => {
  if (!msg.guildId) {
    return msg.channel.send("Not in a discord channel!")
  }

  const botQueue = distubeInstance.getQueue(msg.guildId)

  if (!botQueue) {
    return msg.channel.send("No songs in the queue to remove!")
  }

  const indexToRemove = Number.parseInt(args[0], 10) - 1

  if (indexToRemove === 0) {
    console.log("if statement worked.")
    return skip(args, msg)
  }

  try {
    botQueue.songs = [
      ...botQueue.songs.slice(0, indexToRemove),
      ...botQueue.songs.slice(indexToRemove + 1),
    ]
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to remove the song")
  }
}
