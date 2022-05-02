module.exports = {
    name: "del",
    description: 'To delete person from your channel write !del [name of that person]',
    execute(message, args, channelId){
        
        let member = 'none'
        message.guild.members.cache.some(user => {
            if(user.user.username === args[0])
                member = user.user
        })
        if(member === message.author)
            return
        
        if(member !=='none'){
            message.guild.channels.cache.some(channel => {
                if(channel.id == channelId)
                channel.updateOverwrite(member,
                    {
                        VIEW_CHANNEL: false,
                        SPEAK:false
                    }
                )
            })
        } else
            message.channel.send('Wrong username')
    }
}