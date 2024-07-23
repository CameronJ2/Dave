import { distubeInstance } from "../index.js"

export default async (args, msg) => {
  const botQueue = distubeInstance.getQueue(msg.guildId)
  const indexToRemove = args[0]
  // console.log(botQueue.songs)
  console.log(
    botQueue.songs.map((value) => {
      return value.name
    })
  )
  try {
    botQueue.songs = [
      ...botQueue.songs.slice(0, indexToRemove),
      ...botQueue.songs.slice(indexToRemove + 1),
    ]
    console.log(
      botQueue.songs.map((value) => {
        return value.name
      })
    )
  } catch (error) {
    console.error(error)
    msg.channel.send("An error occurred while trying to remove the song")
  }
}

// let family = ["oneItem", "twoItem"]
// let friends = ["dreams", "mark", "lazy"]
// console.log(friends.slice(1))

// let both = [...friends.slice(0, 1), ...friends.slice(2)]

// console.log(both)
