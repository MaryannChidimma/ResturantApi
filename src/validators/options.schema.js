const Joi = require('joi')

const optionsSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
});
const updateoptionsSchema = Joi.object({
    name: Joi.string(),
    price: Joi.string(),
    isAvailable: Joi.boolean(),
})
const validateId = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})
const filterCategorySchema = Joi.object({
    name: Joi.string(),
});
module.exports = {
    optionsSchema,
    updateoptionsSchema,
    validateId,
    filterCategorySchema
}