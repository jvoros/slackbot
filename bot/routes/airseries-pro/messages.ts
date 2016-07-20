import * as express from 'express';
import { requireAuthentication } from '../../helpers/authentication';
import { wordpressComment } from '../../helpers/sharedHandlers';
const router = express.Router();
const CHANNEL_ID = 'C0976GGSH'; // #airseries-pro

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/comments', requireAuthentication, (req, res) =>
        wordpressComment(bot, CHANNEL_ID, req, res)
    );

    return router;
}
