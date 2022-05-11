const channels = require('../config/autopost.json');
const { prefix } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');
const { getImage } = require("gocomics-api");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const { checkDate } = require('./checkDate.js');

module.exports = {
    async getComic(sendChannel, ping, message, client) {
        let cdate;

        cdate = moment().format('YYYY-MM-DD');
        cdate = moment(cdate).add(1, 'months').format('YYYY-MM-DD');
        cdate = date.transform(cdate, 'YYYY-MM-DD', 'YYYY-M-D');

        // Month replacement
        if (cdate.split('-')[1] === '0') cdate = cdate.split('-')[0] + '-2-' + cdate.split('-')[2];
        if (cdate.split('-')[1] === '1') cdate = cdate.split('-')[0] + '-2-' + cdate.split('-')[2];

        console.log(`Is valid: ${date.isValid(cdate, 'YYYY-M-D')}`);

        // Check if date is valid before trying to get comic
        // for (let i = 0; i < 3; i++) {
        //     if (checkDate.checkDate(cdate) === false) {
        //         return message.channel.send("Error, comic not found.");
        //     }
        // }

        const format = 'YYYY-M-D';
        // for (let i = 0; i < 3; i++) {
        //     if (checkDate.checkDate(cdate, format) === false) {
        //         return message.channel.send("Error, comic not found.");
        //     }
        // }

        if (!date.isValid(cdate, 'YYYY-M-D')) {
            return message.channel.send("Error, comic not found.");
        }

        const comic = await getImage({
            comicName: "garfield",
            comicNumber: Math.floor(Math.random() * 100),
            comicFormat: "png",
            date: [cdate],
        }).catch(err => {
            return message.channel.send("Error, comic not found.");
        });

        let footerDate;
        footerDate = moment(cdate, 'YYYY-M-D').subtract(1, 'months').format('YYYY-MM-DD');
        footerDate = cdate.split('-').join('/');

        const comicEmbed = new MessageEmbed()
            .setColor('#50C878')
            .setTitle(`Today's Garfield Comic!`)
            .setImage(comic.uri.href)
            .setFooter({ text: `Comic from: ${footerDate}` })
            .setTimestamp();


        if (ping !== "") {
            sendChannel.send({ content: `<@&${ping}>`, embeds: [comicEmbed] });
        }
        else {
            sendChannel.send({ embeds: [comicEmbed] });
        }

    },
};