import * as express from 'express';
const router = express.Router();
const CHANNEL_ID = 'G0KM9J46P';

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/draft-submit', (req, res) => {
        bot.say({
            channel: CHANNEL_ID,
            attachments: [
                {
                    fallback: `New Submission Received: ${req.body.title}. Copyeditor assigned: <@${req.body.copyeditor}>. URL: ${req.body.draftUrl}`,
                    color: '#00B092',
                    title: 'New Submission Received',
                    fields: [
                        {
                            title: 'Title',
                            value: `${req.body.title}`,
                            short: true,
                        },
                        {
                            title: 'First Author',
                            value: `${req.body.author}`,
                            short: true,
                        },
                        {
                            title: 'Copyeditor Assignment',
                            value: `<@${req.body.copyeditor}>`,
                            short: true,
                        },
                        {
                            title: 'URLs',
                            value: `<https://www.aliem.com/wp-admin/|Login Page> | <${req.body.draftUrl}|Draft Page>`,
                            short: true,
                        },
                    ],
                    footer: 'Note: The draft URL will not work unless you are logged in.',
                },
            ],
        } as Botkit.MessageWithoutContext, (err, resp) => {
            if (err) return res.sendStatus(503);
            res.sendStatus(200);
        });
    });

    router.post('/copyeditor-submit', (req, res) => {

        if (!req.body.title || !req.body.url) return res.sendStatus(400);

        bot.say({
            channel: CHANNEL_ID,
            attachments: [
                {
                    fallback: `${req.body.title} has cleared copyediting and has been submitted for peer review`,
                    color: '#00B092',
                    text: `*<${req.body.url}|${req.body.title}>* has cleared copyediting and has been submitted for peer review`,
                    mrkdwn_in: ['text'],
                },
            ],
        } as Botkit.MessageWithoutContext, (err, resp) => {
            if (err) return res.sendStatus(503);
            res.sendStatus(200);
        });
    });

    return router;
}
