if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import rootController from './bot';
const Botkit = require('botkit');
const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const CHANNELS = {};
const USERS = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const controller: Botkit.Controller = Botkit.slackbot({
    debug: false,
});

controller.configureSlackApp({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    scopes: ['bot'],
});

controller
    .createWebhookEndpoints(app)
    .createOauthEndpoints(app, (err, req, res) => {
        if (err) return res.status(500).send('ERROR: ' + err);
        console.log(req);
        res.send('Success!');
        controller.storage.teams.all((e, r) => {
            if (e) return console.error(`=> ERROR: ${e}`);
            console.log(r);
            initSlackbot(r[Object.keys(r)[0]].token);
        });
    });

function initSlackbot(token) {
    controller
        .spawn({ token })
        .startRTM((err, bot, payload) => {
            if (err) return console.error(err);
            payload.channels
                .filter(c => !c.is_archived)
                .forEach(c => CHANNELS[c.name] = c);

            payload.users
                .filter(u => !u.deleted)
                .forEach(u => USERS[u.id] = u);

            app.use('/', routes(bot));
            rootController(controller, USERS);

            app.get('*', (req, res) => {
                res.send('Invalid Endpoint');
            });
        });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
