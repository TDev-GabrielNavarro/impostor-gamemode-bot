module.exports = {
  name: 'sendhi',
  description: 'Envía un saludo entre usuarios',
  execute(message, args) {
    const target = message.mentions.users.first();

    if (!target) {
      return message.channel.send(`Debes mencionar a alguien para que funcione, ${message.author}!`);
    }

    message.channel.send(`¡${message.author} saluda a ${target}!`);
  },
};