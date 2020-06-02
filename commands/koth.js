const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'koth',
    description: 'koth',
    execute(message, args, bot) {
        try {
            
            let regex = /\bkoth\b/i;
            let sending = false;
            let chatData = [];

            if (!args.length) args[0] = "";
            bot.chat(`/koth`)

            bot.on("message", msg => {
                let parsedMsg = `${msg}`;
                if (parsedMsg.match(regex)){
                    chatData.push(`${msg}`);
                }
            })

            setTimeout(() => {
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