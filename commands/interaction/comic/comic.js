const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getImage } = require("gocomics-api");
// const moment = require('moment');
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comic')
        .setDescription('Sends a comic!'),
    async execute(interaction, member, client) {

        function checkDate(x) {
            if (date.isValid(x, 'YYYY-M-D')) {
                return true;
            } else {
                return false;
            }
        }

        async function getComic() {
            let cdate;
            cdate = moment().subtract(Math.floor(Math.random() * (moment().diff(moment('1978-06-19', 'YYYY-MM-DD')) / 86400000)), 'days').format('YYYY-MM-DD');

            cdate = moment(cdate).add(1, 'months').format('YYYY-MM-DD');

            cdate = date.transform(cdate, 'YYYY-MM-DD', 'YYYY-M-D');

            console.log(`Is valid: ${date.isValid(cdate, 'YYYY-M-D')}`);

            // Check if date is valid before trying to get comic x3
            for (let i = 0; i < 3; i++) {
                if (checkDate(cdate) === false) {
                    console.log("Error, comic not found. Retrying...");
                    return getComic();
                }
            }

            // Check if date is valid before trying to get comic x3
            for (let i = 0; i < 3; i++) {
                if (checkDate(cdate) === false) {
                    console.log("Error, comic not found. Retrying...");
                    return getComic();
                }
            }

            if (!date.isValid(cdate, 'YYYY-M-D')) {
                console.log("Error, comic not found. Retrying...");
                return getComic();
            }

            let comic = await getImage({
                comicName: "garfield",
                comicNumber: Math.floor(Math.random() * 100),
                comicFormat: "png",
                // URLOnly: true,
                date: [cdate]
            }).catch(err => {
                console.log("Error, comic not found. Retrying...");
                return getComic();
            });

            let footerDate;
            footerDate = moment(cdate, 'YYYY-M-D').subtract(1, 'months').format('YYYY-MM-DD');
            footerDate = footerDate.split('-').join('/');

            const comicEmbed = new MessageEmbed()
                .setColor('#50C878')
                .setTitle(`Garfield Comic!`)
                .setImage(comic.uri.href)
                .setFooter({ text: `Comic from: ${footerDate}` })
                .setTimestamp();
            return await interaction.reply({ embeds: [comicEmbed] });
        }

        getComic();

    },
};