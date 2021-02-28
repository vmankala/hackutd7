exports.name = 'yesno';
exports.desc = 'Answer a y/n question';
exports.descLong = 'Get a randomly generated yes/no response to your questions!';
exports.usage = '[question]';
exports.visibility = 0;

exports.run = (bot, msg, args) => {
    let hash = 0;
    for (let i = 0; i < args.join(' ').length; i++) {
        hash = ((hash << 5) - hash) + args.join(' ').toLowerCase().charCodeAt(i) + 1;
        hash |= 0;
    }
    if (hash % 2 === 0)
        msg.addReaction('👍');
    else msg.addReaction('👎');
}