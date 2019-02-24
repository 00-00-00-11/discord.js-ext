const Discord = require('discord.js');
const bot = new Discord.Client();

const { Client } = require('../index');
bot.ext = new Client(bot);

bot.on('ready', () => {
    bot.ext.setGame('I\'m online !');
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content === 'info') {
        bot.ext.utils.findMember(msg, msg.author.id).then((res) => { // You can find a member with username instead of ID
            let embed = new Discord.RichEmbed()
            .setTitle(res.user.tag)
            .setThumbnail(res.user.displayAvatarURL)
            .addField('Name', res.user.username)
            .addField('Tag', res.user.discriminator)
            .addField('Bot', res.user.bot ? 'Yes' : 'No');
            bot.ext.message.create({
                to: msg.channel.id,
                attachEmbed: embed
            });
        });
    }
});

bot.login('token');
