import { YouTubePlugin } from "@distube/youtube"
import { YtDlpPlugin } from "@distube/yt-dlp"
import { Client, IntentsBitField } from "discord.js"
import { DisTube, Events, Queue } from "distube"
import dotenv from "dotenv"
import { runCommand } from "./commands/index"
import play from "./commands/play"
import { wait } from "./utils"
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

distubeInstance.removeListener(Events.ERROR, () => {})

// distubeInstance.setMaxListeners(4)

client.on("ready", (client) => {
  console.log(`${client.user.tag} is ready`)
})

client.on("messageCreate", (msg) => {
  runCommand(msg)
})

// distubeInstance.on(Events.ADD_SONG, (queue, song) => {
//   queue.textChannel?.send(`Added song to queue: ${song.name} - ${song.url}`)
// })

let errorCounter = 0

const addToErrorCounter = () => {
  errorCounter += 1

  if (errorCounter > 10) {
    throw new Error("SO MANY ERRORS, ABORTING")
  }

  setTimeout(() => {
    errorCounter -= 1
  }, 5000)
}

distubeInstance.on(Events.ERROR, async (error, queue, song) => {
  console.error("Error caught!", error.name)

  if (error.name === "DisTubeError [FFMPEG_EXITED]") {
    if (song) {
      await wait(1000)

      try {
        queue.addToQueue(song)
      } catch (err) {
        console.error("Caught error adding to queue")
        addToErrorCounter()
      }
    }
  }
})

client.login(token)

client.on("ready", () => {
  client.user?.setStatus
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
