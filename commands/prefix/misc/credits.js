const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const config = require('../../../config/config.js');

module.exports = {
    name: 'credits',
    description: "List of people who helped make this bot",

    async execute(message, args, client) {

        const credits = new MessageEmbed()
            .setColor(config.colors.info)
            .setTitle('**Credits**')
            .setAuthor({ iconURL: client.user.avatarURL(), name: client.user.username })
            .setFields(
                {
                    name: `Developer`,
                    value: `Glowstudent#1229`
                },
                {
                    name: `Amazing wonderful code review and inspiration throughout all of life`,
                    value: `TheShadow#8124`
                },
                {
                    name: `Support`,
                    value: `For support join the Discord server [here](${config.supportServer || "https://discord.gg/4wM63P7ZUd"})`
                })
            .setFooter({ text: `Thanks to everyone for making this possible!` });
        message.channel.send({ embeds: [credits] });
    },
};