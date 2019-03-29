'use strict';

const ytdl = require('ytdl-core-discord');

class PlayerManager {
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
     * Join a voice channel
     * @param {string} id The voice channel ID
     * @returns {Promise<VoiceConnection>}
     */
    join(id) {
        return new Promise((resolve, reject) => {
            if (id && typeof id === 'string') {
                if (this.client.channels.get(id)) {
                    if (this.client.channels.get(id).type === 'voice') {
                        this.client.channels.get(id).join()
                        .then((connection) => {
                            resolve(connection);
                        })
                        .catch(reject);
                    } else {
                        return reject(new Error('[DISCORD.JS-EXT] The bot cannot join this channel because it\'s not a voice channel.'));
                    }
                } else {
                    return reject(new Error('[DISCORD.JS-EXT] The bot cannot join this channel because the bot don\'t see it.'));
                }
            }
        });
    }

    /**
     * Leave a voice channel
     * @param {string} id The voice channel ID
     * @returns {Promise<string>}
     */
    leave(id) {
        return new Promise((resolve, reject) => {
            if (id && typeof id === 'string') {
                let filterVc = this.client.voiceConnections.filter((v) => v.channel.id === id);
                let vc = this.client.channels.get(id);
                if (filterVc.size > 0) {
                    try {
                        filterVc.first().disconnect();
                    } catch (err) {
                        return reject(new Error(`[DISCORD.JS-EXT] An error has occured:\n\n${err.message}`));
                    }
                    resolve("Disconnected!");
                } else if (vc && vc.type === 'voice') {
                    try {
                        vc.leave();
                    } catch (err) {
                        return reject(new Error(`[DISCORD.JS-EXT] An error has occured:\n\n${err.message}`));
                    }
                    resolve("Disconnected!");
                } else {
                    return reject(new Error('[DISCORD.JS-EXT] The bot cannot leave this channel because the bot don\'t see it.'));
                }
            }
        });
    }

    /**
     * Plays a YouTube video/music
     * @param {string} id The voice channel ID
     * @param {string} url The youtube url
     * @returns {Promise<VoiceConnection>}
     */
    playYouTube(id, url) {
        return new Promise(async(resolve, reject) => {
            if (id && typeof id === 'string') {
                let filterVc = this.client.voiceConnections.filter((v) => v.channel.id === id);
                let vc = this.client.channels.get(id);
                if (filterVc.size > 0) {
                    if (url && typeof url === 'string') {
                        try {
                            filterVc.first().playOpusStream(await ytdl(url), { volume: 0.1 });
                        } catch (err) {
                            return reject(new Error(`[DISCORD.JS-EXT] An error has occured:\n\n${err.message}`));
                        }
                        resolve(filterVc.first());
                    } else {
                        return reject(new Error('[DISCORD.JS-EXT] You must include a valid URL. (string only)'));
                    }
                } else if (vc) {
                    vc.join()
                    .then(async(connection) => {
                        try {
                            connection.playOpusStream(await ytdl(url), { volume: 0.1 });
                        } catch (err) {
                            return reject(new Error(`[DISCORD.JS-EXT] An error has occured:\n\n${err.message}`));
                        }
                        resolve(connection);
                    })
                    .catch((err) => {
                        if (err) {
                            return reject(new Error(`[DISCORD.JS-EXT] The bot cannot join this channel, an error has occured:\n\n${err.message}`));
                        }
                    });
                } else {
                    return reject(new Error('[DISCORD.JS-EXT] The bot cannot join this channel because the bot don\'t see it.'));
                }
            }
        });
    }
    
    /**
     * Changes the volume.
     * @param {Snowflake} id The guild ID
     * @param {Number} volume The number of volume
     * returns {Promise<String>}
     */
    setVolume(id, volume) {
        return new Promise((resolve, reject) => {
            let guild = this.client.guilds.get(id);
            if (!id) { return reject(new Error('[DISCORD.JS-EXT] The guildID isn\'t specified.')); }
            if (!guild) { return reject(new Error('[DISCORD.JS-EXT] The bot isn\'t on this guild.')); }
            if (!guild.voiceConnection) { return reject(new Error('[DISCORD.JS-EXT] The bot isn\'t connected on any channel in this guild.')); }
            if (!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) { return reject(new Error('[DISCORD.JS-EXT] The bot isn\'t playing.')); }
            if (!volume || isNaN(volume)) { return reject(new Error('[DISCORD.JS-EXT] The volume must be a number.')); }
            if (volume < 0 || volume > 100) { return reject(new Error('[DISCORD.JS-EXT] The volume must be a number between 0 and 100.')); }
            try {
                guild.voiceConnection.player.dispatcher.setVolume((volume / 100));
            } catch (err) {
                return reject(new Error(`[DISCORD.JS-EXT] An error has occured:\n\n${err.message}`));
            }
            resolve('Volume set!');
        });
    }
};

module.exports = PlayerManager;
