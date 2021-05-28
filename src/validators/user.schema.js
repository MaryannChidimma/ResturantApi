const Joi = require("joi");

const updateUserSchema = Joi.object({
    fullName: Joi.string(),
    LastName: Joi.string(),
    phoneNumber: Joi.string().min(10)
});

module.exports = {
    updateUserSchema
};
