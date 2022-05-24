const config = require('../config/config.js');

module.exports = {
    name: 'ready',
    once: false,
    execute(client) {

        for (let i = 0; i < config.presence.activities.length; i++) {
            setInterval(() => {
                client.user.setActivity(config.presence.activities[i].name, { type: config.presence.activities[i].type });
            }, 30000);
        }
        client.user.setPresence(config.presence);

    },
};