import * as email from '../../helpers/email';
import { aliemu as templates } from '../../helpers/constants/templateNames';

export function dashboardAccess(msg: Botkit.ActionMessage): Promise<Botkit.MessageWithContext> {
    return new Promise<Botkit.MessageWithContext>((resolve, reject) => {
        const recipientEmail = msg.original_message.attachments[0].fields.find(field => field.title === 'Email Address').value;
        if (!recipientEmail) reject({code: 404, message: 'Recipient email address could not be identified.'});

        switch (msg.actions[0].name) {
            case 'approve': {
                email.fromTemplate(templates.educator_dashboard_approved, recipientEmail)
                    .then(status => {
                        console.log('=> Educator Dashboard approval email sent successfully.');
                        resolve(emailSuccessful(msg, 'Educator Dashboard approval email sent successfully.'));
                    })
                    .catch((e: {code: number, message: string}) => {
                        console.error(`=> ERROR (${e.code}): ${e.message}`);
                        reject(e.message);
                    });
                break;
            }
            case 'deny': {
                email.fromTemplate(templates.educator_dashboard_denied, recipientEmail)
                    .then(status => {
                        console.log('=> Educator Dashboard rejection email sent successfully.');
                        resolve(emailSuccessful(msg, 'Educator Dashboard rejection email sent successfully.'));
                    })
                    .catch((e: {code: number, message: string}) => {
                        console.error(`=> ERROR (${e.code}): ${e.message}`);
                        reject(e.message);
                    });
                break;
            }
            default:
                reject('Slack interactive message action not recognized.');
        }
    });
}

function emailSuccessful(msg: Botkit.ActionMessage, msgText: string): Botkit.MessageWithContext {
    return Object.assign({}, msg.original_message, {
        attachments: [
            Object.assign({}, msg.original_message.attachments[0], {
                actions: [],
            }),
            {
                fallback: 'message sent successfully',
                color: 'good',
                title: msgText,
            },
        ],
    });
}
