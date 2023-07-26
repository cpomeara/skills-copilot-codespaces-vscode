// Create web server
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile('./index.html');
});
app.post('/api', (req, res) => {
    const body = req.body;
    const memberCount = body.guild.memberCount;
    res.send({ memberCount: memberCount });
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// Create discord client
const client = new discord_js_1.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', async (message) => {
    // Ignore messages from bots
    if (message.author.bot)
        return;
    // Ignore messages not starting with prefix
    if (!message.content.startsWith(prefix))
        return;
    // Remove prefix from command and split into args
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    // Get command from command map
    const command = commands.get(args[0]);
    // Ignore unknown commands
    if (!command)
        return;
    try {
        // Execute command
        await command.execute(message, args, client);
    }
    catch (error) {
        // Send error message
        message.channel.send(`Error executing command: ${error}`);
    }
});
client.login(token);
//# sourceMappingURL=index.js.map