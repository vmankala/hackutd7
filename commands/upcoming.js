const Embed = require('../utils/embed.js');
const config = require('../config.json');

exports.name = 'upcoming'
exports.desc = 'Check upcoming assignments';
exports.descLong = 'Check the list of upcoming assignments posted by your professor';
exports.usage = '';
exports.visibility = 0;

exports.run = (bot, msg, args) => {
    // Create a new embed
    let assignments = new Embed();
    assignments.setTitle("Assignment List");
    bot.assignments.forEach(assignment => {
        assignments.addField(new Date(assignment[2]).toLocaleDateString() + ': ' + assignment[0], assignment[1])
    });

    // Send to help channel
    bot.createMessage(config.helpChannel, assignments.asEmbed());
}