// import express from 'express'
// const {Client, IntentsBitField} = require('discord.js')
import {Client, IntentsBitField} from 'discord.js'
import {DisTube} from 'distube'
import {joinVoiceChannel} from 'discord.js/src/client/voice'
import {exec} from 'child_process'
import dotenv from 'dotenv'
import { join } from 'path'
dotenv.config()

const token = process.env.DISCORD_TOKEN;
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds , 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent
    ]
})

client.DisTube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false
})

client.on('ready', function(client) {
    console.log(`${client.user.tag} is ready`)
})

client.login(token);