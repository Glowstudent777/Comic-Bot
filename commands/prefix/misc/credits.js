const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const colors = require('../../../config/config.json');

module.exports = {
    name: 'credits',
    description: "List of people who helped make this bot",

    async execute(message, args, client) {

        const credits = new MessageEmbed()
            .setColor(colors.colors.info)
            .setTitle('**Credits**')
            .setAuthor({ iconURL: client.user.avatarURL(), name: client.user.username })
            .setDescription("For support join the Discord server [here](https://discord.gg/4wM63P7ZUd)")
            .setFields(
                {
                    name: `Developer`,
                    value: `Glowstudent#1229`
                },)
            .setFooter({ text: `Thanks to everyone for making this possible!` });
        message.channel.send({ embeds: [credits] });
    },
};