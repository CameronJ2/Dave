import { Client, IntentsBitField } from "discord.js"
import dotenv from "dotenv"
import { DisTube } from "distube"
import { YtDlpPlugin } from "@distube/yt-dlp"
import { YouTubePlugin } from "@distube/youtube"
dotenv.config()

const token = process.env.DISCORD_TOKEN
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
})

const distubeOptions = {
  plugins: [new YouTubePlugin(), new YtDlpPlugin()],
}

const distube = new DisTube(client, {
  plugins: [new YouTubePlugin(), new YtDlpPlugin()],
})

client.on("ready", function (client) {
  console.log(`${client.user.tag} is ready`)
})

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith("?")) return

  const prefix = "?"
  const args = msg.content.slice(prefix.length).trim().split(/ +/g)

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
})

distube.on("playSong", (queue, song) => {
  queue.textChannel.send(`Now playing: ${song.name} - ${song.url}`)
})

client.login(token)
