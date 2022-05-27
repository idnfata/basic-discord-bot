const client = require('../index');
const config = require('../config.json');

const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});

tracker.on('guildMemberAdd', async(member, type, invite) => {

    let channel = member.guild.channels.cache.get(config.INVITE_TRACKER_CHANNEL)

    if(type === 'normal'){
        channel.send(`Welcome ${member}! You were invited by ${invite.inviter} and He has ${invite.uses} Invites!`);
        
    }else if(type === 'permissions'){
        channel.send(`Welcome ${member}! I can't figure out how you joined because I don't have the "Manage Guild" permission!`);
    }else if(type === 'unknown'){
        channel.send(`Welcome ${member}! I can't figure out how you joined the server...`);
    }else if(type === 'vanity'){
        channel.send(`Welcome ${member}! You joined using a custom invite Vanity URL!`);
    }

})