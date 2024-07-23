import { distubeInstance } from "../index.js"

export default async (args, msg) => {
  const songName = distubeInstance.getQueue(msg.guild).songs[0].name
  await distubeInstance.skip(msg.guildId)
  await msg.channel.send(`Skipped ${songName}`)
}
