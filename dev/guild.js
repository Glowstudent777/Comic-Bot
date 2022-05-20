const channels = require('../config/autopost.json');
const { prefix } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const resendComic = require('../functions/resendComic');

module.exports = {
    name: 'guild',
    description: "Guild info.",
    usage: 'guild [guild id]',
    maxargs: 1,
    minargs: 1,

    async execute(message, arg, client) {

        const args = message.content.trim().split(/ +/g);
        args.shift();

        if (args.length < this.minargs || args.length > this.maxargs) return message.reply(`Invalid number of arguments. Usage: \`${prefix}${this.usage}\``);
        if (!args[0]) return message.channel.send(`You need to provide a guild id.`);

        const guildArg = args[0];
        const guild = client.guilds.cache.get(guildArg);
        if (!guild) return message.channel.send('Could not find that guild.');

        const baseArray = [
            new MessageButton()
                .setCustomId('guild-info')
                .setLabel('Info')
                .setStyle('PRIMARY')
                .setEmoji('ℹ'),
        ];

        const infoArray = [
            new MessageButton()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle('SECONDARY')
                .setEmoji('⬅'),

            new MessageButton()
                .setCustomId('resend')
                .setLabel('Resend')
                .setStyle('DANGER')
                .setEmoji('📩'),
        ];

        const baseButtons = new MessageActionRow()
            .addComponents(baseArray);

        const infoButtons = new MessageActionRow()
            .addComponents(infoArray);

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${guild.name}`)
            .setTimestamp();

        message.channel.send({ embeds: [embed], components: [baseButtons] });

        const filter = i => i.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter });

        const gInfo = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${guild.name}`)
            .setTimestamp()
            .addFields(
                { name: 'ID', value: guild.id, inline: true }
            );

        const resendEmbed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle(`${guild.name}`)
            .setTimestamp()
            .setDescription(`Sending comic to ${guild.name}`);

        collector.on('collect', async i => {
            if (i.customId === 'guild-info') {
                await i.update({ embeds: [gInfo], components: [infoButtons] });
            }
            if (i.customId === 'resend') {
                let sendChannel;
                let ping;

                for (let x = 0; x < channels.channels.length; x++) {
                    guild.channels.cache.forEach(channel => {
                        if (channel.id === channels.channels[x].id) {
                            sendChannel = channel;
                            ping = channels.channels[x].ping;
                        }
                    });
                }

                await i.update({ embeds: [resendEmbed], components: [] });
                resendComic.getComic(sendChannel, ping, message, client);
            }
            if (i.customId === 'back') {
                await i.update({ embeds: [embed], components: [baseButtons] });
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    },
};