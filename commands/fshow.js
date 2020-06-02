const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'fshow',
    aliases: ['show', 'fwho'],
    description: 'fshow',
    execute(message, args, bot) {
        try {
            
            let startArgs = ["_____", "-----"];
            let regex = /[:|*+,-]|\bnone\b/i;
            let sending = false;
            let chatData = [];

            if (!args.length) args[0] = "";
            bot.chat(`/f show ${args[0]}`)

            bot.on("message", msg => {
                let parsedMsg = `${msg}`;
                if (new RegExp(startArgs.join("|")).test(parsedMsg) && sending === false){
                    chatData.push(`${msg}`);
                    sending = true;
                }
                else if (!parsedMsg.match(regex) && sending === true){
                    sending = false;
                }
                else if (sending === true){
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

            }, 750);
        } catch (error) {
            console.log(error);
        }
    },
}