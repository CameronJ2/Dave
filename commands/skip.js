import { distubeInstance } from "../index.js"

export default async (args, msg) => {
  await distubeInstance.skip(msg.guildId)
}
