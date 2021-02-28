// Constructs a Discord embed

module.exports = class Embed {
    constructor(content) {
        this.content = content || {
            embed: {
                fields: []
            }
        }
    }

    asEmbed() {
        return this.content;
    }

    setTitle(title = '') {
        this.content.embed.title = title;
        return this;
    }

    setDesc(desc = '') {
        this.content.embed.description = desc;
        return this;
    }

    setColor(color = 0) {
        this.content.embed.color = color;
        return this;
    }

    setAuthor(name = '', icon) {
        this.content.embed.author = {};
        if (name) this.content.embed.author.name = name;
        if (icon) this.content.embed.author.icon_url = icon;
        return this;
    }

    setFooter(foot = '') {
        this.content.embed.footer = {};
        this.content.embed.footer.text = foot;
        return this;
    }

    addField(name = '', value = '', inline = false) {
        this.content.embed.fields.push({
            name: name,
            value: value,
            inline: inline
        });
        return this;
    }
}