const { SlashCommandBuilder } = require('@discordjs/builders');
const getComic = require('../../../functions/getComicInteraction');
const config = require('../../../config/config.js');

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
        const embedColor = config.colors.secondary;

        return getComic.getComic(client, interaction, comicName, comicYear, firstComicDay, firstComicMonth, embedTitle, embedColor);
    },
};