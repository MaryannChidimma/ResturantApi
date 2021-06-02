const Joi = require("joi");

const updateUserSchema = Joi.object({
    fullName: Joi.string(),
    phoneNumber: Joi.string().min(10),
    image: Joi.string(),
    address: Joi.string(),

});

module.exports = {
    updateUserSchema
};
