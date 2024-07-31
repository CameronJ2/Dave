import type { GuildTextBasedChannel, Message } from "discord.js"
import { ActivityType } from "discord.js"
import { DisTubeEvents, Events } from "distube"
import { client, distubeInstance } from "../index.js"

export const play = async (args: string[], msg: Message): Promise<unknown> => {
  const query = args.join(" ")
  const voiceChannel = msg.member?.voice.channel

  if (!voiceChannel) {
    return msg.channel.send("You need to be in a voice channel to play music!")
  }

  try {
    console.log("Running play command...", ...args)
    await distubeInstance.play(voiceChannel, query, {
      member: msg.member,
      textChannel: msg.channel as GuildTextBasedChannel,
      message: msg,
    })

    // Get the last queued song
    if (!msg.guildId) {
      throw new Error("No guild id, cant send feedback")
    }

    const queue = distubeInstance.getQueue(msg.guildId)

    console.log({ songs: queue?.songs?.length })

    if (!queue) {
      throw new Error("No queue, cant send feedback")
    }

    const lastSongInQueue = queue.songs[queue.songs.length - 1]

    msg.channel.send(
      `Added song to queue: ${lastSongInQueue.name} - ${lastSongInQueue.url}`
    )
  } catch (error) {
    console.error({ error, message: error.message })
    msg.channel.send("An error occurred while trying to run distube.play()")
  }

  return msg
}
