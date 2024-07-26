import type { Message } from "discord.js"
import { distubeInstance } from "../index.js"

export default async (args: string[], msg: Message) => {
  if (!msg.guildId) {
    return msg.channel.send("Not in a discord channel!")
  }

  const botQueue = distubeInstance.getQueue(msg.guildId)

  if (!botQueue) {
    return
  }

  const sentString = botQueue.songs
    .map((value, index) => {
      return `${index + 1}: ${value}`
    })
    .join("\n")

  return msg.channel.send(sentString)
}
