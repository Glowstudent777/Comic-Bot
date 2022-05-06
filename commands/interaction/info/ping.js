const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays latency and API ping'),
    async execute(interaction, member, client) {
        const ping = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle('Pong!')
            .setDescription(`${interaction.user.username}'s ping is ${Date.now() - interaction.createdTimestamp}ms`)
            .setTimestamp();
        interaction.reply({embeds: [ping]});
    },
};