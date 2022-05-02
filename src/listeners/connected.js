const utils = require("../utils");
const config = require("../config.json");

module.exports = async (client) => {
	if (config.debugMode) utils.log(`({#00cc66:Started}) ${client.getUsername()} is now online!`, true);
};
