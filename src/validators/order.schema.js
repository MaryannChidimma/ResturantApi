const Joi = require("joi");


const makeOrderSchema = Joi.object({
    transactionId: Joi.string().required(),
    user: Joi.string().regex(/^[0-9-FA-F]{24}$/),
    subTotal: Joi.number(),
    total: Joi.number(),
    discount: Joi.number(),
    shippingFee: Joi.number(),
    status: Joi.string(),
    orderItems: Joi.array().required(),
    address: Joi.string().required(),
    orderDate: Joi.date(),
    deliveryDate: Joi.date(),
    deliveryType: Joi.string(),


});

const filterOrderSchema = Joi.object({
    user: Joi.string().regex(/^[0-9-FA-F]{24}$/),
    menu: Joi.string().regex(/^[0-9-FA-F]{24}$/),
    status: Joi.string(),
    orderDate: Joi.date(),
    deliveryDate: Joi.date(),


})


module.exports = {
    makeOrderSchema,
    filterOrderSchema,

};


