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
    name: 'ready',
    once: false,
    async execute(client) {

        console.log("Starting autoposting...");
        async function getComic() {
            var archive = 'https://gocomics.com/garfield/';
            var today = new Date();
            var todayYear = today.getFullYear();
            var todayMonth = today.getMonth() + 1;
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

                            if (ping === "") return channel.send({ embeds: [embed] });
                            else return channel.send({ content: `<@&${ping}>`, embeds: [embed] });
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

            if (config.autopostLogging === true) console.log(`Not time to post yet. Posting in: ${timeTillPostFormatted} (${postTime.format('HH:mm:ss')})`);

        }, 5000);

    },
};