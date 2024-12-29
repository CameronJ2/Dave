// Simple command for queueing a few songs at once so we don't have to manually type it each time.

import type { GuildTextBasedChannel, Message } from "discord.js"
import { distubeInstance } from "../index"
import { wait } from "../utils"
import { play } from "./play"
import stop from "./stop"

export default async (args: string[], msg: Message) => {
  // await stop(args, msg)
  // await wait(1000)

  const waitTime = 500

  const numLoops = args[0] ? parseInt(args[0]) : 1

  for (let i = 1; i <= numLoops; i++) {
    await play(["https://www.youtube.com/watch?v=T6eK-2OQtew"], msg)
    await wait(waitTime)
    await play(["https://www.youtube.com/watch?v=4QIZE708gJ4"], msg)
    await wait(waitTime)
    await play(["https://www.youtube.com/watch?v=RoeXmaSE7Lo"], msg)
  }

  // const voiceChannel = msg.member?.voice.channel

  // play(song1, msg)
  // setTimeout(() => {
  //   play(song2, msg)
  // }, 1000)
  // setTimeout(() => {
  //   play(song3, msg)
  // }, 2000)
}
