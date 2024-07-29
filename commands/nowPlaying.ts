import type { Message } from "discord.js"
import { distubeInstance } from "../index.js"

export default async (args: string[], msg: Message) => {
  if (!msg.guildId) {
    return msg.channel.send("Not in a discord channel!")
  }

  const botQueue = distubeInstance.getQueue(msg.guildId)

  if (!botQueue) {
    return msg.channel.send("No song playing or queued!")
  }

  return msg.channel.send(`now playing: ${botQueue.songs[0]}`)

  //   return msg.channel.send(sentString)
}
