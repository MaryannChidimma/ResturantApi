const router = require("express").Router();
const { verifyPayment } = require("../middlewares/paymentMiddleware")
const orderCtrl = require("../controllers/order.controller")
const joiValidator = require("../validators/index")
const { makeOrderSchema, filterOrderSchema } = require("../validators/order.schema");
const { authenticateUser } = require("../middlewares/authMiddleware")

module.exports = function () {

    router.post("/makeorder",
        authenticateUser,
        joiValidator(makeOrderSchema),
        verifyPayment,
        orderCtrl.makeOrder
    )

    router.get("/order",
        joiValidator(filterOrderSchema),
        orderCtrl.getAll
    )



    return router;
};
