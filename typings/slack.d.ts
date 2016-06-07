
declare namespace Slack {

    interface API {
        api_url: 'https://slack.com/api/';
        callAPI();
        callAPIWithoutToken();
        auth: {
            test();
        };
        oauth: {
            access();
        };
        channels: {
            archive();
            create();
            history();
            info();
            invite();
            join();
            kick();
            leave();
            list(obj: {}, cb: (err: Error, data: any) => void): void;
            mark();
            rename();
            setPurpose();
            setTopic();
            unarchive();
        };
        chat: {
            delete();
            postMessage();
            update();
        };
        emoji: {
            list();
        };
        files: {
            delete();
            info();
            list();
            upload();
        };
        groups: {
            archive();
            close();
            create();
            createChild();
            history();
            info();
            invite();
            kick();
            leave();
            list();
            mark();
            open();
            rename();
            setPurpose();
            setTopic();
            unarchive();
        };
        im: {
            close();
            history();
            list();
            mark();
            open();
        };
        mpim: {
            close();
            history();
            list();
            mark();
            open();
        };
        pins: {
            add();
            list();
            remove();
        };
        reactions: {
            add();
            get();
            list();
            remove();
        };
        rtm: {
            start();
        };
        search: {
            all();
            files();
            messages();
        };
        stars: {
            list();
        };
        team: {
            accessLogs();
            info();
        };
        users: {
            getPresence();
            info(arg: { user: string }, callback: (err: Error, response: { ok: boolean, user: User} ) => void ): void;
            list(obj: {}, cb: (err: Error, data: any) => void): void;
            setActive();
            setPresence();
        };
    }

    interface User {
        id: string;
        team_id: string;
        name: string;
        /** Has this user been deleted? */
        deleted: boolean;
        status: string;
        /** Hex color without # */
        color: string;
        /** User's full name */
        real_name: string;
        /** Timezone string (eg. America Indiana Indianapolis) */
        tz: string;
        /** Timezone label (eg. Eastern Daylight Time) */
        tz_label: string;
        tz_offset: number;
        profile: {
            first_name: string;
            last_name: string;
            avatar_hash: string;
            real_name: string;
            real_name_normalized: string;
            email: string;
            /** Encoded Gravatar URL 24x24 */
            image_24: string;
            /** Encoded Gravatar URL 32x32 */
            image_32: string;
            /** Encoded Gravatar URL 48x48 */
            image_48: string;
            /** Encoded Gravatar URL 72x72 */
            image_72: string;
            /** Encoded Gravatar URL 192x192 */
            image_192: string;
            /** Encoded Gravatar URL 512x512 */
            image_512: string;
        };
        is_admin: boolean;
        is_owner: boolean;
        is_primary_owner: boolean;
        is_restricted: boolean;
        is_ultra_restricted: boolean;
        is_bot: boolean;
        has_2fa: boolean;
    }

    interface Message {
        text?: string;
        username?: string;
        /** Parse markdown? */
        mrkdwn?: boolean;
        attachments?: Attachment[];
    }

    interface Attachment {
        /** Required plain-text summary of the attachment */
        fallback: string;
        /** Hex color string (including #) OR "good", "warning", or "danger" */
        color?: string;
        /** Optional text that appears above the attachment block */
        pretext?: string;
        /** Small text used to display the author's name. */
        author_name?: string;
        /** URL for `author_name` Will only work if author_name is present. */
        author_link?: string;
        /**
         * URL that displays a small 16x16px image to the left of the `author_name` text.
         * Will only work if author_name is present.
         */
        author_icon?: string;

        /** The title is displayed as larger, bold text near the top of a message attachment. */
        title?: string;
        /** URL for title */
        title_link?: string;
        /**
         * Optional text that appears within the attachment.
         * The content will automatically collapse if it contains 700+ characters
         *   or 5+ linebreaks, and will display a "Show more..." link to expand the content.
         */
        text?: string;

        fields?: {
            /** Shown as a bold heading above the value text. Cannot contain markup */
            title: string;
            /** The text value of the field. It may contain standard message markup. May be multiline */
            value: string;
            /** An optional flag indicating whether the value is short enough to be displayed side-by-side with other values. */
            short: boolean;
        }[];

        /** URL to an image file that will be displayed inside a message attachment. GIF, JPEG, PNG, or BMP */
        image_url?: string;
        /** URL to an image file that will be displayed as a thumbnail on the right side of a message attachment. */
        thumb_url?: string;

        /**
         * Add some brief text to help contextualize and identify an attachment.
         * Limited to 300 characters, and may be truncated further when displayed
         *   to users in environments with limited screen real estate.
         */
        footer?: string;
        /** URL to 16x16 icon to display to left of footer */
        footer_icon?: string;
        /**
         * By providing the ts field with an integer value in UNIX format,
         *   the attachment will display an additional timestamp value as part
         *   of the attachment's footer.
         */
        ts?: number;

        /** Where to display markdown? */
        mrkdwn_in?: ('text'|'pretext'|'fields')[];
    }

}


/*
{
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",

            "color": "#36a64f",

            "pretext": "Optional text that appears above the attachment block",

            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",

            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",

            "text": "Optional text that appears within the attachment",

            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],

            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",

            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
}
 */
