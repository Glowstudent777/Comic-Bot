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
const autopost = require('../config/autopost.json');
const colors = require('../config/config.json');

module.exports = {
    name: 'ready',
    once: false,
    async execute(client) {

        console.log("Starting autoposting...");

        function checkDate(x) {
            if (date.isValid(x, 'YYYY-M-D')) {
                return true;
            }
            else {
                return false;
            }
        }

        async function getComic() {
            let cdate;
            // cdate = moment().subtract(Math.floor(Math.random() * (moment().diff(moment('1978-06-19', 'YYYY-MM-DD')) / 86400000)), 'days').format('YYYY-MM-DD');

            cdate = moment().format('YYYY-MM-DD');
            cdate = moment(cdate).add(1, 'months').format('YYYY-MM-DD');

            cdate = date.transform(cdate, 'YYYY-MM-DD', 'YYYY-M-D');

            // Month replacement
            if (cdate.split('-')[1] === '0') cdate = cdate.split('-')[0] + '-2-' + cdate.split('-')[2];
            if (cdate.split('-')[1] === '1') cdate = cdate.split('-')[0] + '-2-' + cdate.split('-')[2];

            console.log(`Is valid: ${date.isValid(cdate, 'YYYY-M-D')}`);

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

            const comic = await getImage({
                comicName: "garfield",
                comicNumber: Math.floor(Math.random() * 100),
                comicFormat: "png",
                // URLOnly: true,
                date: [cdate],
            }).catch(err => {
                console.log("Error, comic not found. Retrying...");
                return getComic();
            });

            let footerDate;
            footerDate = moment(cdate, 'YYYY-M-D').subtract(1, 'months').format('YYYY-MM-DD');
            footerDate = cdate.split('-').join('/');

            const comicEmbed = new MessageEmbed()
                .setColor(colors.colors.main)
                .setTitle(`Today's Garfield Comic!`)
                .setImage(comic.uri.href)
                .setFooter({ text: `Comic from: ${footerDate}` })
                .setTimestamp();
            // return await message.channel.send({ embeds: [comicEmbed] });

            for (let i = 0; i < autopost.channels.length; i++) {
                client.guilds.cache.forEach(guild => {
                    guild.channels.cache.forEach(channel => {
                        if (channel.id === autopost.channels.map(achannel => achannel.id)[i]) {

                            // if id is empty, don't post
                            if (autopost.channels.map(achannel => achannel.id)[i] === "") return console.log("No channel set for autoposting.");

                            let ping;
                            ping = autopost.channels.map(achannel => achannel.ping)[i];
                            if (ping === undefined || ping === null || ping === "") ping = "";

                            if (!channel.permissionsFor(client.user).has('SEND_MESSAGES')) return console.log(`I don't have permission to send messages in ${channel.name}`);

                            if (ping === "") return channel.send({ embeds: [comicEmbed] });
                            else return channel.send({ content: `<@&${ping}>`, embeds: [comicEmbed] });
                        }
                    });
                });
            }
        }

        // Get comic every day at 12pm CST
        let postTime = moment('12:00:00', 'HH:mm:ss').utcOffset('-05:00');

        setInterval(() => {
            if (moment().diff(postTime, 'seconds') === 0) {
                console.log("It is time. Sending comic...");
                getComic();
                postTime = postTime.add(1, 'days');
                return console.log("Comic sent.");
            }
            else {
                // ...
            }
        }, 100);

        // Console logging
        setInterval(() => {

            let timeTillPost = postTime.diff(moment());
            if (timeTillPost < 0) timeTillPost = postTime.add(1, 'days').diff(moment());
            const timeTillPostFormatted = moment.duration(timeTillPost).format("h [hours], m [minutes], s [seconds]");

            console.log(`Not time to post yet. Posting in: ${timeTillPostFormatted} (${postTime.format('HH:mm:ss')})`);

        }, 5000);

    },
};