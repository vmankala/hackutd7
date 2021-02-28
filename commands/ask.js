const embed = require('../utils/embed.js');
const config = require('../config.json');

exports.name = 'ask'
exports.desc = 'Anonymously ask a question';
exports.descLong = 'Anonymously sends your question to the designated help channel so that someone can answer it.';
exports.usage = '<question>';
exports.visibility = 0;

exports.run = (bot, msg, args) => {
    // Ignore clever messages with no content
    if (args.length === 0) return;

    // Create a new embed
    let question = new embed();
    question.setTitle("New Question");
    question.setDesc(args.join(' '));

    // Send to help channel
    bot.createMessage(config.helpChannel, question.asEmbed());
}