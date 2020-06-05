const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'flist',
    description: 'Displays Factions List',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.flist,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /\bfactionless\b|\bonline\b/i;

            bot.chat("/f list");

            setTimeout(() => {
                saving.bool = false;
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedFlist = new Discord.MessageEmbed()
                    .setTitle("Faction list")
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedFlist);
                chatData.length = 0;
            }, 500);

        } catch (error) {
            console.log(error);
        }
    },
}