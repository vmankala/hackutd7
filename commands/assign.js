const Embed = require('../utils/embed.js');
const config = require('../config.json');

exports.visibility = 2;

exports.run = (bot, msg, args) => {
    // Ignore messages with no content
    if (args.length === 0) return;

    // Get params
    params = args.join(' ').match(/"(?:\.|(\\\")|[^\""\n])*"/g);
    params[0] = params[1].substring(1).slice(0, -1);
    params[1] = params[1].substring(1).slice(0, -1);
    params[2] = Date.parse(params[2]);

    bot.assignments.push(params);
    bot.assignments.sort((a,b) => {
        return a[2] - b[2];
    });

    // Send to channel
    let confirm = new Embed();
    confirm.setDesc(':white_check_mark:  **Assigned ' + params[0] + '**');
    bot.createMessage(config.helpChannel, confirm.asEmbed());
}