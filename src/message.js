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
                if (!options.sendEmbed || typeof options.sendEmbed !== 'object') {
                    options.sendEmbed = null;
                }
                if (!options.sendFile || typeof options.sendFile !== 'object') {
                    options.sendFile = null;
                }
                if (options.content === null && options.sendEmbed === null && options.sendFile === null) {
                    return console.error('[DISCORD.JS-EXT] You must include a content|embed|file to send a message.');
                } else {
                    let additional = null;
                    if (options.sendFile !== null && options.embed !== null) {
                        additional = Object.assign(options.sendEmbed, options.sendFile);
                    }
                    else if (options.sendEmbed !== null) {
                        additional = options.sendEmbed;
                    }
                    else if (options.sendFile !== null) {
                        additional = options.sendFile;
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
