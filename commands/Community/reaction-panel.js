const Schema = require("../../models/reaction-roles")

module.exports = {
    name: "reaction-panel",
    description: "Shows the reaction role panel",
    aliases: ["rpanel", "panel"],
    usage: ".panel",
    BotPerms: ["ADD_REACTIONS"],
    UserPerms: ["ADMINISTRATOR"],

    async execute(client, message, cmd, args, Discord) {

        const channel = message.mentions.channels.first() || message.channel

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (!data) return message.reply("No reaction role data can be found!")

            const mapped = Object.keys(data.Roles).map((value, index) => {

                const role = message.guild.roles.cache.get(data.Roles[value][0])

                return `\`${index + 1}.\` ${data.Roles[value][1].raw} -React to get: ${role}`

            }).join("\n\n")

            const rrEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Selamat datang di Alien Fest Community Semuanya 😇`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`Untuk komunitas kedepannya, kita akan menggunakan dua Hub yakni General Hub (untuk berbincang ringan dan berkenalan) dan Bahasan Bisnis Hub (spesifik untuk membahas semua yang terkait dengan bisnis para alien disini). Nantinya, kita akan expand bahasan bisnis kita yang menyesuaikan dengan kebutuhan para member di komunitas Alien Fest ini, jadi stay tune terus yah!

                Feel free to use these channels di Alien Fest Hub:
                - announcement: untuk pengumuman-pengumuman program Komunitas Alien Fest kedepannya seperti Webinar, Workshop, dan Community Programs. 
                - kenalan: untuk berkenalan antar member dengan format sebagai berikut
                   + Nama
                   + Asal 
                   + Bidang bisnis
                   + Tahun awal berbisnis
                - off-topic: untuk mengobrol tentang literally apapun (asal tidak ada unsur SARA dan asusila lainnya)
                
                
                Sementara untuk Bahasan Bisnis Hub, ini spesifik untuk bertanya dan membahas teknis-teknis dan pertanyaan spesifik mengenai:
                - produk: segala hal yang berhubungan dengan produk
                - keuangan: segala hal yang berhubungan dengan keuangan
                - investasi: segala hal tentang investasi bisnis
                - asuransi: segala hal tentang asuransi
                
                Info program-program selanjutnya akan kami infokan lewat announcement. Selamat menikmati channel-channel komunitas AlienFest!`)
                .addField("\u200B", mapped)
                .setFooter({text: "Reaction Roles by Alien Fest"})
                .setTimestamp()

            channel.send({ embeds: [rrEmbed] }).then((msg) => {

                data.Message = msg.id
                data.save()
                const reactions = Object.values(data.Roles).map((val) => val[1].id)

                reactions.map(
                    (emoji) => msg.react(emoji)
                        .catch(error => {

                            message.reply("You must use emojis from this server to make it work!")
                            console.error(error)

                        })
                )

            })

        })
    }
}