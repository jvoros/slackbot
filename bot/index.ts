export default function(controller: Botkit.Controller): Botkit.Controller {
    controller.hears([/hello/i, /hi/i, /hey/i], ['direct_mention'], (bot, message) => {
        bot.api.users.info({ user: message.user }, (err, res) => {
            if (err) return;
            bot.reply(message, `Testing! Hello ${res.user.real_name}`);
        });
    });
    return controller;
}
