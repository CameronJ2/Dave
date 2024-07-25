import { distubeInstance } from "../index.js"

export default async (args, msg) => {
  const queue = distubeInstance.getQueue(msg.guild)
  const songName = queue.songs[0].name
  await distubeInstance.skip(msg.guildId)
  await msg.channel.send(`Skipped ${songName}`)
}
