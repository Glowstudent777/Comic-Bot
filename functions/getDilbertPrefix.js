var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const { parse } = require("node-html-parser");
const rp = require("request-promise-native");
const r = require("request");
const { MessageEmbed } = require('discord.js');
const colors = require('../config/config.json');

module.exports = {

    async getComic(client, message) {

        var archive = 'https://gocomics.com/dilbert-classics/';
        var today = new Date();
        var todayYear = today.getFullYear();

        var month = Math.floor(Math.random() * 12) + 1;
        let day;
        if (month === 2) {
            day = Math.floor(Math.random() * 29) + 1;
        }
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            day = Math.floor(Math.random() * 30) + 1;
        }
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 ||
            month === 10 || month === 12) {
            day = Math.floor(Math.random() * 31) + 1;
        }
        var randomYear = Math.floor(Math.random() * (todayYear - 2012) + 2012);
        var randomizedMonth = (month < 9 ? '0' : '') + month;
        var randomizedDay = (day < 9 ? '0' : '') + day;
        var url = archive + randomYear + '/' + randomizedMonth + '/' + randomizedDay;

        const parsedPage = parse(await rp(url)
            .catch(err => {
                console.log("Request failed\n", err);
            }));

        const imageURL = parsedPage.querySelector(".item-comic-image img").rawAttrs.split(/ src=/)[1].replace(/"/g, "");

        const embed = new MessageEmbed()
            .setColor(colors.colors.main)
            .setTitle('Dilbert')
            .setURL(url)
            .setImage(imageURL)
            .setFooter({ text: 'Powered by GoComics.com' })
            .setTimestamp();
        message.reply({ embeds: [embed] });

    },
};