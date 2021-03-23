const config = require("../bin/config/config");

const loggerConfig = require("../../bin/config/logger")[config.env];

class AppLogger {
	constructor() {
		this.logger = loggerConfig.log();
	}

	error() {}

	info() {}

	warn() {}

	debug() {}
}

module.exports = new AppLogger();
