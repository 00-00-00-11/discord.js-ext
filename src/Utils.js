'use strict';

class Utils {
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
     * Finds a member
     * @param {Message} message promise of Discord.JS
     * @param {string} search The query
     * @returns {GuildMember}
     */
    findMember(message, search) {
        search = search.toLowerCase();
        return message.guild.members.find((m) => m.displayName.toLowerCase() === search || m.discriminator === search || m.id === search);
    }

    /**
     * Finds a role
     * @param {Message} message promise of Discord.JS
     * @param {string} search The query
     * @returns {Role}
     */
    findRole(message, search) {
        search = search.toLowerCase();
        return message.guild.roles.find((r) => r.name.toLowerCase() === search || r.id === search);
    }

    /**
     * Finds a channel
     * @param {Message} message promise of Discord.JS
     * @param {string} search The query
     * @param {string} type The type of the channel
     * @returns {TextChannel|VoiceChannel|CategoryChannel}
     */
    findChannel(message, search, type) {
        let typeArray = ['text', 'voice', 'category'];
        search = search.toLowerCase();
        if (!type || type === null) {
            throw new Error('[DISCORD.JS-EXT] You must include a valid type. (text | voice | category)');
        }
        else if (!typeArray.includes(type)) {
            throw new Error('[DISCORD.JS-EXT] You must include a valid type. (text | voice | category)'); 
        }
        return message.guild.channels.filter((c) => c.type === type).find((c) => c.name.toLowerCase() === search || c.id === search);
    }
    
    /**
     * Finds an emoji
     * @param {Message} message promise of Discord.JS
     * @param {string} search The query
     * @returns {Emoji}
     */
    findEmoji(message, search) {
        if (typeof search === 'string') {
            if (isNaN(search)) {
                search = search
                .toLowerCase()
                .replace(/[^a-zA-Z]/g, '');
            }
        } else if (typeof search === 'number') {
            search = search;
        } else {
            throw new Error('[DISCORD.JS-EXT] You must include a string or a number.'); 
        }
        return message.guild.emojis.find((e) => e.name.toLowerCase() === search || e.id === search);
    }
};

module.exports = Utils;
