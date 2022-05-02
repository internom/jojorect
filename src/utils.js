const config = require("./config.json");
const chalk = require("chalk");
const moment = require("moment");

/**
 * @param {String} content
 * @param {Boolean} timeLog
 */
const log = (content, timeLog) => {
	const timestamp = `[${moment().format("DD.MM.YYYY HH:mm")}]`;
	let ctx = timeLog ? `${timestamp} ${content}` : content;

	const colors = ctx.match(/(?<!\$)\{[^}]*\}/gi);

	if (colors) {
		colors.forEach((e) => {
			const e2 = e.match(/(?<=(?<!\$){)[^}]+(?=})/gi).join("");
			ctx = ctx.split(e).join(chalk.hex(e2.split(":")[0])(e2.split(":")[1]));
		});
	}

	return console.log(ctx);
};

const debug = (content) => log(`({#9146FF:Debug}) ${content}`, true);

const sleep = (ms = 2000) => new Promise((done) => setTimeout(done, ms));

const randomInt = (min = 1, max = 10) => Math.floor(Math.random() * (max - min + 1) + min); // min, max included

const randomHex = () => Math.floor(Math.random() * 16777215).toString(16);

module.exports = {
	log,
	debug,
	sleep,
	randomInt,
	randomHex,
};
