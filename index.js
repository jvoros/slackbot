const Botkit = require('botkit');
const { TOKEN } = require('./data/secrets.js');

const controller = Botkit.slackbot({
  debug: false,
  // include "log: false" to disable logging
  // or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: TOKEN,
}).startRTM();

// give the bot something to listen for.
controller.hears(['hello'], ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
  bot.reply(message, 'Hello there!');
});

controller.hears('test', ['ambient'], (bot, message) => {
  bot.api.users.info({ user: message.user }, (err, res) => {
    if (err) return;
    bot.reply(message, `Testing! Hello ${res.user.real_name}`);
  });
});
