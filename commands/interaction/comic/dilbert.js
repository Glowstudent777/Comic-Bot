const { SlashCommandBuilder } = require('@discordjs/builders');
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const getComic = require('../../../functions/getComicInteraction');
const colors = require('../../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dilbert')
        .setDescription('Sends a Dilbert comic!'),
    execute(interaction, client) {

        const comicName = "dilbert-classics";
        const comicYear = 2012;
        const firstComicDay = 13;
        const firstComicMonth = 6;
        const embedTitle = "Dilbert";
        const embedColor = colors.colors.secondary;

        return getComic.getComic(client, interaction, comicName, comicYear, firstComicDay, firstComicMonth, embedTitle, embedColor);
    },
};