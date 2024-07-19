// import express from 'express'
// const {Client, IntentsBitField} = require('discord.js')
import { Client, IntentsBitField } from "discord.js"
import { joinVoiceChannel } from "@discordjs/voice"
import { getVoiceConnection } from "@discordjs/voice"
import { exec } from "child_process"
import dotenv from "dotenv"
import { join } from "path"
import { Player, QueryType } from "discord-player"
import { YouTubeExtractor } from "@discord-player/extractor"
dotenv.config()

const token = process.env.DISCORD_TOKEN
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
})

const player = new Player(client)

client.on("ready", function (client) {
  console.log(`${client.user.tag} is ready`)
})

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return
  const prefix = "?"
  const channel = msg.member.voice.channel
  const query = msg.content.slice(prefix.length).trim()

  if (!msg.content.startsWith("?")) return

  await player.extractors.loadDefault()

  try {
    const { track } = await player.play(channel, query, {
      nodeOptions: {
        // nodeOptions are the options for guild node (aka your queue in simple word)
        // metadata: interaction, // we can access this metadata object using queue.metadata later on
      },
    })

    console.log(`**${track.title}** enqueued!`)
  } catch (e) {
    // let's return error if something failed
    console.log(`Something went wrong: ${e}`)
  }

  //   if (msg.content.startsWith("?join")) {
  //     const connection = joinVoiceChannel({
  //       channelId: msg.member.voice.channel.id,
  //       guildId: msg.member.voice.channel.guildId,
  //       adapterCreator: msg.member.voice.channel.guild.voiceAdapterCreator,
  //       selfDeaf: false,
  //     })
  //   }
  //   if (msg.content.startsWith("?leave")) {
  //     const connection = getVoiceConnection(msg.member.voice.channel.guildId)
  //     connection.destroy()
  //   }
  //   if (msg.content.startsWith("?play")) {
  //   }
})

client.login(token)
