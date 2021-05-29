const Joi = require('joi')

const categoriesSchema = Joi.object({
    name: Joi.string().required(),
});
const updateCategoriesSchema = Joi.object({
    name: Joi.string()
})
const validateId = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

module.exports = {
    categoriesSchema,
    updateCategoriesSchema,
    validateId
}