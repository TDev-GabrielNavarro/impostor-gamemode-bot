require('dotenv').config(); 
const { Client, GatewayIntentBits, Partials, Guild, GuildMessageManager, messageLink } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildMessageReactions, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    });


const fs = require('fs');
const path = require('path');

client.commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.name, command);
}

client.once('clientReady', () => {
    console.log(`Bot prendido! ${client.user.tag} a la orden!`);
});

process.on('unhandledRejection', (error) => {
  console.error('🚨 Error no manejado:', error);
});

client.on('error', (error) => {
  console.error('⚠️ Error del cliente:', error);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith('?') || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Hubo un error al ejecutar ese comando.');
  }
});

client.login(process.env.DISCORD_TOKEN); 