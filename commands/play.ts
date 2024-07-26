import type { GuildTextBasedChannel, Message } from "discord.js"
import { distubeInstance } from "../index.js"

export default async (args: string[], msg: Message) => {
  const query = args.join(" ")
  const voiceChannel = msg.member?.voice.channel

  if (!voiceChannel) {
    return msg.channel.send("You need to be in a voice channel to play music!")
  }

  try {
    await distubeInstance.play(voiceChannel, query, {
      member: msg.member,
      textChannel: msg.channel as GuildTextBasedChannel,
      message: msg,
    })
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to run distube.play()")
  }
}
