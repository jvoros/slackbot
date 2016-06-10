import * as express from 'express';
import aliemu from './aliemu/';
import newsubmissions from './newsubmissions/';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {
    router.use('/aliemu', aliemu(bot));
    router.use('/newsubmissions', newsubmissions(bot));
    return router;
};
