// Simple command for queueing a few songs at once so we don't have to manually type it each time.

import type { GuildTextBasedChannel, Message } from "discord.js"
import { distubeInstance } from "../index"
import { wait } from "../utils"
import play from "./play"
import stop from "./stop"

export default async (args: string[], msg: Message) => {
  await stop(args, msg)
  await wait(1000)
  const voiceChannel = msg.member?.voice.channel
  const song1: string[] = ["https://www.youtube.com/watch?v=T6eK-2OQtew"]
  const song2: string[] = ["https://www.youtube.com/watch?v=4QIZE708gJ4"]
  const song3: string[] = ["https://www.youtube.com/watch?v=RoeXmaSE7Lo"]

  await play(song1, msg)
  await wait(1000)
  await play(song2, msg)
  await wait(1000)
  await play(song3, msg)

  // play(song1, msg)
  // setTimeout(() => {
  //   play(song2, msg)
  // }, 1000)
  // setTimeout(() => {
  //   play(song3, msg)
  // }, 2000)
}
