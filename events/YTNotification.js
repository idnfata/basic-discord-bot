const client = require('../index');
const config = require('../config.json');
const youtube = require('discord-bot-youtube-notifications');

const Notifier = new youtube.notifier(client, {
    //default message
    message: "Hello @everyone, **{author}** baru saja upload video **{title}**\nLihat di sini\n\nurl : {url}",
    // Time interval to check for new uploads
    updateTime: 86400000, // in milliseconds,
    // Auto send the embed to the provided channel
    autoSend: true, // if false you will get A "upload" event
});


Notifier.addNotifier(config.YOUTUBE_CHANNEL, config.DC_CHANNEL_FOR_NOTIF);
Notifier.addNotifier("UCC_OYI6VZtuEZuq49Ht-cQQ", config.DC_CHANNEL_FOR_NOTIF, "Hello guys, **{author}** baru saja upload video **{title}**\nLihat di sini\n\nurl : {url}");
