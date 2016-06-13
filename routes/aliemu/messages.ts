import * as express from 'express';
const router = express.Router();
const CHANNEL_ID = 'C09762GTV'; // #aliemu

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/contact-form', (req, res) => {
        const { name, email, message } = JSON.parse(req.body.data.replace(/\r\n/g, '\\n'));
        if (!name || !email || !message) return res.sendStatus(400);
        bot.say({
            channel: CHANNEL_ID,
            attachments: [
                {
                    fallback: `Contact form message from ${name}: ${message} -- Email: {email}`,
                    title: 'Message Received from Contact Us Form',
                    fields: [
                        {
                            title: 'From',
                            value: `${name}`,
                            short: true,
                        },
                        {
                            title: 'Email Address',
                            value: `${email}`,
                            short: true,
                        },
                        {
                            title: 'Message',
                            value: `${message}`,
                            short: false,
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
