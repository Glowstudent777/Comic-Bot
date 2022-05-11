const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'credits',
    description: "List of people who helped make this bot",

    async execute(message, args, client) {

        const credits = new MessageEmbed()
            .setColor('#50C878')
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


// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js');
// const moment = require('moment');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('credits')
//         .setDescription('List of people who helped make this bot'),
//     async execute(interaction, client) {

//         const credits = new MessageEmbed()
//             .setColor('#50C878')
//             .setTitle('**Frederick Credits**')
//             .setAuthor({ iconURL: client.user.avatarURL(), name: client.user.username })
//             .setFields(
//                 {
//                     name: `Developer`,
//                     value: `Glowstudent#1229`
//                 },
//                 {
//                     name: `Beta Testers`,
//                     value: betaTesters.members.sort(function (a, b) {return a.name.localeCompare(b.name)}).map(member => member.name).join('\n')
//                 },
//                 {
//                     name: `Support Server Staff Team`,
//                     value: supportTeam.members.sort(function (a, b) {return a.name.localeCompare(b.name)}).map(member => member.name).join('\n')
//                 },
//                 {
//                     name: `Special Thanks`,
//                     value: `To the people who have helped me with my development and testing.`
//                 })
//             .setFooter({ text: `Thanks to everyone for making this possible` });
//         interaction.reply({ embeds: [credits] });
//     },
// };
