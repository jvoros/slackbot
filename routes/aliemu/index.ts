import * as express from 'express';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {
    router.get('/:test', (req, res) => {
        res.send(req.params.test);
        bot.say({channel: 'C1E9TV5TP', text: `Testing sending message from API endpoint. API hit at /aliemu/${req.params.test}`});
    });

    // router.post('/message', (req, res) => {
    //     res.send('testing');
    // });
    return router;
}
