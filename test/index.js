const Discord = require('discord.js');
const client = new Discord.Client();
client.ext = require('../index');

client.on('ready', () => {
    client.ext.bot.setGame(client, 'I\'m online !');
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        client.ext.createMessage(client, {
            to: msg.channel.id,
            content: 'Pong!'
        });
    }
});

client.login('token');
