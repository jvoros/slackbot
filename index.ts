import * as express from 'express';
import routes from './routes';
import rootController from './bot';
const Botkit = require('botkit');
const app = express();

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN;
const CHANNELS = {};
const USERS = {};

const controller: Botkit.Controller = Botkit.slackbot({
    debug: false,
    // include "log: false" to disable logging
    // or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});


new Promise((resolve, reject) => {
    controller.spawn({
        token: TOKEN,
    }).startRTM((err, bot) => {
        if (err) reject(err);

        const p1 = new Promise((res, rej) => {
            bot.api.channels.list({}, (e, resp) => {
                resp.channels.forEach(c => {
                    CHANNELS[c.name] = c;
                });
                res(true);
            });
        });

        const p2 = new Promise((res, rej) => {
            bot.api.users.list({}, (e, resp) => {
                resp.members.forEach(u => {
                    if (!u.deleted) {
                        USERS[u.name] = u;
                    }
                });
                res(true);
            });
        });

        Promise.all([p1, p2]).then(() => {
            resolve(bot);
        });
    });
})
.then((slackbot: Botkit.Bot) => {

    app.use('/', routes(slackbot));
    rootController(controller);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

});
