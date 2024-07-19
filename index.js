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
  const filePath = "./Eminem - Superman (Explicit) [_iawpJn5Xdo].webm"
  if (!msg.content.startsWith("?")) return

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
