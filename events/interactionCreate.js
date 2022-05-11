const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        console.log(`[${interaction.commandName}] ${interaction.user.tag} (${interaction.user.id})`);

        try {
            await command.execute(client, interaction);
            // await command.execute(interaction, client);
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};