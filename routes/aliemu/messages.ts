import * as express from 'express';
const router = express.Router();
const CHANNEL_ID = 'C09762GTV'; // #aliemu

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/contact-form', (req, res) => {
        console.log(req.body);
        console.log(req.body.data);
        const { name, email, message } = JSON.parse(req.body.data.replace(/\r\n/g, '\\n'));
        if (!name || !email || !message) return res.sendStatus(400);
        bot.say({
            channel: CHANNEL_ID,
            attachments: [
                {
                    fallback: `Contact form message from ${name}: ${message} -- Email: ${email}`,
                    title: 'Message Received from Contact Us Form',
                    fields: [
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

    router.post('/comments', (req, res) => {
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

    router.post('/dashboard-access', (req, res) => {
        console.log('hello');
        console.log(req.body);
        console.log(req.body.data);
        res.sendStatus(200);
    });

    return router;
}


/*
"name" => $_POST['first_name-' . $formid] . $_POST['last_name-' . $formid],
        "username" => $username,
        "email" => $_POST['user_email-' . $formid],
        "program" => $_POST['residency_us_em'],
        "role" => $_POST['role'] == 'em-resident' ? 'Resident' : 'Faculty',
        "bio"
 */
