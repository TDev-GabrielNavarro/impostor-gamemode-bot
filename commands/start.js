module.exports = {
    name: 's',
    description: 'Inicia la experiencia o partida del bot.',
    async execute(message, args) {

    const wordBank = [
        // Animales
        'ornitorrinco', 'cangrejo araña', 'murciélago', 'panda rojo', 'dragón de komodo',

        // Comida
        'pizza hawaiana', 'sushi', 'helado de oreo', 'tacos mexicanos', 'pastel de chocolate',

        // Objetos
        'lámpara de lava', 'aspiradora (roomba)', 'reloj de arena gigante', 'silla mecedora', 'paraguas',

        // Películas / series
        'Volver al Futuro', 'Fast&Furious', 'Harry Potter', 'Matrix', 'Los Simpsons',

        // Personajes / famosos
        'El Chapulín Colorado', 'Sherlock Holmes', 'Goku', 'Darth Vader', 'Iron Man',

        // Lugares
        'Islas Moai', 'Pirámides de Egipto', 'La Muralla China', 'Monte Everest', 'Barranquilla',

        // Cosas locas o divertidas
        'monstruo de galleta', 'sombrero de paja', 'coche que flota', 'conejo', 'robot',

        // Misc divertido
        'lluvia de helados', 'montaña rusa invisible', 'teletransportador defectuoso', 'árbol que canta', 'pingüino con sombrero'
    ];


    const startMessage = `¡Están iniciando una ronda del impostor! 🃏\n**El juego va a comenzar...**`;
    message.channel.send(startMessage);

    const joinMessage = await message.channel.send(
        `here ${message.author.toString()} inició una nueva partida! ¡Únete reaccionando 🃏!`
    );
    await joinMessage.react('🃏');

    const filter = (reaction, user) => reaction.emoji.name === '🃏' && !user.bot;

    const collected = await joinMessage.awaitReactions({
        filter,
        time: 15000,
    });

    const usersReacted = collected.get('🃏')?.users.cache.filter(u => !u.bot);

    if (!usersReacted || usersReacted.size === 0) {
        return message.channel.send('No hubo jugadores esta ronda.');
    }

    const players = Array.from(usersReacted.values());

    const impostorIndex = Math.floor(Math.random() * players.length);
    const impostor = players[impostorIndex];

    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    for (const player of players) {
        try {
            if (player.id === impostor.id) {
                await player.send('Eres el impostor!');
            } else {
                await player.send(`Chorizo. \nTu palabra es: **${randomWord}**`);
            }
        } catch (error) {
            console.error(`No pude enviar mensaje a ${player.tag}:`, error);
            await message.channel.send(`${player}, no pude enviarte mensaje directo. ¡Activa tus MD!`);
        }
    }
    
    message.channel.send('¡No más reacciones! El juego ha comenzado.');
  },
};
