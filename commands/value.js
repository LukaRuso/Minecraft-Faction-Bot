const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'value',
    category: "Factions",
    description: 'Shows the value of specified faction',
    enabled: true,
    execute(message, args, bot, chatData, saving, regex) {

        regex.regex = args[0].toLowerCase();
        saving.hover = true;
        
        bot.chat("/f top");
        bot.chat("/f top 2");
        bot.chat("/f top 3");
        bot.chat("/f top 4");
        bot.chat("/f top 5");
        bot.chat("/f top 6");
        bot.chat("/f top 7");
        

        
        setTimeout(() => {
            saving.hover = false;
            if (!chatData.length) {
                chatData[0] = "No Value";
            }
            let embedFshield = new Discord.MessageEmbed()
                .setTitle("Value")
                .setColor(config.embedColor)
                .setDescription(`\`\`\`${chatData.join("\n").replace(/(§c)|(§f)|(§l)|(§e)|(§7)|(§o)|(§r)|(§d)/g, "")}\`\`\``);
            message.channel.send(embedFshield);
            chatData.length = 0;
        }, 500);
    },
}