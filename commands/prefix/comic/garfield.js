const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const { getImage } = require("gocomics-api");
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');
const getComic = require('../../../functions/getGarfieldPrefix');
const colors = require('../../../config/config.json');

module.exports = {
    name: 'garfield',
    description: "Send a Garfield comic!",

    async execute(message, args, client) {
        return getComic.getComic(client, message);
    },
};