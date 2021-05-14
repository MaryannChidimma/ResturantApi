const Joi = require('joi')

const categoriesSchema = Joi.object({
    name: Joi.string().required(),
});

module.exports = {
    categoriesSchema
}