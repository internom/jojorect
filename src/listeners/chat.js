const utils = require("../utils");
const config = require("../config.json");

module.exports = async (client, channel, author, content) => {
	const prefix = config.prefix;

	let msgArray = content.split(" ");
	let cmd, args;

	if (content.startsWith(prefix)) {
		cmd = msgArray[0].toLowerCase().slice(prefix.length);
		args = msgArray.slice(1);
	} else if (config.mentionPrefix && msgArray[0] === `@${client.getUsername()}`) {
		if (msgArray[1]) {
			cmd = msgArray[1].toLowerCase();
			args = msgArray.slice(2);
		}
	}

	let command = client.commands[cmd] || client.aliases[cmd];
	if (command) command.execute(client, channel, author, args);

	if (config.debugMode) {
		const randomHex = utils.randomHex();
		utils.log(
			`({${randomHex}:${channel}}) <{${author.color || utils.randomHex()}:${
				author["display-name"]
			}}>: ${content}`,
			true
		);
	}
};
