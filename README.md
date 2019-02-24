<p align="center">
  <img src="https://cdn.discordapp.com/attachments/548493810494210108/548493842328846351/djsext.png" alt="discord.js-ext" width="200px">
  <br>
  <br>
  <a href="https://nodei.co/npm/discord.js-ext/"><img src="https://nodei.co/npm/discord.js-ext.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  <br>
  <a href="https://www.npmjs.com/package/discord.js-ext"><img src="https://img.shields.io/npm/v/discord.js-ext.svg?maxAge=3600" alt="NPM version" /></a>
  <a href="https://www.npmjs.com/package/discord.js-ext"><img src="https://img.shields.io/npm/dt/discord.js-ext.svg?maxAge=3600" alt="NPM downloads" /></a>
</p>

<h2>About</h2>

<p>
  <strong>Discord.JS-EXT</strong> was created to simplify the wide use of <strong>Discord.js</strong> for beginners.
  
  The first version was created by <strong>Sworder</strong> at <strong>21/02/2019</strong>.
</p>

<h2>Installation</h2>

<p>
  <strong>Discord.js@11.4.2</strong> and <strong>Node.js@8.x</strong> is necessary to use <strong>Discord.JS-EXT</strong>, to install:
  <ul>
   <li>Node.js (Linux):

```
sudo apt-get install nodejs
```

   </li>
   <li>Node.js (Windows):
  <p>You can download Node.js here: <a href="https://nodejs.org/en/download/">nodejs.org</a></p>
   </li>
    <li> Discord.js:
      
```
npm install --save discord.js
```
   </li>
  </ul>
</p>

<h2>Example usage</h2>

```js
const Discord = require('discord.js');
const bot = new Discord.Client();

const { Client } = require('discord.js-ext');
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

bot.login('token');
```
