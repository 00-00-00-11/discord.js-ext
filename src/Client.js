'use strict';

let Utils = require('./Utils');
let Message = require('./Message');

class Client {
    /**
     * @constructor
     * @param {Client} client The bot client
     */
    constructor(client) {
        if (!client) {
            throw new Error('[DISCORD.JS-EXT] No client found !');
        }

        this.client = client;

        this.utils = new Utils(client);

        this.message = new Message(client);
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
                return console.error('[DISCORD.JS-EXT] You must include a valid type. (online | idle | dnd | offline)');
            }
        }
    }
};

module.exports = Client;
