import { TOKEN } from './data/secrets';
const Botkit = require('botkit');


const controller: Botkit.Controller = Botkit.slackbot({
    debug: false,
    // include "log: false" to disable logging
    // or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
    token: TOKEN,
}).startRTM();

controller.hears([/hello/i, /hi/i, /hey/i], ['ambient'], (bot, message) => {
    bot.api.users.info({ user: message.user }, (err, res) => {
        if (err) return;
        bot.reply(message, `Testing! Hello ${res.user.real_name}`);
    });
});
