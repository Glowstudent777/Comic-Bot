const { MessageEmbed } = require('discord.js');
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const autopost = require('../config/autopost.json');
const config = require('../config/config.js');
const { parse } = require("node-html-parser");
const rp = require("request-promise-native");
const r = require("request");

module.exports = {
    async getComic(sendChannel, ping, message, client) {

        if (sendChannel === undefined) return message.channel.send('There is no configured channel to send the comic to.');

        var archive = 'https://gocomics.com/garfield/';
        var today = new Date();
        var todayYear = today.getFullYear();
        var todayMonth = today.getMonth();
        var todayDay = today.getDate();
        var formattedToday = moment(today).format("YYYY/MM/DD");
        var url = archive + formattedToday;

        const parsedPage = parse(await rp(url)
            .catch(err => {
                console.log("Request failed\n", err);
            }));

        const imageURL = parsedPage.querySelector(".item-comic-image img").rawAttrs.split(/ src=/)[1].replace(/"/g, "");

        const embed = new MessageEmbed()
            .setColor(config.colors.main)
            .setTitle('Daily Garfield Comic')
            .setURL(url)
            .setImage(imageURL)
            .setFooter({ text: 'Powered by GoComics.com' })
            .setTimestamp();


        if (ping !== "") {
            sendChannel.send({ content: `<@&${ping}>`, embeds: [embed] });
        }
        else {
            sendChannel.send({ embeds: [embed] });
        }

    },
};