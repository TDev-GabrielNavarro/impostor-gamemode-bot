module.exports = {
  name: 'hola',
  description: 'Responde con un saludo amistoso',
  execute(message, args) {
    message.channel.send(`¡Hola **${message.author}!** 🃏\nListo para trabajar!`);
  },
};