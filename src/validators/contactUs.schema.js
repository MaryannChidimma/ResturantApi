const Joi = require("joi");

const messageSchema = Joi.object({
    fullName: Joi.string().required().min(2).max(255),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),

});

const replySchema = Joi.object({
    email: Joi.string().email().required(),
    message: Joi.string().required(),
});

module.exports = {
    messageSchema,
    replySchema
};
