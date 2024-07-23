import { distubeInstance } from "../index.js"

export default async (args, msg) => {
  const botQueue = distubeInstance.getQueue(msg.guildId)
  if (botQueue !== undefined) {
    let sentString = botQueue.songs.join("\n")
    msg.channel.send(sentString)
  }
}

// if (args[0] === "queue") {
//   const botQueue = distube.getQueue(msg.guildId)
//   if (botQueue !== undefined) {
//     let sentString = botQueue.songs.join("\n")
//     msg.channel.send(sentString)
//   }
