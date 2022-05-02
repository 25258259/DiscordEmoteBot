module.exports = {
    name: 'reactionOnReaction',
    description: 'There you can find reaction-dependent actions',
    execute(reaction, user, consoleParentChannel, voiceParentChannel, usersWithConsoles, commands){

        const fs = require('fs')
        const { MessageEmbed } = require('discord.js')

        const helloMessage = new MessageEmbed();

        helloMessage.setTitle(`Hello ${user.username}, these are the commands that you can use to edit your channels. In case of problems, contact the administration.`)
            .setColor(0xf917cc)
        
            commands.forEach(element => {
            if(element.name !== 'reactionOnReaction')
                if(element.name !== 'engageMessage')
                    if(element.name !== 'deleteConnection'){
                        helloMessage.addField('!' + element.name, element.description, false)
                    }
        })
            
        if(reaction.message.channel.id === '705139534383546418'){
            if(reaction.emoji.name === '💯' && usersWithConsoles["usersIds"][user.id] === undefined ){
                let guild = reaction.message.guild
                let voiceChannelId = ''

                guild.channels.create("It's your voice channel",
                    {
                        type: 'voice',
                        permissionOverwrites: [
                            {
                                id: user.id,
                                allow: ["ADMINISTRATOR","VIEW_CHANNEL"]
                            },
                            {
                                id: guild.id,
                                deny: "VIEW_CHANNEL"
                            }
                        ],
                        parent: voiceParentChannel
                    }
                ).then(channel =>{
                    voiceChannelId = channel.id
                })

                guild.channels.create("It's console to your channel",
                {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["ADMINISTRATOR","VIEW_CHANNEL"]
                        },
                        {
                            id: guild.id,
                            deny: "VIEW_CHANNEL"
                        }
                    ],
                    parent: consoleParentChannel
                }).then(channel => {
                    let consoleChannelId = channel.id
                  
                    channel.send(helloMessage)

                    usersWithConsoles["usersIds"][user.id] = {
                        "voiceChannelId": voiceChannelId,
                        "textChannelId": consoleChannelId
                    }

                    fs.writeFile("./msgs.json", JSON.stringify(usersWithConsoles, null, 4), err => {
                        if(err) throw err
                        console.log('Data written.')
                    })
                })
            }
        }
    }
}