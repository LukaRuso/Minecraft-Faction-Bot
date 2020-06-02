const fs = require("fs");
const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const config = require("./config.json")
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const client = new Discord.Client();
client.commands = new Discord.Collection();

var prefix = config.prefix;
let chatData = [];
let saving = { bool: false };
let regex = { regex: new RegExp() };

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let options = {
    version: config.serverVersion,
    host: config.serverIP,
    username: config.email,
    password: config.password
};

var bot = mineflayer.createBot(options);

bot.loadPlugin(tpsPlugin);

client.on("ready", async => {
    console.log("Logged in as " + client.user.tag);
});
bot.on("login", async => {
    console.log("Logged onto the server as " + bot.username);
    bot.chat(config.realmCommand);
});

bot.on("Kicked", async => {
    bot = mineflayer.createBot(options);
})

bot.on("message", msg => {
    console.log(`${msg}`);
    let parsedMsg = `${msg}`;
    if (parsedMsg.match(regex.regex) && !parsedMsg.includes("(!) Vanity") && saving.bool === true) {
        chatData.push(`${msg}`);
    }
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    try {
        command.execute(message, args, bot, chatData, saving, regex);
        message.delete();
    } catch (err) {
        message.channel.send(`\`\`\`${err}\`\`\``).then(msg => {
            msg.delete({ timeout: 3000 })
        });;
    }
});

client.login(config.token).catch(console.error);