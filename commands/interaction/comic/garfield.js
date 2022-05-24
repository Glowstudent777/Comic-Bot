const { SlashCommandBuilder } = require('@discordjs/builders');
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const getComic = require('../../../functions/getComicInteraction');
const config = require('../../../config/config.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('garfield')
        .setDescription('Sends a Garfield comic!'),
    execute(interaction, client) {

        const comicName = "garfield";
        const comicYear = 1978;
        const firstComicDay = 19;
        const firstComicMonth = 6;
        const embedTitle = "Garfield";
        const embedColor = config.colors.main;

        return getComic.getComic(client, interaction, comicName, comicYear, firstComicDay, firstComicMonth, embedTitle, embedColor);
    },
};