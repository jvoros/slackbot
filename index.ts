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

controller.spawn({
    token: TOKEN,
})
.startRTM((err, bot, payload) => {
    if (err) return console.error(err);

    payload.channels
        .filter(c => !c.is_archived)
        .forEach(c => CHANNELS[c.name] = c);

    payload.users
        .filter(u => !u.deleted)
        .forEach(u => USERS[u.id] = u);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/', routes(bot));
    rootController(controller, USERS);

    app.get('*', (req, res) => {
        res.send('Invalid Endpoint');
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
