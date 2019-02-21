module.exports = { 
    utils: require('./src/find'),
    bot: require('./src/client'),
    ...require('./src/message')
};
