const utils = require("../utils");
const config = require("../config.json");

let waiting = false;

module.exports = {
	dmAllowed: true,
	secret: true,

	async execute(client, channel, author, args) {
		if (!waiting) {
			waiting = true;
			client.action(channel, "Instagram: melihpaff\n https://www.instagram.com/melihpaff");
			await utils.sleep(15 * 1000);
			waiting = false;
		}
	},
};
