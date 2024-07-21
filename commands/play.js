import { distube } from "../index.js"

export default async (args, msg) => {
  const query = args.join(" ")
  const voiceChannel = msg.member.voice.channel

  if (!voiceChannel) {
    return msg.channel.send("You need to be in a voice channel to play music!")
  }

  try {
    await distube.play(voiceChannel, query, {
      member: msg.member,
      textChannel: msg.channel,
      message: msg,
    })
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to play the song.")
  }
}
