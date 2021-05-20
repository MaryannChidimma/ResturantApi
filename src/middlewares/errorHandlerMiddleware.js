const mongoose = require("mongoose");
const mongooseValidationError = mongoose.Error.ValidationError;
const isProduction = process.env.NODE_ENV === "production";
const appResponse = require("../../lib/appResponse");

const errorNames = [
	"CastError",
	"JsonWebTokenError",
	"ValidationError",
	"SyntaxError",
	"MongooseError",
	"MongoError",
];

module.exports.ErrorHandler = function (error, req, res, next) {
	if (error.name === "eva-kitchenError" || error.isOperational) {
		return res
			.status(error.statusCode)
			.send(appResponse(error.message, null, false));
	}

	if (error instanceof mongooseValidationError) {
		const errorMessages = Object.values(error.errors).map((e) => e.message);
		return res
			.status(400)
			.send(
				appResponse(
					"validation error occurred check your inputs for corrections",
					null,
					errorMessages
				)
			);
	}

	if (error.hasOwnProperty("name") && error.name === "MongoError") {
		const data = error && error.errmsg ? error.errmsg : null;
		return res
			.status(400)
			.send(appResponse("the entry already exist", data, false));
	}

	if (errorNames.includes(error.name)) {
		return res.status(400).send(appReponse(error.message, null, false));
	}

	// log error
	console.error(error);

	const message = isProduction
		? "An unexpected error has occured. Please, contact the administrator"
		: error.message;

	return res.status(500).send(appResponse(message, null, false));
};
