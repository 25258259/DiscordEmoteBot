const { Role } = require("discord.js")

module.exports = {
    name: "add",
    description: 'To add person to your channel write !add [name of that person]',
    execute(message, args, channelId){

        let member = 'none'
        message.guild.members.cache.some(user => {
            if(user.user.username === args[0])
                member = user.user
        })

        if(member !== 'none'){
            message.guild.channels.cache.some(channel => {
                if(channel.id == channelId){
                    channel.updateOverwrite(member, 
                        {
                            VIEW_CHANNEL: true,
                            SPEAK: true
                        }
                    )
                }
            })
        } else
            message.channel.send('Wrong input')
        
    }
}