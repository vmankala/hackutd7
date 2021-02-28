const axios = require('axios');

exports.name = 'solve'
exports.desc = 'Solves a math problem';
exports.descLong = 'Solves basic math problems and returns the answer.';
exports.usage = '<problem>';
exports.visibility = 0;

exports.run = (bot, msg, args) => {
    // Ignore clever messages with no content
    if (args.length === 0) return;

    // Make a GET request to Math.js
    axios.get('http://api.mathjs.org/v4/', {
        params: {
            expr: args.join(' ')
        }
    }).then(res => {
        bot.createMessage(msg.channel.id, '`' + res.data + '`');
    }).catch(err => {
        bot.createMessage(msg.channel.id, '`Syntax Error`');
        console.log(err);
    });
}