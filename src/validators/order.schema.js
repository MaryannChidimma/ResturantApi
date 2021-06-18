const Joi = require("joi");


const makeOrderSchema = Joi.object({
    transactionId: Joi.string().required(),
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().min(10).required(),
    subTotal: Joi.number(),
    total: Joi.number(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.number(),
    discount: Joi.number(),
    shippingFee: Joi.number(),
    status: Joi.string(),
    orderItems: Joi.array().required(),
    address: Joi.string().required(),
    deliveryDate: Joi.date(),
    deliveryType: Joi.string(),


});

const filterOrderSchema = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    menu: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    status: Joi.string(),
    orderDate: Joi.date(),
    deliveryDate: Joi.date(),


})

const updateOrderSchema = Joi.object({
    status: Joi.string()
        .valid(
            "active",
            "pending",
            "accepted",
            "in Transit",
            "delivered",
            "cancelled",
        ),
    deliveryDate: Joi.date(),
    deliveryType: Joi.string(),
})

const orderIdSchema = Joi.object({
    id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .messages({ "string.pattern.base": "Order id is invalid" })
        .required(),
})


module.exports = {
    makeOrderSchema,
    filterOrderSchema,
    updateOrderSchema,
    orderIdSchema,
};


