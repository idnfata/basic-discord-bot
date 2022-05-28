const client = require("../index")
// client.on('ready', async() => {
//     console.log(`${client.user.tag} is now online`)
// })
const config = require('../config.json');
const chalk = require('chalk');

module.exports = {
  name: 'ready',
  execute(client) {
    console.log(chalk.green('[Alien Fest]') + chalk.cyan('AF Bot'))
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
    console.log(chalk.green('Name: ') + chalk.cyan('Tickety'))
    console.log(chalk.green('Bot Status: ') + chalk.cyan('Initialized'))
    console.log(chalk.red('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))
    const oniChan = client.channels.cache.get(config.ticketChannel)

    function sendTicketMSG() {
      const embed = new client.discord.MessageEmbed()
        .setColor('6d6ee8')
        .setAuthor({name: 'Ticket', iconURL: client.user.avatarURL()})
        .setDescription('Klik tombol di bawah untuk membuat ticket 👇')
        .setFooter({text:`${client.user.tag} || @alienfest.id`, iconURL: client.user.displayAvatarURL()})
      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
          .setCustomId('open-ticket')
          .setLabel('Open a ticket')
          .setEmoji('✉️')
          .setStyle('PRIMARY'),
        );

      oniChan.send({
        embeds: [embed],
        components: [row]
      })
    }

    oniChan.bulkDelete(100).then(() => {
      sendTicketMSG()
      console.log(chalk.green('[Tickety v2]') + chalk.cyan(' Sent the ticket creation widget..'))
    })
  },
};