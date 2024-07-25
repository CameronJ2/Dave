import { Client, IntentsBitField } from "discord.js"
import dotenv from "dotenv"
import { DisTube, Events, Queue } from "distube"
import { YtDlpPlugin } from "@distube/yt-dlp"
import { YouTubePlugin } from "@distube/youtube"
import { runCommand } from "./commands/index"
dotenv.config()

const token: string | undefined = process.env.DISCORD_TOKEN
const client: Client = new Client({
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

distubeInstance.on(Events.ADD_SONG, function (queue, song) {
  queue.textChannel?.send(`Added song to queue: ${song.name} - ${song.url}`)
})

client.login(token)
