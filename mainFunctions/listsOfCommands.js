module.exports = {
    name: 'help',
    description: 'This is commands that lists all other commands with their descriptions',
    async execute(channel, commands){
        const { MessageEmbed } = require('discord.js')

        const helpMessage = new MessageEmbed();
        helpMessage.setTitle('Commands list: ')
            .setDescription(this.description)
            .setColor(0xf917cc)
    
        commands.forEach(element => {
            if(element.name !== 'reactionOnReaction')
                if(element.name !== 'engageMessage')
                    if(element.name !== 'deleteConnection')
                        if(element.name !== 'Hello member'){
                            helpMessage.addField('!' + element.name, element.description, false)
                        }
        });

        await channel.send(helpMessage)
    }
}