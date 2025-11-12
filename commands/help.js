module.exports = {
    name: 'h',
    description: 'Proporciona una lista de comandos disponibles',
    execute(message, args) {
        const helpMessage = `Aquí están los comandos disponibles:\n
- **?hola**: Responde con un saludo amistoso.\n
- **?sendhi @usuario**: Envía un saludo al usuario mencionado.\n
- **?s**: Inicia el juego del impostor.\n
- **?h**: Proporciona una lista de los comandos disponibles.\n
\n
Un requisito para poder jugar es que en Discord, Ve al nombre del servidor → Ajuste de privacidad → Activa “Permitir mensajes directos de miembros del servidor”. \n
\n
¡Usa estos comandos para interactuar conmigo!`;
        message.channel.send(helpMessage);
    },
};