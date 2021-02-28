const Embed = require('../utils/embed');

exports.name = 'help';
exports.desc = 'Open this help menu';
exports.descLong = 'Opens a help menu containing all bot commands. Alternatively provides detailed information for a command passed as an argument.'
exports.usage = '[command]';
exports.visibility = 1; // visibility levels: 0 = visible on both help menus, 1 = visible only on detailed help, 2 = hidden from help menu 

exports.run = (bot, msg, args) => {
    // Create help embed
    let help = new Embed();

    // Create the main help menu
    if (args.length === 0) {
        help.setTitle('Help Menu').setAuthor(bot.user.username, bot.user.avatarURL).setFooter(bot.config.prefix + 'help <cmd> for detailed info');
    
        bot.commands.forEach(cmd => {
            if (cmd.visibility === 0)
                help.addField(cmd.name, cmd.desc);
        });

        bot.createMessage(msg.channel.id, help.asEmbed()); // Send the help message with embed
        
    } else if (bot.commands.has(args[0]) && bot.commands.get(args[0]).visibility <= 1) { // Create the detailed help menu
        const cmd = bot.commands.get(args[0]);
        help.setTitle(bot.config.prefix + cmd.name).setDesc(cmd.descLong).addField('Usage', '`' + bot.config.prefix + cmd.name + (cmd.usage ? ' ' : '') + cmd.usage + '`');

        bot.createMessage(msg.channel.id, help.asEmbed()); // Send the help message with embed
    }
}