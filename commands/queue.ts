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

  let page: number = args[0] ? parseInt(args[0]) : 0

  let numPages = Math.floor(botQueue.songs.length / 10)

  let sentString = `page ${page} of ${numPages}\n\n`

  if (!botQueue) {
    return msg.channel.send("No songs in queue")
  }

  for (let i = page * 10; i < page * 10 + 11; i++) {
    if (i >= botQueue.songs.length || i == page * 10 + 10) {
      break
    }
    if (i === 0) {
      sentString += `now playing: ${botQueue.songs[i]}\n`
      continue
    }
    sentString += `${i}: ${botQueue.songs[i]}\n`
  }

  return msg.channel.send(sentString)
}
