const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, devGuild } = require('./config/config.js');
require('dotenv').config();

const commands = [];

const commandFolders = fs.readdirSync('./commands/interaction');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/interaction/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/interaction/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);


(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, devGuild),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
})();