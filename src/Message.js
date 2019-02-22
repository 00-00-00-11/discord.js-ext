'use strict';

class Message {
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
    }

    /**
     * Sends a message from the client
     * @param {Client} client The bot client
     * @param {object} options Send options
     * @returns {Promise<Message>}
     */
    create(options = {}) {
        if (options !== undefined) {
            if (typeof options === 'object') {
                if (options.to && !isNaN(options.to)) {
                    if(!this.client.channels.get(options.to)) {
                        throw new Error('[DISCORD.JS-EXT] The bot cannot send a message in this channel.');
                    }
                    if (!options.content || typeof options.content !== 'string') { 
                        options.content = null;
                    }
                    if (!options.attachEmbed || typeof options.attachEmbed !== 'object') {
                        options.attachEmbed = null;
                    }
                    if (!options.attachFile || typeof options.attachFile !== 'object') {
                        options.attachFile = null;
                    }
                    if (options.content === null && options.attachEmbed === null && options.attachFile === null) {
                        throw new Error('[DISCORD.JS-EXT] You must include a content|embed|file to send a message.');
                    } else {
                        let additional = null;
                        if (options.attachFile !== null && options.embed !== null) {
                            additional = Object.assign(options.attachEmbed, options.attachFile);
                        }
                        else if (options.attachEmbed !== null) {
                            additional = options.attachEmbed;
                        }
                        else if (options.attachFile !== null) {
                            additional = options.attachFile;
                        }
                        return this.client.channels.get(options.to).send(options.content, additional)
                        .catch((err) => {
                            if (err) {
                                throw new Error(err);
                            }
                        });
                    }
                }
            }
        }
    }
};

module.exports = Message;
