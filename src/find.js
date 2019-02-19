/**
 * Finds a member
 * @param {Message} message promise of Discord.JS
 * @param {string} search The query
 * @returns {GuildMember}
 */
exports.findMember = (message, search) => {
    search = search.toLowerCase();
    return message.guild.members.find((m) => m.displayName.toLowerCase() === search || m.discriminator === search || m.id === search);
};

/**
 * Finds a role
 * @param {Message} message promise of Discord.JS
 * @param {string} search The query
 * @returns {Role}
 */
exports.findRole = (message, search) => {
    search = search.toLowerCase();
    return message.guild.roles.find((r) => r.name.toLowerCase() === search || r.id === search);
};

/**
 * Finds a channel
 * @param {Message} message promise of Discord.JS
 * @param {string} search The query
 * @returns {TextChannel|TextChannel|CategoryChannel}
 */
exports.findChannel = (message, search, type) => {
    let typeArray = ['text', 'voice', 'category'];
    search = search.toLowerCase();
    if (!type || type === null) {
        console.error("[DISCORD.JS-EXT] You must include a valid type. (text | voice | category)");
    }
    else if (!typeArray.includes(type)) {
        type = 'text';
    }
    return message.guild.channels.filter((c) => c.type === type).find((c) => c.name.toLowerCase() === search || c.id === search);
};
