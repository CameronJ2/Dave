import type { GuildTextBasedChannel, Message } from "discord.js"
import { distubeInstance } from "../index.js"
import { DisTubeEvents, Events } from "distube"

const play = async (args: string[], msg: Message, retries: number = 0) => {
  const query = args.join(" ")
  const voiceChannel = msg.member?.voice.channel

  if (!voiceChannel) {
    return msg.channel.send("You need to be in a voice channel to play music!")
  }

  const errorListener = (error: Error) => {
    if (retries >= 3) {
      console.error("Too many retries!")
      return
    }

    console.log("In error event listener:\n")
    console.error({ name: error.name, message: error.message })

    if (error.name === "DisTubeError [FFMPEG_EXITED]") {
      console.error("FFMPEG error caught")
      play(args, msg, retries + 1)
    }
  }

  distubeInstance.addListener(Events.ERROR, errorListener)

  try {
    console.log("Running play command...")
    await distubeInstance.play(voiceChannel, query, {
      member: msg.member,
      textChannel: msg.channel as GuildTextBasedChannel,
      message: msg,
    })
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to run distube.play()")
  } finally {
    distubeInstance.removeListener(Events.ERROR, errorListener)
  }
}

export default play
