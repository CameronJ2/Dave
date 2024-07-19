// import express from 'express'
// const {Client, IntentsBitField} = require('discord.js')
import { Client, IntentsBitField } from "discord.js"
import { joinVoiceChannel } from "discord.js/src/client/voice"
import { exec } from "child_process"
import dotenv from "dotenv"
import { join } from "path"
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

client.on("ready", function (client) {
  console.log(`${client.user.tag} is ready`)
})

// client.on('messageCreate', (msg) =>{
//     console.log(msg);
//     exec(`yt-dlp -f bestaudio --default-search=auto '"${msg}"'`, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error: ${error.message}`);
//           return;
//         }
//         if (stderr) {
//           console.error(`Stderr: ${stderr}`);
//           return;
//         }
//         console.log(`Output: ${stdout}`);
//       });
// })

client.on("messageCreate"),
  (msg) => {
    const connection = joinVoiceChannel
  }

// client.on('messageCreate', async message => {
//   if (message.content === '!play') {
//       if (message.member.voice.channel) {
//           const connection = await message.member.voice.channel.join();
//           // Replace 'audio.mp3' with your actual audio file path or URL
//           const dispatcher = connection.play('Tai Verdes - AOK (Lyric Video) [hdX3aK2Gelo].webm');

//           dispatcher.on('start', () => {
//               console.log('Audio is now playing!');
//           });

//           dispatcher.on('finish', () => {
//               console.log('Audio has finished playing!');
//               connection.disconnect();
//           });

//           dispatcher.on('error', console.error);
//       } else {
//           message.reply('You need to join a voice channel first!');
//       }
//   }
// });

client.login(token)
