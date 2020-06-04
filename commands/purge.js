const config = require('../config.json')
const fs = require('fs');
module.exports = {
    name: 'purge',
    description: 'runcmd [message]',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.purge,
    execute(message, args, bot, sending, chatData, startArg, endArgs) {
        try {
            let amount;
            if (!args.length) {
                amount = 10;
            }
            else {
                amount = parseInt(args[0]) + 1;
            }
            message.channel.messages.fetch(amount).then(msgs => message.channel.bulkDelete(msgs));
        } catch (error) {
            console.log(error);
        }
    },
}