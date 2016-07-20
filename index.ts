if (process.env.NODE_ENV !== 'production') require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './bot/routes/';
import rootController from './bot/controller/';

const PORT = process.env.PORT || 5000;
const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
/* FIXME: Probably can delete this */
// const SLACKBOT_TOKEN = process.env.SLACKBOT_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;
const BOTS_RUNNING = {};
const CHANNELS = {};
const USERS = {};

const Botkit = require('botkit');
const Store = require('botkit-storage-mongo-updated')({mongoUri: MONGODB_URI});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const controller: Botkit.Controller = Botkit.slackbot({
    debug: false,
    storage: Store,
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
        res.send('Success!');
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

controller.storage.teams.all((err, teams) => {
  if (err) throw err;

  // connect all teams with bots up to slack!
  for (let team of teams) {
    if (team.bot) {
      const bot = controller.spawn(team);
      initSlackbot(bot);
    }
  }
});

controller.on('create_bot', (bot: Botkit.Bot, teamConfig) => {
    if (BOTS_RUNNING[bot.config.token]) return console.log('=> Bot already running!');
    initSlackbot(bot, teamConfig);
});


function initSlackbot(BOT: Botkit.Bot, team?) {
    BOT
    .startRTM((err, bot, payload) => {
        if (err) return console.error(err);

        trackBot(bot);
        if (team) {
            controller.saveTeam(team, (e, id) => {
                if (e) {
                    console.log('Error saving team');
                }
                else {
                    console.log(`Team ${team.name} saved`);
                }
            });
        }

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

function trackBot(bot: Botkit.Bot): void {
    BOTS_RUNNING[bot.config.token] = bot;
}
