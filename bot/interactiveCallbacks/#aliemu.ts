

export function dashboardAccess(bot: Botkit.Bot, msg: Botkit.ActionMessage): Botkit.MessageWithContext {
    console.log('....Do stuff here....');
    return Object.assign({}, msg.original_message, {
        attachments: [
            msg.original_message.attachments[0],
            {
                fallback: 'message acknowledged',
                title: 'Message Acknowledged',
            },
        ],
    });
}
