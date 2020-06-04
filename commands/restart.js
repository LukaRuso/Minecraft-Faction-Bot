const nodemon = require('nodemon');
const fs = require('fs');
module.exports = {
    name: 'restart',
    aliases: ['rs'],
    description: 'rpost',
    enabled: true,
    execute(message, args, bot, chatData, saving, regex) {
        try {
            nodemon.restart();
        } catch (error) {
            console.log(error);
        }
    },
}