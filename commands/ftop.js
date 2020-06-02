const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'ftop',
    description: 'ftop',
    execute(message, args, bot) {
        try {
            
            let startArgs = ["_____", "-----", "Faction"];
            let endArgs = ["Data is cached", "Tracking", "-----", "DISCLAIMER"];
            let chatData = [];
            let sending = false;

            bot.chat(config.FtopCommand);

            bot.on("message", msg => {
                let parsedMsg = `${msg}`;
                if (new RegExp(startArgs.join("|")).test(parsedMsg) && sending === false) {
                    chatData.push(`${msg}`);
                    sending = true;
                }
                else if (new RegExp(endArgs.join("|")).test(parsedMsg) && !parsedMsg.charAt(0).match(/[1-9#]/)){
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
                let embedFtop = new Discord.MessageEmbed()
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