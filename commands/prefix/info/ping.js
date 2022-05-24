const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../../../config/config.js');

module.exports = {
    name: 'ping',
    description: "Pong!",

    async execute(message, args, client) {

        const ping = new MessageEmbed()
            .setColor(config.colors.info)
            .setTitle('Pong!')
            .setDescription(`${message.author.username}'s ping is ${Date.now() - message.createdTimestamp}ms`)
            .setTimestamp();
        message.reply({ embeds: [ping] });
    },
};
