
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


}
