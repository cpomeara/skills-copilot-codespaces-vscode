function skillsmember() { 
    return {
        name: "member",
        description: "Get the member count of the server.",
        category: "Server",
        execute: async function (message, args, client) {
            const memberCount = message.guild.memberCount;
            message.channel.send(`This server has ${memberCount} members`);
        }
    }
}
