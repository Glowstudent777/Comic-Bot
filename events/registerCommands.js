const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config/config.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        const commands = [];

        const commandFolders = fs.readdirSync('./commands/interaction');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/interaction/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/interaction/${folder}/${file}`);
                commands.push(command.data.toJSON());

                if (config.commandLoadLogging === true) console.log(`Loaded command: ${command.data.name}`);
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

        (async () => {
            try {
                if (config.commandLoadLogging === true) console.log("Started refreshing application (/) commands.");

                await rest.put(Routes.applicationCommands(client.user.id), {
                    body: commands,
                });
                if (config.commandLoadLogging === true) console.log("Successfully reloaded application (/) commands.");
            }
            catch (error) {
                console.error(error);
            }
        })();
    },
};