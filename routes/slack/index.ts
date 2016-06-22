import * as express from 'express';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/action-endpoint', (req, res) => {
        console.log(req);
        res.sendStatus(200);
    });

    return router;
}
