require("express-async-errors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const router = express.Router();
const rootRouter = require("./src/routes/index.js")(router);
const cors = require("cors");
const loggerMiddleware = require("./src/middlewares/loggerMiddleware");

const { ErrorHandler } = require("./src/middlewares/errorHandlerMiddleware");
const { NotFoundError } = require("./lib/appError");

/**
 * Middlewares go here for the application.
 * if it gets to cumbersome then we can move to seperate file
 *
 */

module.exports = (loggerConfig) => {
	const logger = loggerConfig.log();

	const loggerInstance = new loggerMiddleware(app, logger);

	app.use(compression());
	app.use(morgan("dev"));

	// shows requests log and add Error Handler Middleware
	loggerInstance.addMiddleWare();

	app.use(express.static("public"));
	app.use(express.json()); //for parsing application/json
	app.use(express.urlencoded({ extended: false })); //for parsing application/x-www-form-urlencoded
	app.use(cors());

	app.get("/status", (req, res, next) => {
		res.status(200).json({
			message: "Server is up and running",
		});
	});

	app.use("/api", rootRouter);

	// if route is not handled to the point, return a 404 error
	app.use((req, res, next) => {
		next(new NotFoundError());
	});

	// handle Errors Centrally in the error Middleware
	app.use(ErrorHandler);

	return app;
};
