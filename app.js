const eris = require('eris');
const config = require('./config.json');

// Create bot from token
const bot = new eris(config.token);
bot.config = config;

const fs = require('fs');

// cleverbot memory
bot.memory = [];
bot.assignments = [];

// File-based commands concept from: https://anidiots.guide/first-bot/a-basic-command-handler

// Load all events from the events directory
fs.readdir('./events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return; // Each .js file represents the procedure for each eris event
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)]; // Remove the Node.js cache of this require
    });
});

// Load all commands from the commands directory
bot.commands = new Map();
fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return; // Each .js file represents a command script
        let cmd = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`Loading command ${cmdName}`);
        bot.commands.set(cmdName, cmd); // Add to list
    });
});

bot.connect();