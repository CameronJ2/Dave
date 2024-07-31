import type { GuildTextBasedChannel, Message } from "discord.js"
import { DisTubeEvents, Events } from "distube"
import { distubeInstance, client } from "../index.js"
import { ActivityType } from "discord.js"

// const errorListenerFactory = (args: string[], msg: Message, retries = 0) => {
//   return async (error: Error) => {
//     if (retries >= 3) {
//       console.error("Too many retries!")
//       return
//     }

//     console.log("In error event listener:\n")
//     console.error({ name: error.name, message: error.message })

//     if (error.name !== "DisTubeError [FFMPEG_EXITED]") {
//       return
//     }

//     console.error("FFMPEG error caught")
//     await play(args, msg, retries + 1)
//   }
// }

let LASTMESSAGE: Message<boolean>
let LASTQUERY: string

export const play = async (args: string[], msg: Message) => {
  LASTMESSAGE = msg
  const query = args.join(" ")
  LASTQUERY = query
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
    console.error(error)
    msg.channel.send("An error occurred while trying to run distube.play()")
  }

  return msg
}

export const replay = async () => {
  const msg = LASTMESSAGE
  const query = LASTQUERY
  const voiceChannel = msg.member?.voice.channel
  if (!voiceChannel) {
    return msg.channel.send("You need to be in a voice channel to play music!")
  }
  await distubeInstance.play(voiceChannel, query, {
    member: msg.member,
    textChannel: msg.channel as GuildTextBasedChannel,
    message: msg,
  })
}

// export default play
