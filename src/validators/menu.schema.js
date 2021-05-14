const Joi = require("joi");

const menuSchema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    description: Joi.string().required().min(2).max(255),
    price: Joi.number().required(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});


module.exports = {
    menuSchema,

};
