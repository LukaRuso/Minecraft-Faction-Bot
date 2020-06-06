const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'ftop',
    category: 'Factions',
    description: 'Displays Faction Top Ranking',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.ftop,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /^[1-9#]/i;

            bot.chat(config.FtopCommand);

            setTimeout(() => {
                saving.bool = false;
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedFtop = new Discord.MessageEmbed()
                    .setTitle("Faction Top")
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedFtop);
                chatData.length = 0;
            }, 250);

        } catch (error) {
            console.log(error);
        }
    },
}