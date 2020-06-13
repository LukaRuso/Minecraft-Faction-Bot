const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'TPS',
    aliases: ['tps'],
    category: "Factions",
    description: 'Shows current TPS of the server',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.tps,
    execute(message, args, bot) {
        let embedFshow = new Discord.MessageEmbed()
            .setTitle("Current TPS")
            .setColor(config.embedColor)
            .setDescription(`\`\`\`${bot.getTps()}\`\`\``);
        message.channel.send(embedFshow);
    },
}