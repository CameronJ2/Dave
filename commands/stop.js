import { distubeInstance } from "../index.js"

export default async (args, msg) => {
  try {
    await distubeInstance.stop(msg.guildId)
  } catch (error) {
    console.error(error)
    console.log("Error running the stop command")
  }
}
