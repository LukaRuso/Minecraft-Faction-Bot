const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'flist',
    description: 'flist',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.flist,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /\/|(\_)\1+|(\-)\1+|\bfactionless\b|\bonline.\b/i;

            bot.chat("/f list");

            setTimeout(() => {
                saving.bool = false;
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedFtop = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedFtop);
                chatData.length = 0;
            }, 500);

        } catch (error) {
            console.log(error);
        }
    },
}