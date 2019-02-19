const Discord = require('discord.js');
const client = new Discord.Client();
client.extentions = require('../index');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        client.extentions.createMessage(client, {
            to: msg.channel.id,
            content: 'Pong!'
        });
    }
});

client.login('token');
