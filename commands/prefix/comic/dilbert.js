var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const getComic = require('../../../functions/getComicPrefix');
const config = require('../../../config/config.js');

module.exports = {
    name: 'dilbert',
    description: "Send a Dilbert comic!",

    async execute(message, args, client) {
        const comicName = "dilbert-classics";

        const comicYear = 2012;
        const firstComicDay = 13;
        const firstComicMonth = 6;
        const embedTitle = "Dilbert";
        const embedColor = config.colors.secondary;

        return getComic.getComic(client, message, comicName, comicYear, firstComicDay, firstComicMonth, embedTitle, embedColor);
    },
};