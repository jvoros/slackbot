import * as express from 'express';
const router = express.Router();

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/action-endpoint', (req, res) => {
        // console.log(req);
        // console.log(req.body);

        bot.replyInteractive(req.body.payload, {
            text: '...',
            attachments: [
                {
                    fallback: '',
                    title: 'My buttons',
                    callback_id: '123',
                    attachment_type: 'default',
                    actions: [
                        {
                            name: 'yes',
                            text: 'Yes!',
                            value: 'yes',
                            type: 'button',
                        },
                        {
                            text: 'No!',
                            name: 'no',
                            value: 'delete',
                            style: 'danger',
                            type: 'button',
                            confirm: {
                                title: 'Are you sure?',
                                text: 'This will do something!',
                                ok_text: 'Yes',
                                dismiss_text: 'No',
                            },
                        },
                    ],
                },
            ],
        });


        res.sendStatus(200);
    });

    return router;
}
