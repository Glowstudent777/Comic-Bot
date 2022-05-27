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
            .setDescription(`⌛ ${client.ws.ping}ms`)
            .setTimestamp();
        message.reply({ embeds: [ping] });
    },
};
