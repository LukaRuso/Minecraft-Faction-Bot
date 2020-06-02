const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'rpost',
    aliases: ['raidingoutpost', 'raidingpost'],
    description: 'rpost',
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