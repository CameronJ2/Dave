import type { Message } from "discord.js"
import { distubeInstance } from "../index.js"

export default async (args: string[], msg: Message) => {
  if (!msg.guildId) {
    return msg.channel.send("Not in a discord channel!")
  }
  try {
    await distubeInstance.stop(msg.guildId)
  } catch (error) {
    console.error(error)
    console.log("Error running the stop command")
  }
}
