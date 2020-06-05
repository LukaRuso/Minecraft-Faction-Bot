const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'rpost',
    aliases: ['raidingoutpost', 'raidingpost'],
    description: 'rpost',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.rpost,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /\braiding outpost\b/i;

            bot.chat(`/rpost`)

            setTimeout(() => {
                saving.bool = false;
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedRpost = new Discord.MessageEmbed()
                    .setTitle("Raiding Outpost Information")
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedRpost);
                chatData.length = 0;

            }, 500);
        } catch (error) {
            console.log(error);
        }
    },
}