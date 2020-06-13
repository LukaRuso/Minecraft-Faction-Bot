const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'raredrop',
    aliases: ['td', 'treasuredrop'],
    category: 'Factions',
    description: 'Shows information about upcoming rare drop',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.raredrop,
    execute(message, args, bot, chatData, saving, regex) {

        saving.chat = true;
        regex.regex = /\bdrop\b|\blocation\b|\btype\b/i;

        bot.chat("/td");

        setTimeout(() => {
            saving.chat = false;
            if (!chatData.length) {
                chatData[0] = "Try Again";
            }
            let embedRaredrop = new Discord.MessageEmbed()
                .setTitle("Rare Drop Information")
                .setColor(config.embedColor)
                .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
            message.channel.send(embedRaredrop);
            chatData.length = 0;
        }, 250);
    },
}