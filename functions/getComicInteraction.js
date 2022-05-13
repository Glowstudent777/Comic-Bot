const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const { getImage } = require("gocomics-api");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const checkDate = require('./checkDate');
const colors = require('../config/config.json');

module.exports = {

    async getComic(client, interaction) {

        let cdate;
        cdate = moment().subtract(Math.floor(Math.random() * (moment().diff(moment('1978-06-19', 'YYYY-MM-DD')) / 86400000)), 'days').format('YYYY-MM-DD');
        cdate = moment(cdate).add(1, 'months').format('YYYY-MM-DD');
        cdate = date.transform(cdate, 'YYYY-MM-DD', 'YYYY-M-D');
        console.log(`Is valid: ${date.isValid(cdate, 'YYYY-M-D')}`);

        // Check if date is valid before trying to get comic x3
        const format = 'YYYY-M-D';
        for (let i = 0; i < 3; i++) {
            if (checkDate.checkDate(cdate, format) === false) {
                console.log("Error, comic not found. Retrying...");
                return this.getComic();
            }
        }

        if (!date.isValid(cdate, 'YYYY-M-D')) {
            console.log("Error, comic not found. Retrying...");
            return this.getComic();
        }

        const comic = await getImage({
            comicName: "garfield",
            comicNumber: Math.floor(Math.random() * 100),
            comicFormat: "png",
            date: [cdate],
        }).catch(err => {
            console.log("Error, comic not found. Retrying...");
            return this.getComic();
        });

        let footerDate;
        footerDate = moment(cdate, 'YYYY-M-D').subtract(1, 'months').format('YYYY-MM-DD');
        footerDate = footerDate.split('-').join('/');

        const comicEmbed = new MessageEmbed()
            .setColor(colors.colors.main)
            .setTitle(`Garfield Comic!`)
            .setImage(comic.uri.href)
            .setFooter({ text: `Comic from: ${footerDate}` })
            .setTimestamp();
        interaction.reply({ embeds: [comicEmbed] });
    },
};