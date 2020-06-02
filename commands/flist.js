const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'flist',
    description: 'flist',
    execute(message, args, bot) {
        try {
            
            let startArgs = ["_____", "-----"];
            let regex = /\//;
            let chatData = [];
            let sending = false;

            bot.chat("/f list");

            bot.on("message", msg => {
                let parsedMsg = `${msg}`;
                if ((new RegExp(startArgs.join("|")).test(parsedMsg) && sending === false) || parsedMsg.match(/\bfactionless\b|\bonline.\b/i)){
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
                let embedFtop = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setDescription(`\`\`\`${chatData.join('\n')}\`\`\``);
                message.channel.send(embedFtop);
                chatData.length = 0;
            }, 500);

        } catch (error) {
            console.log(error);
        }
    },
}