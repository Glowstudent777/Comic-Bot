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
        cdate = moment().subtract(Math.floor(Math.random() * (moment().diff(moment('2012-06-13', 'YYYY-MM-DD')) / 86400000)), 'days').format('YYYY-MM-DD');
        for (let i = 0; i < 3; i++) {
            if (cdate.split('-')[1] === '0' || cdate.split('-')[1] === '00') {
                cdate = cdate.split('-')[0] + '-01-' + cdate.split('-')[2];
            }
        }

        cdate = date.transform(cdate, 'YYYY-MM-DD', 'YYYY-M-D');
        console.log(`Is valid: ${date.isValid(cdate, 'YYYY-M-D')}`);

        // Check if date is valid before trying to get comic x3
        const format = 'YYYY-M-D';
        for (let i = 0; i < 3; i++) {
            if (checkDate.checkDate(cdate, format) === false) {
                console.log(`Error, comic not found (${cdate}). Retrying...`);
                return this.getComic();
            }
        }

        if (!date.isValid(cdate, 'YYYY-M-D')) {
            console.log("Error, comic not found. Retrying...");
            return this.getComic();
        }

        if (cdate.split('-')[1] === '0' || cdate.split('-')[1] === '00') {
            cdate = cdate.split('-')[0] + '-1-' + cdate.split('-')[2];
        }

        let comicFetchDate = cdate.split('-')[0] + '-' + (parseInt(cdate.split('-')[1]) + 1) + '-' + (parseInt(cdate.split('-')[2]) + 1);
        comicFetchDate = date.transform(comicFetchDate, 'YYYY-M-D', 'YYYY-MM-DD');

        const comic = await getImage({
            comicName: "dilbert-classics",
            comicNumber: Math.floor(Math.random() * 100),
            comicFormat: "png",
            date: [comicFetchDate],
        }).catch(err => {
            console.log("Error, comic not found. Retrying...");
            return this.getComic();
        });

        let footerDate;
        footerDate = moment(cdate, 'YYYY-M-D').format('YYYY-MM-DD');
        footerDate = footerDate.split('-').join('/');

        const comicEmbed = new MessageEmbed()
            .setColor(colors.colors.main)
            .setTitle(`Dilbert Comic!`)
            .setImage(comic.uri.href)
            .setFooter({ text: `Comic from: ${footerDate}` })
            .setTimestamp();
        interaction.reply({ embeds: [comicEmbed] });
    },
};