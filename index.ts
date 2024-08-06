import { YouTubePlugin } from "@distube/youtube"
import { YtDlpPlugin } from "@distube/yt-dlp"
import type { GuildTextBasedChannel, Message } from "discord.js"
import { ActivityType, Client, IntentsBitField } from "discord.js"
import { DisTube, Events, Queue } from "distube"
import dotenv from "dotenv"
import { runCommand } from "./commands/index"
import { play } from "./commands/play"
import { wait } from "./utils"
import fs from "fs"
dotenv.config()

const token: string | undefined = process.env.DISCORD_TOKEN
export const client: Client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
})

const testCookie = new YouTubePlugin()
const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf8"))

export const distubeInstance = new DisTube(client, {
  plugins: [new YouTubePlugin({ cookies }), new YtDlpPlugin()],
})

distubeInstance.removeListener(Events.ERROR, () => {})

client.on("ready", (client) => {
  console.log(`${client.user.tag} is ready`)
})

client.on("messageCreate", (msg) => {
  runCommand(msg)
})

// distubeInstance.on(Events.ADD_SONG, (queue, song) => {
//   queue.textChannel?.send(`Added song to queue: ${song.name} - ${song.url}`)
// })

distubeInstance.on(Events.FINISH_SONG, (queue, song) => {
  client.user?.setActivity({
    name: `: ${queue.songs[0].name ? queue.songs[0].name : ""}`,
    state: "x:xx out of x:xx",
    type: ActivityType.Listening,
  })
})

distubeInstance.on(Events.PLAY_SONG, (queue, song) => {
  client.user?.setActivity({
    name: `: ${queue.songs[0].name ? queue.songs[0].name : ""}`,
    state: "x:xx out of x:xx",
    type: ActivityType.Listening,
  })
})

distubeInstance.on(Events.FINISH, (queue) => {
  client.user?.setActivity({
    name: "",
  })
})

distubeInstance.on(Events.DELETE_QUEUE, (queue) => {
  client.user?.setActivity({
    name: "",
  })
})

distubeInstance.on(Events.NO_RELATED, (queue) => {
  client.user?.setActivity({
    name: "",
  })
})

client.login(token)

client.on("ready", () => {
  client.user?.setActivity({
    name: "",
  })
})

console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
console.log("**************************")
