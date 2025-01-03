import type { Message } from "discord.js"
import { distubeInstance } from "../index.js"

export default async (args: string[], msg: Message) => {
  if (!msg.guildId) {
    return msg.channel.send("Not in a discord channel!")
  }

  const botQueue = distubeInstance.getQueue(msg.guildId)

  if (!botQueue) {
    return msg.channel.send("No songs in queue!")
  }

  if (!botQueue.songs[1]) {
    await distubeInstance.stop(msg.guildId)
    return
  }

  await distubeInstance.skip(msg.guildId)
}
