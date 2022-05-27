const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
const config = require('../config/config.js');

module.exports = {
    name: 'interactionCreate', // Name of the event
    async execute(client, interaction) {

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        // execute commands
        try {
            await command.execute(interaction, client);
            if (config.commandLogging === true) console.log(`[${interaction.commandName}] ${interaction.user.tag} (${interaction.user.id})`);
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};