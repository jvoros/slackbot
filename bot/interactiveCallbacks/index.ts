import * as aliemu from './#aliemu';

export default function interactiveMessageCallbacks(bot: Botkit.Bot, msg: Botkit.ActionMessage) {

    // check message.actions and message.callback_id to see what action to take...
    console.log('==========TESTING');

    new Promise<Botkit.MessageWithContext>((resolve, reject) => {
        switch (msg.callback_id) {
            case '1':
                resolve(counter(msg));
            case 'aliemu-dashboardaccess':
                aliemu.dashboardAccess(msg)
                    .then(response => resolve(response))
                    .catch((e: string) => reject(e));
                break;
            default:
                reject('No matching callback ID found.');
        }
    })
    .then(response => {
        bot.replyInteractive(msg, response);
    })
    .catch(errorMessage => {
        bot.reply(msg, errorMessage);
    });
}


function counter(msg: Botkit.ActionMessage): Botkit.MessageWithContext {
    if (msg.actions[0].name === 'destroy') {
        return { text: 'Counter Destroyed.' };
    }

    const val = parseInt(msg.actions[0].value);
    const count = typeof msg.original_message.attachments[0].text === 'undefined'
        ? 0
        : parseInt(msg.original_message.attachments[0].text);
    msg.original_message.attachments[0].text = `${count + val}`;

    return msg.original_message;
}
