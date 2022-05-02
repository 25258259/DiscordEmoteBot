const Discord = require('discord.js')
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]})

const token = 'NzUyOTE0ODIwNDg2OTIyMzIx.X1ekkQ.35k-xzkoJe1PAP94LslOkYA5jIk'
const prefix = '!'

const fs = require('fs')
client.msgs = require('./msgs.json')

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./mainFunctions/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./mainFunctions/${file}`)
    client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log('Admin is logged')
})

client.on('message', async message => {

    if(!message.content.startsWith(prefix) || message.author.bot)
        return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === 'start' && message.channel.id === '705139534383546418')
        client.commands.get('engageMessage').execute(message, args)
    else if(command === 'end' && message.channel.id === '705139534383546418')
        client.commands.get('deleteConnection').execute(message, args)

    //Channel commands
    if(message.channel.id === client.msgs["usersIds"][message.author.id].textChannelId){
        switch(command){
            case 'chtn':
                if(message.channel.partial)
                    message.channel.fetch()
                client.commands.get('chtn').execute(message, args)
                break
            case 'add':
                client.commands.get('add').execute(message, args, client.msgs["usersIds"][message.author.id]['voiceChannelId'])
                break
            case 'del':
                client.commands.get('del').execute(message, args, client.msgs["usersIds"][message.author.id]['voiceChannelId'])
                break
            case 'help':
                client.commands.get('help').execute(message.channel, client.commands)
                break
            case 'chvn':
                client.commands.get('chvn').execute(message, args, client.msgs["usersIds"][message.author.id]['voiceChannelId'])
        }
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    let guildens = reaction.message.guild
    
    if(reaction.message.partial) await reaction.message.fetch()
    if(reaction.partial) await reaction.fetch()
    if(user.bot) return
    if(!guildens) return

    if(!guildens.channels.cache.find(channel => channel.name === 'Consoles')){
        await guildens.channels.create('Consoles',{
            type: 'category'
        })
    }

    if(!guildens.channels.cache.find(channel => channel.name === 'Voice Channels')){
        await guildens.channels.create('Voice Channels',{
            type: 'category'
        })
    }

    consoleParentChannel = guildens.channels.cache.find(channel => channel.name === 'Consoles').id
    voiceParentChannel = guildens.channels.cache.find(channel => channel.name === 'Voice Channels').id

    await client.commands.get('reactionOnReaction').execute(reaction, user, consoleParentChannel, voiceParentChannel, client.msgs, client.commands)
})

client.login(token)