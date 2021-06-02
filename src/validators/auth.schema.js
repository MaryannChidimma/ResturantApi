const Joi = require("joi");

const authSignUpSchema = Joi.object({
    fullName: Joi.string().required().min(2).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().min(10).required(),
    image: Joi.string(),
    // address: Joi.string(),
});

const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    authSignUpSchema,
    authLoginSchema,
};
