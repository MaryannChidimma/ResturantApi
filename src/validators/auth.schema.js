const Joi = require("joi");

const authSignUpSchema = Joi.object({
    fullName: Joi.string().required().min(2).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    authSignUpSchema,
    authLoginSchema,
};
