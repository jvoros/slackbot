import * as email from '../../helpers/email';
import { aliemu as templates } from '../../helpers/constants/templateNames';
import * as REST from '../../helpers/REST/aliemu';

export function dashboardAccess(msg: Botkit.ActionMessage): Promise<Botkit.MessageWithContext> {
    return new Promise<Botkit.MessageWithContext>((resolve, reject) => {
        const emailField = msg.original_message.attachments[0].fields.find(field => field.title === 'Email Address');
        if (!emailField) reject({code: 404, message: 'Recipient email address could not be identified.'});
        const recipientEmail = emailField.value.split('|')[1];
        const userID = msg.original_message.attachments[0].fields.find(f => f.title === 'ID').value;

        console.log('DASHBOARD ACCESS FUNCTION');

        switch (msg.actions[0].name) {
            case 'approve': {
                email.fromTemplate(templates.educator_dashboard_approved, recipientEmail)
                    .then(status => {
                        console.log(`(${status}) => Educator Dashboard approval email sent successfully.`);
                        return REST.update.user(userID, { roles: ['educator_access']});
                    })
                    .then(() => {
                        resolve(success(msg, {
                            fallback: 'Access granted and email sent.',
                            title: ':white_check_mark: Educator Dashboard access granted.',
                            color: 'good',
                        }));
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
                        resolve(success(msg, {
                            fallback: 'Rejection email sent',
                            title: ':no_entry: User denied Educator Dashboard access.',
                            color: 'danger',
                        }));
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

function success(msg: Botkit.ActionMessage, attachment: Slack.Attachment): Botkit.MessageWithContext {
    return Object.assign({}, msg.original_message, {
        attachments: [
            Object.assign({}, msg.original_message.attachments[0], {
                actions: [],
            }),
            attachment,
        ],
    });
}
