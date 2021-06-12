const Joi = require("joi");


const menuSchema = Joi.object({
    name: Joi.string().required().min(2).max(255),
    description: Joi.string().required().min(2).max(255),
    price: Joi.number().required(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    discount: Joi.string(),
});

const updateMenuSchema = Joi.object({
    name: Joi.string().min(2).max(255),
    description: Joi.string().min(2).max(255),
    price: Joi.number(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    discount: Joi.string(),
})

const filterMenuSchema = Joi.object({
    search:Joi.string(),
    category: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    limit: Joi.string(),
    pageNumber: Joi.string(),

})


module.exports = {
    menuSchema,
    updateMenuSchema,
    filterMenuSchema
};
