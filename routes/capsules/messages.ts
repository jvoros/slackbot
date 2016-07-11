import * as express from 'express';
import { requireAuthentication } from '../../helpers/authentication';
const router = express.Router();
const CHANNEL_ID = 'C0K6854UT'; // #capsules

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/comments', requireAuthentication, (req, res) => {
        const { name, email, content, postUrl, postName } = JSON.parse(req.body.data.replace(/\r\n/g, '\\n'));
        if (!name || !email || !content || !postUrl || !postName) return res.sendStatus(400);
        bot.say({
            channel: CHANNEL_ID,
            text: `Comment Received: *<${postUrl}|${postName}>*`,
            attachments: [
                {
                    fallback: `Comment from ${name} <${email}> on ${postName}: ${content}`,
                    fields: [
                        {
                            title: 'Comment',
                            value: `${content}`,
                            short: false,
                        },
                        {
                            title: 'From',
                            value: `${name}`,
                            short: true,
                        },
                        {
                            title: 'Email Address',
                            value: `<mailto:${email}|${email}>`,
                            short: true,
                        },
                    ],
                },
            ],
        } as Botkit.MessageWithoutContext, (err, resp) => {
            if (err) return res.sendStatus(503);
            res.sendStatus(200);
        });
    });

    return router;
}
