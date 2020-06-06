const mineflayer = require('mineflayer')
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../config.json');


module.exports = {
    name: 'help',
    description: 'Shows this menu',
    enabled: true,
    execute(message, args, bot) {
        try {
            let commandNames = [];
            let commandDescriptions = []

            if (!args.length) {
                let embed = new Discord.MessageEmbed()
                    .setColor(config.embedColor)
                    .setTitle("Help")
                    .setDescription(`
                **Categories**

                > Factions
                > Bot
                > Miscellaneous
                > Moderation
                `)
                    .setFooter(`Usage: ${JSON.parse(fs.readFileSync('./config.json')).prefix}help [Category]`);
                message.channel.send(embed);
                return;
            }

            switch (args[0].toLowerCase()) {
                case "factions": {
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Factions")
                        .forEach(cmd => commandNames.push(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)));
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Factions")
                        .forEach(cmd => commandDescriptions.push(cmd.description.charAt(0).toUpperCase() + cmd.description.slice(1)));
                    let embedHelp = new Discord.MessageEmbed()
                        .setTitle("Help - Factions")
                        .setColor(config.embedColor)
                        .addField("Commands⠀⠀⠀⠀⠀", commandNames, true)
                        .addField("Description", commandDescriptions, true);
                    message.channel.send(embedHelp);
                } break;
                case "bot": {
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Bot")
                        .forEach(cmd => commandNames.push(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)));
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Bot")
                        .forEach(cmd => commandDescriptions.push(cmd.description.charAt(0).toUpperCase() + cmd.description.slice(1)));
                    let embedHelp = new Discord.MessageEmbed()
                        .setTitle("Help - Bot")
                        .setColor(config.embedColor)
                        .addField("Commands⠀⠀⠀⠀⠀", commandNames, true)
                        .addField("Description", commandDescriptions, true);
                    message.channel.send(embedHelp);
                } break;
                case "moderation": {
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Moderation")
                        .forEach(cmd => commandNames.push(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)));
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Moderation")
                        .forEach(cmd => commandDescriptions.push(cmd.description.charAt(0).toUpperCase() + cmd.description.slice(1)));
                    let embedHelp = new Discord.MessageEmbed()
                        .setTitle("Help - Bot")
                        .setColor(config.embedColor)
                        .addField("Commands⠀⠀⠀⠀⠀", commandNames, true)
                        .addField("Description", commandDescriptions, true);
                    message.channel.send(embedHelp);
                } break;
                case "miscellaneous": {
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Miscellaneous")
                        .forEach(cmd => commandNames.push(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)));
                    message.client.commands
                        .filter(cmd => cmd.enabled === true && cmd.category === "Miscellaneous")
                        .forEach(cmd => commandDescriptions.push(cmd.description.charAt(0).toUpperCase() + cmd.description.slice(1)));
                    let embedHelp = new Discord.MessageEmbed()
                        .setTitle("Help - Miscellaneous")
                        .setColor(config.embedColor)
                        .addField("Commands⠀⠀⠀⠀⠀", commandNames, true)
                        .addField("Description", commandDescriptions, true);
                    message.channel.send(embedHelp);
                } break;
                default: {
                    let embed = new Discord.MessageEmbed()
                        .setDescription(`Invalid setting \`${args[0]}\`. Try again.`)
                        .setColor(config.embedColor);
                    message.channel.send(embed);
                }
            }
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', error.message)
            message.channel.send(`\`\`\`${error}\`\`\``).then(msg => {
                msg.delete({ timeout: 5000 })
            });;
        }
    },
}