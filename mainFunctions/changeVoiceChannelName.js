const { Guild } = require("discord.js")

module.exports = {
    name: "chvn",
    description: "To change your voice channel name type !chvn [your name]. You can do that only 2 times",
    execute(message, args, voiceChannelId){
        message.guild.channels.cache.get(voiceChannelId).setName(args[0])
    }
}