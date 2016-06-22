
export default function interactiveMessageCallbacks(bot: Botkit.Bot, msg: Botkit.Message) {

    // check message.actions and message.callback_id to see what action to take...

    bot.replyInteractive(msg, {
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
}
