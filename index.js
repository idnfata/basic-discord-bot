const Discord = require('discord.js')
const fs = require('fs')

const {
    Client,
    Collection,
    Intents
} = require('discord.js');
const chalk = require('chalk')
const client = new Client({ intents :[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"] });
const config = require('./config.json');


module.exports = client


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.discord = Discord;
client.config = config;


['common_handler', 'mongo_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

// require("./handlers/slash_handler")

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
};

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, client, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  };
});

client.login(config.token)