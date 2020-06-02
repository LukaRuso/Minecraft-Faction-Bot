const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'restart',
    description: 'restart',
    execute(message, args, bot) {
        try {
            process.exit(1);
        } catch (error) {
            console.log(error);
        }
    },
}