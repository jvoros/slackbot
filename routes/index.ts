import * as express from 'express';
import aliemu from './aliemu/';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {
    router.use('/aliemu', aliemu(bot));
    return router;
};
