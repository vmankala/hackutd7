const Embed = require('../utils/embed');
const axios = require('axios');

exports.name = 'define'
exports.desc = 'Defines a word';
exports.descLong = 'Get the definition and pronunciation for a provided word.';
exports.usage = '<word>';
exports.visibility = 0;

exports.run = (bot, msg, args) => {
    // Ignore messages with no content
    if (args.length === 0) return;

    // Make a GET request to Dictionary API
    axios.get('https://api.dictionaryapi.dev/api/v2/entries/en_US/' + args.join(' ')).then(res => {
        let def = new Embed();
        def.setTitle(res.data[0].word);
        res.data[0].meanings.forEach(meaning => {
            def.addField(meaning.partOfSpeech, meaning.definitions[0].definition);
        });
        bot.createMessage(msg.channel.id, def.asEmbed());
    }).catch(err => {
        bot.createMessage(msg.channel.id, '`Syntax Error`');
        console.log(err);
    });
}