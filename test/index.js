const Discord = require('discord.js');
const bot = new Discord.Client();

const { Client } = require('../index');
bot.ext = new Client(bot);

bot.on('ready', () => {
    bot.ext.setGame('I\'m online !');
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content === 'ping') {
        bot.ext.message.create({
            to: msg.channel.id,
            content: 'Pong!'
        });
    }
});

client.login('token');
