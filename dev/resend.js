const channels = require('../config/autopost.json');
const { prefix } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');
const { getImage } = require("gocomics-api");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const resendComic = require('../functions/resendComic');

module.exports = {
    name: 'resend',
    description: "Resend daily comic.",
    usage: 'resend [guild id]',
    maxargs: 1,
    minargs: 1,

    async execute(message, arg, client) {

        const args = message.content.trim().split(/ +/g);
        args.shift();

        if (args.length < this.minargs || args.length > this.maxargs) return message.reply(`Invalid number of arguments. Usage: \`${prefix}${this.usage}\``);
        if (!args[0]) return message.channel.send(`You need to provide a guild id.`);
        
        const sendGuild = args[0];
        const guild = client.guilds.cache.get(sendGuild);
        if (!guild) return message.channel.send('Could not find that guild.');
        
   
        let sendChannel;
        let ping;

        // check guild for channel
        for (let i = 0; i < channels.channels.length; i++) {
            guild.channels.cache.forEach(channel => {
                if (channel.id === channels.channels[i].id) {
                    sendChannel = channel;
                    ping = channels.channels[i].ping;
                }
            });
        }

        message.channel.send(`Resending comic to #${sendChannel.name}`);
        resendComic.getComic(sendChannel, ping, message, client);

    },
};