'use strict';

class PlayerManager {
    /**
     * @constructor
     * @param {Client} client The bot client
     */
    constructor(client) {
        if (!client) {
            throw new Error('[DISCORD.JS-EXT] No client found !');
        }
        
        this.client = client;
    }

    /**
     * Join a voice channel
     * @param {object} id The voice channel ID
     * @returns {Promise<VoiceConnection>}
     */
    async join(id) {
        if (id && typeof id === 'string') {
            if (this.client.channels.get(id)) {
                if (this.client.channels.get(id).type === 'voice') {
                    await this.client.channels.get(id).join()
                    .catch((err) => {
                        if (err) throw new Error(`[DISCORD.JS-EXT] The bot cannot join this channel, an error has occured:\n\n${err.message}`);
                    });
                } else {
                    throw new Error('[DISCORD.JS-EXT] The bot cannot join this channel because it\'s not a voice channel.');
                }
                
            } else {
                throw new Error('[DISCORD.JS-EXT] The bot cannot join this channel because the bot don\'t see it.');
            }
        }
    }

    /**
     * Leave a voice channel
     * @param {object} id The voice channel ID
     * @returns {void}
     */
    async leave(id) {
        if (id && typeof id === 'string') {
            let filterVc = this.client.voiceConnections.filter((v) => v.channel.id === id);
            if (filterVc.size > 0) {
                await filterVc.first().disconnect();
            } else {
                throw new Error('[DISCORD.JS-EXT] The bot cannot leave this channel because the bot don\'t see it.');
            }
        }
    }
};

module.exports = PlayerManager;
