module.exports = {
    name: 'engageMessage',
    description: 'Sending message',
    async execute(message){
        const { MessageEmbed } = require('discord.js')

        const startMessage = new MessageEmbed();
        startMessage.setTitle('Hi')
                    .setDescription('Add reaction')
                    .setColor('GREEN')
                    .setFooter('siema to footer')

        let msgEmbed = await message.channel.send(startMessage)
        msgEmbed.react('💯')
    }
}