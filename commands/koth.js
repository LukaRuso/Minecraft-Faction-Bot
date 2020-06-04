const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'koth',
    description: 'koth',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.koth,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /\bkoth\b/i;

            bot.chat(`/koth`)

            setTimeout(() => {
                saving.bool = false
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedFshow = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedFshow);
                chatData.length = 0;
            }, 500);
        } catch (error) {
            console.log(error);
        }
    },
}