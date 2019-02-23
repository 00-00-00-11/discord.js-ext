'use strict';

let Message = require('./Message');
let PlayerManager = require('./PlayerManager');
let Utils = require('./Utils');

class Client {
    /**
     * @constructor
     * @param {Client} client The bot client
     */
    constructor(client) {
        if (!client) {
            throw new Error('[DISCORD.JS-EXT] No client found !');
        }
        // The bot client
        this.client = client;
        // Imports the message functions
        this.message = new Message(client);
        // Imports the playermanager functions
        this.playermanager = new PlayerManager(client);
        // Imports the utils functions
        this.utils = new Utils(client);
    }

    /**
     * Changes the game of the bot
     * @param {string} name The name of the game
     * @returns {Promise<ClientUser>}
     */
    async setGame(name) {
        if (name && typeof name === 'string') {
            await this.client.user.setPresence({
                game: {
                    name
                }
            });
        }
    }

    /**
     * Changes the status of the bot
     * @param {string} type The status
     * @returns {Promise<ClientUser>}
     */
    async setStatus(type) {
        let typeArray = ['online', 'idle', 'dnd', 'offline'];
        if (type && typeof type === 'string') {
            if (typeArray.includes(type)) {
                await this.client.user.setPresence({
                    status: type
                });
            } else {
                throw new Error('[DISCORD.JS-EXT] You must include a valid type. (online | idle | dnd | offline)');
            }
        }
    }

    /**
     * Leave a guild
     * @param {string} id The guild ID
     * @returns {Promise<Guild>}
     */
    async leaveGuild(id) {
        if (id && typeof id === 'string') {
            if (this.client.guilds.get(id)) {
                await this.client.guilds.get(id).leave();
            } else {
                throw new Error('[DISCORD.JS-EXT] You cannot leave this guild because the bot isn\'t there.');
            }
        }
    }
};

module.exports = Client;
