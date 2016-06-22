
export default function interactiveMessageCallbacks(bot: Botkit.Bot, msg: Botkit.ActionMessage) {

    // check message.actions and message.callback_id to see what action to take...

    switch (msg.callback_id) {
        case '1':
            return counter(bot, msg);
    }

}


function counter(bot: Botkit.Bot, msg: Botkit.ActionMessage) {

    if (msg.actions[0].name === 'destroy') {
        return bot.replyInteractive(msg, {
            text: 'Counter Destroyed.',
        });
    }

    const val = parseInt(msg.actions[0].value);
    const count = parseInt(msg.original_message.attachments[0].text);
    msg.original_message.attachments[0].text = `${count + val}`;

    bot.replyInteractive(msg, msg.original_message);
}
