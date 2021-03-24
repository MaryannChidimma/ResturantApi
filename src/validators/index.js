const Joi = require("joi");
const { BadRequestError } = require("../../lib/appError");

module.exports = (schema, source = "body") => (req, res, next) => {
	const result = validate(req[source] || {}, schema);
	if (result) {
		throw new BadRequestError(result[0]);
	}

	next();
};

function validate(data, schema) {
	const result = schema.validate(data);
	if (result.error == null) {
		return;
	} else {
		return result.error.details.map((error) => error.message);
	}
}
