module.exports = {
    name: 'chtn',
    description: 'Command to change text channel name. You can use this option only 2 times',
    async execute(message, args){
        await message.guild.channels.cache.get(message.channel.id).setName(args[0])
    }
}