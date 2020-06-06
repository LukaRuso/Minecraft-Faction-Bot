const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'sudo',
    description: 'Will run specified command in game',
    category: "Bot",
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.sudo,
    execute(message, args, bot) {
        try {
            let chatData = [];
            let sending = true;

            bot.chat(args.join(" "));
            bot.on("message", msg => {
                let parsedMsg = `${msg}`;
                if (sending == true) {
                    chatData.push(`${msg}`);
                }
            })
            setTimeout(() => {
                if (!chatData.length) {
                    chatData[0] = "Try Again";
                }
                let embedSudo = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedSudo);
                chatData.length = 0;
            }, 500);
        } catch (error) {
            console.log(error);
        }
    },
}