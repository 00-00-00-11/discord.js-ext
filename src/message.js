/**
 * Sends a message from the client
 * @param {Client} client The bot client
 * @param {object} options Send options
 * @returns {Promise<Message>}
 */
exports.createMessage = (client, options) => {
    if (options !== undefined) {
        if (typeof options === 'object') {
            if (options.to && !isNaN(options.to)) {
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
                    return console.error('[DISCORD.JS-EXT] You must include a content|embed|file to send a message.');
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
                    return client.channels.get(options.to).send(options.content, additional)
                    .catch((err) => {
                        if (err) {
                            return console.error(err);
                        }
                    });
                }
            }
        }
    }
};
