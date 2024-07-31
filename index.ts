import { YouTubePlugin } from "@distube/youtube"
import { YtDlpPlugin } from "@distube/yt-dlp"
import { Client, IntentsBitField, ActivityType } from "discord.js"
import { DisTube, Events, Queue } from "distube"
import dotenv from "dotenv"
import { runCommand } from "./commands/index"
import { play, replay } from "./commands/play"
import { wait } from "./utils"
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

const ytPlugin = new YouTubePlugin()

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

distubeInstance.on(Events.ERROR, async (error, queue, song) => {
  console.error("Error caught!", error.name)

  if (error.name === "DisTubeError [FFMPEG_EXITED]") {
    if (song) {
      // await wait(1000)

      try {
        // if (queue.stopped) {
        //   console.log("Queue is stopped!")
        // }
        // queue.addToQueue(song, 1)
        replay()
      } catch (err) {
        console.error("Caught error adding to queue", err)
        // addToErrorCounter()
      }
    }
  }
})

// distubeInstance.on(Events.)

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
