import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import rootController from './bot';
const Botkit = require('botkit');
const app = express();

const PORT = process.env.PORT || 5000;
const TOKEN = process.env.TOKEN || require('./data/secrets').TOKEN;
const CHANNELS = {};
const USERS = {};

const controller: Botkit.Controller = Botkit.slackbot({ debug: false });


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
.then((BOT: Botkit.Bot) => {

    app.use(bodyParser.json());

    app.use('/', routes(BOT));
    rootController(controller);

    app.get('*', (req, res) => {
        res.send('Invalid Endpoint');
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

});
