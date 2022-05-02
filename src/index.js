const tmi = require("tmi.js");
const fs = require("fs");

const config = require("./config.json");
const utils = require("./utils");

const client = new tmi.Client({
	options: { debug: false /* config.debugMode */, messagesLogLevel: "info", clientId: config.clientId },
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: "jojorect",
		password: "oauth:" + config.clientToken,
	},
	channels: ["#subolamayanpleb"],
});

client.commands = new Set();
client.aliases = new Set();

const commands = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"));

if (commands.length < 1) utils.log("({#ffd800:Warn}) There is no commands to load.");
else {
	utils.log(`({#409DE0:Info}) Loading {#ffff66:${commands.length}} command(s)`);

	commands.forEach((cmd) => {
		let command = require(`./commands/${cmd}`);
		command.name = cmd.split(".")[0];

		client.commands[command.name] = command;

		command.aliases.forEach((alias) => {
			client.aliases[alias] = command;
		});

		utils.log(`({#00cc66:Done}) ${command.name} loaded!`);
	});
}

const listeners = fs.readdirSync("./listeners").filter((f) => f.endsWith(".js"));

if (listeners.length <= 0) utils.log("({#ffd800:Warn}) There is no event listeners to load.");
else {
	utils.log(`({#409DE0:Info}) Loading {#ffff66:${listeners.length}} event listener(s)`);

	listeners.forEach((file) => {
		const listener = require(`./listeners/${file}`);
		const event = file.split(".")[0];
		client.on(event, (...args) => listener(client, ...args));

		utils.log(`({#00cc66:Done}) ${file} loaded!`);
	});
}

client
	.connect()
	.then(() => {
		process.title = client.getUsername();
		require("./test")(client);
	})
	.catch(() => {
		utils.log(`({#8d1a1a:Error}) ${err}`, true);
		process.disconnect();
		process.exit();
	});
