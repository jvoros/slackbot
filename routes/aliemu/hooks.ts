import * as express from 'express';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/coveralls', (req, res) => {
        console.log(req.body);
    });

    return router;
}
