const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'raredrop',
    aliases: ['td', 'treasuredrop'],
    description: 'raredrop',
    execute(message, args, bot) {
        try {
            
            let startArgs = ["-----"];
            let endArgs = ["-----"];
            let chatData = [];
            let sending = false;

            bot.chat("/td");

            bot.on("message", msg => {
                let parsedMsg = `${msg}`;
                if (new RegExp(startArgs.join("|")).test(parsedMsg) && sending === false) {
                    chatData.push(`${msg}`);
                    sending = true;
                }
                else if (new RegExp(endArgs.join("|")).test(parsedMsg)){
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