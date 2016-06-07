import * as express from 'express';
const router = express.Router();
const CHANNEL_ID = 'C09762GTV'; // #aliemu

export default function route(bot: Botkit.Bot): express.Router {

    router.post('/coveralls', (req, res) => {
        bot.say({
            channel: CHANNEL_ID,
            attachments: [
                {
                    fallback: `Coverage at ${req.body.covered_percent} after commit by ${req.body.committer_name}`,
                    text: `${req.body.committer_name} pushed to \`${req.body.branch}\`: ${req.body.commit_message}`,
                    author_name: 'coveralls.io',
                    author_link: 'https://coveralls.io/github/AcademicLifeInEM/ALiEMU',
                    author_icon: 'https://pbs.twimg.com/profile_images/2993745544/a43e4a04cb9f778842de43f95db59a14_400x400.png',
                    title: 'Coverage Report',
                    fields: [
                        {
                            title: 'Covered Percent',
                            value: `${req.body.covered_percent}`,
                            short: true,
                        },
                        {
                            title: 'Coverage Change',
                            value: `${req.body.coverage_change}`,
                            short: true,
                        },
                    ],
                    image_url: `${req.body.badge_url.replace(/\.svg$/, '.png')}`,
                    mrkdwn_in: ['text'],
                },
            ],
        });
        res.sendStatus(200);
    });

    return router;
}
