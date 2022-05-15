const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getImage } = require("gocomics-api");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const getComic = require('../../../functions/getDilbertPrefix');
const colors = require('../../../config/config.json');

module.exports = {
    name: 'dilbert',
    description: "Send a Dilbert comic!",

    async execute(message, args, client) {
        return getComic.getComic(client, message);
    },
};