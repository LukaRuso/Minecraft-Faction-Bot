const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'forcefield',
    aliases: ['shield'],
    category: "Factions",
    description: 'Shows the shield information of a faction',
    enabled: true,
    execute(message, args, bot, chatData, saving, regex) {
        regex.regex = /\bForcefield\b/ig;
        saving.hover = true;
        bot.chat("/f show " + args[0]);
    
        
        setTimeout(() => {
            saving.hover = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
            }
            let embedFshield = new Discord.MessageEmbed()
                .setTitle("Forcefield")
                .setColor(config.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join("\n").replace(/(§c)|(§f)|(§l)|(§e)/g, "")}\`\`\``);
            message.channel.send(embedFshield);
            chatData.chat.length = 0;
        }, 500);
    },
}