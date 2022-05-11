var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const date = require('date-and-time');

module.exports = {

    // check date function accessable to other files
    checkDate: function(x, format) {
        if (date.isValid(x, format)) {
            return true;
        }
        else {
            return false;
        }
    },
};