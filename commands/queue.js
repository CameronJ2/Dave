import { distubeInstance } from "../index.js"

// export default async (args, msg) => {
//   const botQueue = distubeInstance.getQueue(msg.guildId)
//   if (botQueue !== undefined) {
//     let sentString = botQueue.songs.join("\n")
//     msg.channel.send(sentString)
//   }
// }

export default async (args, msg) => {
  const botQueue = distubeInstance.getQueue(msg.guildId)
  if (botQueue !== undefined) {
    let sentString = botQueue.songs.map((value, index) => {
      return `${index + 1}: ${value}`
    })
    sentString = sentString.join("\n")
    msg.channel.send(sentString)
  }
}
