/**
 * Changes the game of the bot
 * @param {Client} client The bot client
 * @param {string} name The name of the game
 * @returns {Promise<ClientUser>}
 */
exports.setGame = async(client, name) => {
    if (name && typeof name === 'string') {
        await client.user.setPresence({
            game: {
                name
            }
        });
    }
};

/**
 * Changes the status of the bot
 * @param {Client} client The bot client
 * @param {string} type The status
 * @returns {Promise<ClientUser>}
 */
exports.setStatus = async(client, type) => {
    let types = ['online', 'idle', 'dnd', 'offline'];
    if (type && typeof type === 'string') {
        if (types.includes(type)) {
            await client.user.setPresence({
                status: type
            });
        } else {
            return console.error('[DISCORD.JS-EXT] You must include a valid type. (online | idle | dnd | offline)');
        }
    }
};
