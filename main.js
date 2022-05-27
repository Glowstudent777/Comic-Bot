// keepAlive server
const keepAlive = require('./server');

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Intents
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_PRESENCES,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_INTEGRATIONS,
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.client = client;

// // Collections
client.commands = new Collection();
client.pcommands = new Collection();
client.devCommands = new Collection();

// Load all interaction commands
const commandFolders = fs.readdirSync('./commands/interaction');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/interaction/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/interaction/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}
}

// Load all prefix commands
const pcommandFolders = fs.readdirSync('./commands/prefix');
for (const folder of pcommandFolders) {
	const pcommandFiles = fs.readdirSync(`./commands/prefix/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of pcommandFiles) {
		const pcommand = require(`./commands/prefix/${folder}/${file}`);
		client.pcommands.set(pcommand.name, pcommand);
	}
}

// Load developer commands
const devCommandFiles = fs.readdirSync(`./dev/`).filter(file => file.endsWith('.js'));
for (const file of devCommandFiles) {
	const devCommand = require(`./dev/${file}`);
	client.devCommands.set(devCommand.name, devCommand);
}

// Load all events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

// error handling
client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// keepAlive server
keepAlive();

// login
client.login(process.env.CLIENT_TOKEN);