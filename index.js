import { Client, IntentsBitField } from "discord.js"
import dotenv from "dotenv"
import { DisTube } from "distube"
import { YtDlpPlugin } from "@distube/yt-dlp"
import { YouTubePlugin } from "@distube/youtube"
import { runCommand } from "./commands/index.js"
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

export const distubeInstance = new DisTube(client, {
  plugins: [new YouTubePlugin(), new YtDlpPlugin()],
})

client.on("ready", function (client) {
  console.log(`${client.user.tag} is ready`)
})

client.on("messageCreate", function (msg) {
  runCommand(msg)
})

// distubeInstance.on("playSong", function (queue, song) {
//   queue.textChannel.send(`Now playing: ${song.name} - ${song.url}`)
// })

distubeInstance.on("addSong", function (queue, song) {
  queue.textChannel.send(`Added song to queue: ${song.name} - ${song.url}`)
})

client.login(token)
