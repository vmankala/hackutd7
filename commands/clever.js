const clever = require('cleverbot-free');

exports.name = 'clever'
exports.desc = 'Talk to cometbot';
exports.descLong = 'Have a conversation with cometbot. Uses the Cleverbot AI to generate a response to your message.';
exports.usage = '<message>';
exports.visibility = 0;

exports.run = (bot, msg, args) => {
    // Ignore clever messages with no content
    if (args.length === 0) return;

    // Generate cleverbot message and save memory
    bot.memory.push(args.join(' '));
    clever(args.join(' '), bot.memory).then((res) => {
        bot.memory.push(res);
        bot.createMessage(msg.channel.id, res);
    });

    if (bot.memory.length > 250) {
        bot.memory.shift();
        bot.memory.shift();
    }
}