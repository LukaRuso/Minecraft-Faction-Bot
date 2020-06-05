<<<<<<< HEAD
const Discord = require("discord.js");
const fs = require('fs');
let config = require('../config.json');

module.exports = {
    name: 'settings',
    description: 'settings [args]',
    enabled: true,
    execute(message, args, bot) {
        try {
            let option;
            let changed = false, reload = false;
            if (!args.length) {
                args[0] = "";
            }
            let exists = false;
            switch (args[0].toLowerCase()) {
                case "enable": {
                    if (args[1]) {

                        for (element in config.enableCommands) {
                            if (element.toLowerCase() == args[1].toLowerCase()) {
                                exists = true;
                                option = element;
                            }
                        }
                        if (exists) {
                            let embed = new Discord.MessageEmbed()
                                .setColor(config.embedColor)
                                .setDescription(`Enabled command ${config.prefix}${option.toUpperCase()}`)
                            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            config.enableCommands[option] = true;
                            changed = true;
                            reload = true;

                        }
                        else {
                            let embed = new Discord.MessageEmbed()
                                .setTitle("Enable Command")
                                .setColor(config.embedColor)
                                .setDescription(`\`\`\`Couldn't find ${config.prefix}${option}\`\`\``)
                            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                        }
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setColor(config.embedColor)
                            .setTitle("Usage")
                            .setDescription(`${config.prefix}settings enable [command]`);
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                } break;

                case "disable": {
                    for (element in config.enableCommands) {
                        if (element.toLowerCase() == args[1].toLowerCase()) {
                            exists = true;
                            option = element;
                        }
                    }
                    if (exists) {
                        let embed = new Discord.MessageEmbed()
                            .setColor(config.embedColor)
                            .setDescription(`\`\`\`Disabled command ${config.prefix}${option.toUpperCase()}\`\`\``)
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                        config.enableCommands[option] = false;
                        changed = true;
                        reload = true;
                    }
                    else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Disable Command")
                            .setColor(config.embedColor)
                            .setDescription(`Couldn't find ${config.prefix}${option}`)
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                } break;

                case "commands": {
                    let commands = JSON.stringify(config.enableCommands, null, 2);
                    commands = commands.replace(/["{},:]/g, "");
                    commands = commands.split("\n");
                    commands.pop();
                    commands.shift();
                    let titles = [];
                    let enabled = [];
                    commands.forEach(element => {
                        titles.push(`${config.prefix}${element.split(" ")[2].toUpperCase()}`);
                    });
                    commands.forEach(element => {
                        enabled.push(`${element.split(" ")[3].charAt(0).toUpperCase() + element.split(" ")[3].slice(1)}`);
                    });
                    let embed = new Discord.MessageEmbed()
                        .addField("Command", titles, true)
                        .addField("Enabled", enabled, true)
                        .setTitle("Commands")
                        .setColor(config.embedColor)
                    message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
                } break;
                case "prefix": {
                    for (element in config){
                        if (element == "prefix"){
                            config[element] = args[1];
                            changed = true;
                            require('../index').prefix.value = args[1];
                        }
                    }
                }break;

                default: {
                    message.channel.send("err");
                }
            }
            if (changed) {
                fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                if (reload) {
                    let command = [option];
                    require('./reload').execute(message, command);
                }

            }

        } catch (error) {
            console.log(error);
        }
    },
=======
const Discord = require("discord.js");
const fs = require('fs');
let config = require('../config.json');

module.exports = {
    name: 'settings',
    description: 'settings [args]',
    enabled: true,
    execute(message, args, bot) {
        try {
            let option;
            let changed = false, reload = false;
            if (!args.length) {
                args[0] = "";
            }
            let exists = false;
            switch (args[0].toLowerCase()) {
                case "enable": {
                    if (args[1]) {

                        for (element in config.enableCommands) {
                            if (element.toLowerCase() == args[1].toLowerCase()) {
                                exists = true;
                                option = element;
                            }
                        }
                        if (exists) {
                            let embed = new Discord.MessageEmbed()
                                .setColor(config.embedColor)
                                .setDescription(`Enabled command ${config.prefix}${option.toUpperCase()}`)
                            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                            config.enableCommands[option] = true;
                            changed = true;
                            reload = true;

                        }
                        else {
                            let embed = new Discord.MessageEmbed()
                                .setTitle("Enable Command")
                                .setColor(config.embedColor)
                                .setDescription(`\`\`\`Couldn't find ${config.prefix}${option}\`\`\``)
                            message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                        }
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setColor(config.embedColor)
                            .setTitle("Usage")
                            .setDescription(`${config.prefix}settings enable [command]`);
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                } break;

                case "disable": {
                    for (element in config.enableCommands) {
                        if (element.toLowerCase() == args[1].toLowerCase()) {
                            exists = true;
                            option = element;
                        }
                    }
                    if (exists) {
                        let embed = new Discord.MessageEmbed()
                            .setColor(config.embedColor)
                            .setDescription(`\`\`\`Disabled command ${config.prefix}${option.toUpperCase()}\`\`\``)
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                        config.enableCommands[option] = false;
                        changed = true;
                        reload = true;
                    }
                    else {
                        let embed = new Discord.MessageEmbed()
                            .setTitle("Disable Command")
                            .setColor(config.embedColor)
                            .setDescription(`Couldn't find ${config.prefix}${option}`)
                        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }));
                    }
                } break;

                case "commands": {
                    let commands = JSON.stringify(config.enableCommands, null, 2);
                    commands = commands.replace(/["{},:]/g, "");
                    commands = commands.split("\n");
                    commands.pop();
                    commands.shift();
                    let titles = [];
                    let enabled = [];
                    commands.forEach(element => {
                        titles.push(`${config.prefix}${element.split(" ")[2].toUpperCase()}`);
                    });
                    commands.forEach(element => {
                        enabled.push(`${element.split(" ")[3].charAt(0).toUpperCase() + element.split(" ")[3].slice(1)}`);
                    });
                    let embed = new Discord.MessageEmbed()
                        .addField("Command", titles, true)
                        .addField("Enabled", enabled, true)
                        .setTitle("Commands")
                        .setColor(config.embedColor)
                    message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
                } break;
                case "prefix": {
                    for (element in config){
                        if (element == "prefix"){
                            config[element] = args[1];
                            changed = true;
                        }
                    }
                }

                default: {
                    message.channel.send("err");
                }
            }
            if (changed) {
                fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                if (reload) {
                    let command = [option];
                    require('./reload').execute(message, command);
                }

            }

        } catch (error) {
            console.log(error);
        }
    },
>>>>>>> 0924650fc39f6ed1f2a84d4ecec3943316294c1b
}