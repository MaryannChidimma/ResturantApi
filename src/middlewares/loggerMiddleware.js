const bunyan = require("bunyan");

//Load package.json
const pjs = require("../../package.json");

//Get meta data info from package.json
const { name, version } = pjs;

class loggerMiddleWare {
	constructor(app, logger) {
		this.app = app;
		this.logger = logger;
	}

	addMiddleWare() {
		if (this.app.get("env") === "development") {
			this.app.use((req, res, next) => {
				const timestamp = new Date(); // getting current timestamp
				this.logger.info(`${req.method}: ${req.url} @ ${timestamp}`);
				return next();
			});
		}
	}
}

module.exports = loggerMiddleWare;
