// Simple command for queueing a few songs at once so we don't have to manually type it each time.

import type { GuildTextBasedChannel, Message } from "discord.js"
import { distubeInstance } from "../index"
import { wait } from "../utils"
import { play } from "./play"
import stop from "./stop"

export default async (args: string[], msg: Message) => {
  await stop(args, msg)
  await wait(1000)
  const voiceChannel = msg.member?.voice.channel
  const song1: string[] = ["https://www.youtube.com/watch?v=T6eK-2OQtew"]
  const song2: string[] = ["https://www.youtube.com/watch?v=4QIZE708gJ4"]
  const song3: string[] = ["https://www.youtube.com/watch?v=RoeXmaSE7Lo"]
  const song4: string[] = ["https://www.youtube.com/watch?v=T6eK-2OQtew"]
  const song5: string[] = ["https://www.youtube.com/watch?v=4QIZE708gJ4"]
  const song6: string[] = ["https://www.youtube.com/watch?v=RoeXmaSE7Lo"]
  const song7: string[] = ["https://www.youtube.com/watch?v=T6eK-2OQtew"]
  const song8: string[] = ["https://www.youtube.com/watch?v=4QIZE708gJ4"]
  const song9: string[] = ["https://www.youtube.com/watch?v=RoeXmaSE7Lo"]
  const song10: string[] = ["https://www.youtube.com/watch?v=T6eK-2OQtew"]
  const song11: string[] = ["https://www.youtube.com/watch?v=4QIZE708gJ4"]
  const song12: string[] = ["https://www.youtube.com/watch?v=RoeXmaSE7Lo"]
  const song13: string[] = ["https://www.youtube.com/watch?v=T6eK-2OQtew"]
  const song14: string[] = ["https://www.youtube.com/watch?v=4QIZE708gJ4"]
  const song15: string[] = ["https://www.youtube.com/watch?v=RoeXmaSE7Lo"]

  await play(song1, msg)
  await wait(1000)
  await play(song2, msg)
  await wait(1000)
  await play(song3, msg)
  await wait(1000)
  await play(song4, msg)
  await wait(1000)
  await play(song5, msg)
  await wait(1000)
  await play(song6, msg)
  await wait(1000)
  await play(song7, msg)
  await wait(1000)
  await play(song8, msg)
  await wait(1000)
  await play(song9, msg)
  await wait(1000)
  await play(song10, msg)
  await wait(1000)
  await play(song11, msg)
  await wait(1000)
  await play(song12, msg)
  await wait(1000)
  await play(song13, msg)
  await wait(1000)
  await play(song14, msg)
  await wait(1000)
  await play(song15, msg)
  await wait(1000)

  // play(song1, msg)
  // setTimeout(() => {
  //   play(song2, msg)
  // }, 1000)
  // setTimeout(() => {
  //   play(song3, msg)
  // }, 2000)
}
