const config = require('../config/config.js');

module.exports = {
    name: 'messageCreate', // Name of the event
    async execute(client, message) {

        const { prefix } = require('../config/config.js');

        if (!message.content.startsWith(prefix) || message.author.bot) return;
        if (message.channel.type === 'dm') return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.pcommands.get(commandName) || client.pcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        try {
            command.execute(message, args, client);
            if (config.commandLogging === true) console.log(`[${commandName}] ${message.author.tag} (${message.author.id})`);
        }
        catch (error) {
            // ...
        }
    },
};