import * as express from 'express';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {
    router.get('/test/:test', (req, res) => {
        res.send(req.params.test);
        bot.say({channel: 'C1E9TV5TP', text: `Testing sending message from API endpoint. API hit at /test/${req.params.test}`});
    });
    return router;
};
