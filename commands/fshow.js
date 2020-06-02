const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'fshow',
    aliases: ['show', 'fwho'],
    description: 'fshow',
    execute(message, args, bot, chatData, saving, regex) {
        try {
            
            saving.bool = true;
            regex.regex = /[:|*+,-]|\bnone\b|(\_)\1+/i;

            if (!args.length) args[0] = "";
            bot.chat(`/f show ${args[0]}`)

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

            }, 750);
        } catch (error) {
            console.log(error);
        }
    },
}