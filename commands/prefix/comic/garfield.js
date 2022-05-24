var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const getComic = require('../../../functions/getComicPrefix');
const colors = require('../../../config/config.json');

module.exports = {
    name: 'garfield',
    description: "Send a Garfield comic!",

    async execute(message, args, client) {
        
        const comicName = "garfield";
        const comicYear = 1978;
        const firstComicDay = 19;
        const firstComicMonth = 6;
        const embedTitle = "Garfield";
        const embedColor = colors.colors.main;

        return getComic.getComic(client, message, comicName, comicYear, firstComicDay, firstComicMonth, embedTitle, embedColor);
    },
};