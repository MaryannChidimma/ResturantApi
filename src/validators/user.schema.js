const Joi = require("joi");

const updateUserSchema = Joi.object({
    fullName: Joi.string(),
    phoneNumber: Joi.string().min(10),
    image: Joi.string(),
    address: Joi.string(),

});

const trackOrderSchema = Joi.object({
    menu: Joi.string().regex(/^[0-9-FA-F]{24}$/),
    status: Joi.string(),
    deliveryDate: Joi.date(),
    deliveryType: Joi.string(),
    orderDate: Joi.string(),
})

module.exports = {
    updateUserSchema,
    trackOrderSchema,
};
