import type { GuildTextBasedChannel, Message } from "discord.js"
import { ActivityType } from "discord.js"
import { DisTubeEvents, Events } from "distube"
import { client, distubeInstance } from "../index"

export default async (args: string[], msg: Message) => {
  if (!msg.guildId) {
    return msg.channel.send("Not in a discord channel!")
  }

  const queue = distubeInstance.getQueue(msg.guildId)

  if (!queue || !queue.songs.length) {
    return
  }

  try {
    await distubeInstance.resume(msg.guildId)
  } catch (error) {
    console.error(error)
    console.log("Error running the resume command.")
  }
}
