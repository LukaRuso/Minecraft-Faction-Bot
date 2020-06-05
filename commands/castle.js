const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'castle',
    description: 'Displays information about Castle',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.castle,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /^\bCastle\b|^\bControlled\b/i;

            bot.chat(`/castle`)

            setTimeout(() => {
                saving.bool = false;
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedCastle = new Discord.MessageEmbed()
                    .setTitle("Castle Information")
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedCastle);
                chatData.length = 0;

            }, 500);
        } catch (error) {
            console.log(error);
        }
    },
}