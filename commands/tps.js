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
        try {
            let embedFshow = new Discord.MessageEmbed()
                .setTitle("Current TPS")
                .setColor(config.embedColor)
                .setDescription(`\`\`\`${bot.getTps()}\`\`\``);
            message.channel.send(embedFshow);
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            message.channel.send(`\`\`\`${error}\`\`\``).then(msg => {
                msg.delete({ timeout: 5000 })
            });;
        }
    },
}