module.exports = (bot, msg) => {
    // Ignore messages from non-owners when in devMode
    if (bot.config.devMode && msg.author.id !== bot.config.ownerID) return;

    // Ignore bots (including itself)
    if (msg.author.bot) return;

    // Ignore messages without prefix except to randomly reply as cleverbot
    if (msg.content.substring(0, bot.config.prefix.length) !== bot.config.prefix && Math.random() < 0.01) 
        bot.commands.get('clever').run(bot, msg, msg.content.trim().split(/ +/g));
    else if (msg.content.substring(0, bot.config.prefix.length) !== bot.config.prefix) return;

    // Special case for clever command - allow empty prefix syntax
    let clever;
    if (msg.content.substring(bot.config.prefix.length, bot.config.prefix.length + 1) === ' ')
        clever = msg.content.replace(bot.config.prefix + ' ', bot.config.prefix + 'clever ').slice(bot.config.prefix.length).trim().split(/ +/g);

    // Extract arguments and command name from message
    const args = clever || msg.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const cmd = bot.commands.get(cmdName);

    // Command not found
    if (!cmd) return;

    // Command found, run it
    cmd.run(bot, msg, args);
};