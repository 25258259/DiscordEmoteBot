module.exports = {
    name: 'deleteConnection',
    description: 'Closing connection',
    execute(message, userTickets, args){
        if(userTickets.has(message.author.id)){
            if(message.channel.id === userTickets.get(message.author.id))
            {
                message.channel.delete('closing ticket')
                .then( () => {
                    userTickets.delete(messgae.author.id)
                })
                .catch(err => console.log(err))
            }
        }
    }
}