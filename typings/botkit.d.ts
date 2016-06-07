
declare namespace Botkit {

    type SlackMessageEvent = 'ambient'|'message_received'|'direct_mention'|'direct_message'|'mention';
    /**
     * Enum of user levels
     * ura     = single channel guest
     * ra      = multi-channel guest
     * regular = regular user
     * admin   = admin user
     * owner   = team owner
     */
    type SlackUserLevel = 'ura'|'ra'|'regular'|'admin'|'owner';

    interface Bot {

        api: Slack.API;
        config: Config;
        identity: Identity;
        rtm: Object;
        team_info: TeamInfo;
        utterances: Utterances;

        /** TODO */
        configureIncomingWebhook(): void;
        sendWebhook(): void;
        configureRTM(): void;
        closeRTM(): void;
        destroy(): void;
        identifyBot(): void;
        identifyTeam(): void;
        startPrivateConversation(): void;
        startConversation(): void;
        _startDM(): void;
        send(): void;
        replyPublic(): void;
        replyPublicDelayed(): void;
        replyPrivate(): void;
        replyPrivateDelayed(): void;
        startTyping(): void;
        replyWithTyping(): void;
        findConversation(): void;
        say(msg: AttachmentMessageNoContext|TextMessageNoContext, callback?: (err: Error, res: any) => void): void;

        /**
         * Reply to a message
         * @param message  Incoming message object
         * @param reply    String or Object Outgoing response
         * @param callback Optional callback
         */
        reply(message: Message, reply: string|Object, callback?: (Error, Object) => void): void;

        /** Starts the Slack Realtime Messaging service */
        startRTM(callback: (err: Error, bot: Bot) => void): void;
    }

    interface Config {
        token: string;
    }

    interface Controller {

        events: {
            message_received: Object;
            direct_message: Object;
            direct_mention: Object;
            mention: Object;
            ambient: Object;
        };
        config: {
            debug: boolean;
            logLevel: 'emergency'
                | 'alert'
                | 'critical'
                | 'error'
                | 'warning'
                | 'notice'
                | 'info' // default
                | 'debug'
                | number;
            /** Allows you to use a separate logger (eg. Winston) */
            logger: Function;
            /** Default: true */
            log: boolean;
        };
        tasks: any[];
        taskCount: number;
        convoCount: number;
        memory_store: {
            users: {};
            channels: {};
            teams: {};
        };
        utterances: Utterances;
        middleware: {
            send: Object;
            receive: Object;
        };
        storage: {
            teams: {
                get(teamid, cb); /** TODO */
                save(team, cb);
                all(cb);
            };
            users: {
                get(userId, cb);
                save(user, cb);
                all(cb);
            };
            channels: {
                get(channelId, cb);
                save(channel, cb);
                all(cb);
            };
        };

        log: {
            (msg): void;
            emergency(msg): void;
            alert(msg): void;
            critical(msg): void;
            error(msg): void;
            warning(msg): void;
            notice(msg): void;
            info(msg): void;
            debug(msg): void;
        };
        logger: {
            log(): any;
        };


        /** TODO */
        changeEars(): any;
        configureSlackApp(): any;
        createHomepageEndpoint(): any;
        createOauthEndpoints(): any;
        createWebhookEndpoints(): any;
        debug(): void;
        defineBot(): any;
        findTeamById(): any;
        getAuthorizeURL(): any;
        handleSlackEvents(): any;
        hears_regexp(): any;
        hears_test(): any;
        on(): any;
        receiveMessage(): any;
        saveTeam(): any;
        setupWebserver(): any;
        shutdown(): any;
        spawn(): any;
        startConversation(): any;
        startTask(): any;
        startTicking(): any;
        tick(): any;
        trigger(): any;
        worker(): any;

        /** Used to spawn a bot instance */
        spawn(config: Config): Bot;

        /**
         * Botkit event handler for messages.
         * @param patterns   An array or a comma separated string containing a list of regular expressions to match
         * @param types      An array or a comma separated string of the message events in which to look for the patterns
         * @param middleware Optional function to redefine how patterns are matched. see Botkit Middleware
         * @param callback   function that receives a message object.
         */
        hears(patterns: string|(string|RegExp)[], types: SlackMessageEvent[], callback: (bot: Bot, message: Message) => void): void;
        hears(patterns: string|(string|RegExp)[], types: SlackMessageEvent[], middleware: Function, callback: (bot: Bot, message: Message) => void): void;

    }

    interface Identity {
        id: string;
        name: string;
        prefs: {
            // highlight_words: '',
            // user_colors: '',
            // color_names_in_list: true,
            // growls_enabled: true,
            // tz: null,
            // push_dm_alert: true,
            // push_mention_alert: true,
            // msg_replies: '{ "flexpane":false }',
            // push_everything: false,
            // push_idle_wait: 2,
            // push_sound: 'b2.mp3',
            // push_loud_channels: '',
            // push_mention_channels: '',
            // push_loud_channels_set: '',
            // email_alerts: 'instant',
            // email_alerts_sleep_until: 0,
            // email_misc: true,
            // email_weekly: true,
            // welcome_message_hidden: false,
            // all_channels_loud: false,
            // loud_channels: '',
            // never_channels: '',
            // loud_channels_set: '',
            // show_member_presence: true,
            // search_sort: 'timestamp',
            // expand_inline_imgs: true,
            // expand_internal_inline_imgs: true,
            // expand_snippets: false,
            // posts_formatting_guide: true,
            // seen_welcome_2: false,
            // seen_ssb_prompt: false,
            // spaces_new_xp_banner_dismissed: false,
            // search_only_my_channels: false,
            // emoji_mode: 'default',
            // emoji_use: '',
            // has_invited: false,
            // has_uploaded: false,
            // has_created_channel: false,
            // search_exclude_channels: '',
            // messages_theme: 'default',
            // webapp_spellcheck: true,
            // no_joined_overlays: false,
            // no_created_overlays: false,
            // dropbox_enabled: false,
            // seen_domain_invite_reminder: false,
            // seen_member_invite_reminder: false,
            // mute_sounds: false,
            // arrow_history: false,
            // tab_ui_return_selects: true,
            // obey_inline_img_limit: true,
            // new_msg_snd: 'knock_brush.mp3',
            // require_at: true,
            // ssb_space_window: '',
            // mac_ssb_bounce: '',
            // mac_ssb_bullet: true,
            // expand_non_media_attachments: true,
            // show_typing: true,
            // pagekeys_handled: true,
            // last_snippet_type: '',
            // display_real_names_override: 0,
            // display_preferred_names: true,
            // time24: false,
            // enter_is_special_in_tbt: false,
            // graphic_emoticons: false,
            // convert_emoticons: true,
            // autoplay_chat_sounds: true,
            // ss_emojis: true,
            // sidebar_behavior: '',
            // seen_onboarding_start: false,
            // onboarding_cancelled: false,
            // seen_onboarding_slackbot_conversation: false,
            // seen_onboarding_channels: false,
            // seen_onboarding_direct_messages: false,
            // seen_onboarding_invites: false,
            // seen_onboarding_search: false,
            // seen_onboarding_recent_mentions: false,
            // seen_onboarding_starred_items: false,
            // seen_onboarding_private_groups: false,
            // onboarding_slackbot_conversation_step: 0,
            // dnd_enabled: false,
            // dnd_start_hour: '22:00',
            // dnd_end_hour: '08:00',
            // mark_msgs_read_immediately: true,
            // start_scroll_at_oldest: true,
            // snippet_editor_wrap_long_lines: false,
            // ls_disabled: false,
            // sidebar_theme: 'default',
            // sidebar_theme_custom_values: '',
            // f_key_search: false,
            // k_key_omnibox: true,
            // speak_growls: false,
            // mac_speak_voice: 'com.apple.speech.synthesis.voice.Alex',
            // mac_speak_speed: 250,
            // comma_key_prefs: false,
            // at_channel_suppressed_channels: '',
            // push_at_channel_suppressed_channels: '',
            // prompted_for_email_disabling: false,
            // full_text_extracts: false,
            // no_text_in_notifications: false,
            // muted_channels: '',
            // no_macssb1_banner: false,
            // no_macssb2_banner: false,
            // no_winssb1_banner: false,
            // no_omnibox_in_channels: false,
            // k_key_omnibox_auto_hide_count: 0,
            // hide_user_group_info_pane: false,
            // mentions_exclude_at_user_groups: false,
            // privacy_policy_seen: true,
            // search_exclude_bots: false,
            // load_lato_2: false,
            // fuller_timestamps: false,
            // last_seen_at_channel_warning: 0,
            // flex_resize_window: false,
            // msg_preview: false,
            // msg_preview_displaces: true,
            // msg_preview_persistent: true,
            // emoji_autocomplete_big: false,
            // winssb_run_from_tray: true,
            // winssb_window_flash_behavior: 'idle',
            // two_factor_auth_enabled: false,
            // two_factor_type: null,
            // two_factor_backup_type: null,
            // enhanced_debugging: false,
            // mentions_exclude_at_channels: true,
            // confirm_clear_all_unreads: true,
            // confirm_user_marked_away: true,
            // box_enabled: false,
            // seen_single_emoji_msg: false,
            // confirm_sh_call_start: true,
            // preferred_skin_tone: '',
            // show_all_skin_tones: false,
            // separate_private_channels: false,
            // whats_new_read: 1465163646,
            // hotness: false,
            // frecency_jumper: '',
            // jumbomoji: true,
            // no_flex_in_history: true,
            // newxp_seen_last_message: 0,
            // attachments_with_borders: false,
            // sticky_unread_divider: false,
            // priority_sort: false,
            // custom_channel_sort: '',
            // a11y_font_size: 'normal'
        }; /** TODO */
        created: number;
        manual_presence: string;
    }

    interface Message {
        type?: string;
        channel?: string;
        user?: string;
        text?: string;
        attachments?: Slack.Attachment[];
        ts?: string;
        team?: string;
        event?: string;
        match?: [string, {index: number}, {input: string}]; /** FIXME */
    }

    interface AttachmentMessageNoContext extends Message {
        channel: string;
        attachments: Slack.Attachment[];
    }

    interface TextMessageNoContext extends Message {
        channel: string;
        text: string;
    }

    interface TeamInfo {
        id: string;
        name: string;
        email_domain: string;
        domain: string;
        msg_edit_window_mins: number;
        prefs: TeamInfoPrefs;
        icon: {
            [id: string]: string;
        };
        over_storage_limit: boolean;
        plan: string;
        over_integrations_limit: boolean;
    }

    interface TeamInfoPrefs {
        default_channels: Object;
        display_real_names: boolean;
        posts_migrating: number;
        allow_calls: boolean;
        hide_referers: boolean;
        msg_edit_window_mins: number;
        allow_message_deletion: boolean;
        who_can_at_everyone: SlackUserLevel;
        who_can_at_channel: SlackUserLevel;
        who_can_create_channels: SlackUserLevel;
        who_can_archive_channels: SlackUserLevel;
        who_can_create_groups: SlackUserLevel;
        who_can_post_general: SlackUserLevel;
        who_can_kick_channels: SlackUserLevel;
        who_can_kick_groups: SlackUserLevel;
        retention_type: number;
        retention_duration: number;
        group_retention_type: number;
        group_retention_duration: number;
        dm_retention_type: number;
        dm_retention_duration: number;
        file_retention_duration: number;
        file_retention_type: number;
        allow_retention_override: boolean;
        require_at_for_mention: boolean;
        default_rxns: Object;
        team_handy_rxns: Object;
        channel_handy_rxns: Object;
        compliance_export_start: number;
        warn_before_at_channel: 'always';
        disallow_public_file_urls: boolean;
        who_can_create_delete_user_groups: SlackUserLevel;
        who_can_edit_user_groups: SlackUserLevel;
        who_can_change_team_profile: SlackUserLevel;
        allow_shared_channels: boolean;
        who_has_team_visibility: SlackUserLevel;
        invites_only_admins: boolean;
        disable_file_uploads: 'allow_all';
        who_can_create_shared_channels: SlackUserLevel;
        who_can_post_in_shared_channels: Object;
        allow_shared_channel_perms_override: boolean;
        dnd_enabled: boolean;
        dnd_start_hour: string; // HH:MM
        dnd_end_hour: string; // HH:MM
        auth_mode: string;
        who_can_manage_integrations: Object;
    }

    interface Utterances {
        yes: RegExpConstructor; // /^(yes|yea|yup|yep|ya|sure|ok|y|yeah|yah)/i
        no: RegExpConstructor; // /^(no|nah|nope|n)/i
    }

}
