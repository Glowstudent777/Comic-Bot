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
const getComic = require('../../../functions/getDilbertInteraction');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dilbert')
        .setDescription('Sends a Dilbert comic!'),
    execute(interaction, client) {
        return getComic.getComic(client, interaction);
    },
};