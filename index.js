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
    console.log(`Mensaje recibido: ${message.content} de ${message.author.tag}`);

    if (message.content === '!hola') {
    message.channel.send('Malparido sapo de mierda >:v');
    }

});


client.login(process.env.DISCORD_TOKEN);