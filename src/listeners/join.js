const utils = require("../utils");
const config = require("../config.json");

module.exports = async (client, channel) => {
	if (config.debugMode) utils.debug(`Joined the ${channel} channel.`);
};
