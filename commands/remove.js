import { distubeInstance } from "../index.js"
import skip from "./skip.js"
export default async (args, msg) => {
  const botQueue = distubeInstance.getQueue(msg.guildId)
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
