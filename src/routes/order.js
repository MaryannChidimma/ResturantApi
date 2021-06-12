const router = require("express").Router();
const { verifyPayment } = require("../middlewares/paymentMiddleware")
const orderCtrl = require("../controllers/order.controller")
const joiValidator = require("../validators/index")
const { authenticateUser, authenticateAdmin } = require("../middlewares/authMiddleware")

const {
    makeOrderSchema,
    filterOrderSchema,
    updateOrderSchema,
    orderIdSchema
} = require("../validators/order.schema");


module.exports = function () {

    router.post("/makeorder",
        authenticateUser,
        joiValidator(makeOrderSchema),
        verifyPayment,
        orderCtrl.makeOrder
    )

    router.get("/order",
        authenticateAdmin,
        joiValidator(filterOrderSchema),
        orderCtrl.getAll
    )

    router.patch("/order/update",
        authenticateAdmin,
        [
            joiValidator(orderIdSchema, "query"),
            joiValidator(updateOrderSchema),
        ],
        orderCtrl.updateOrder
    )
    router.delete("/order/delete",
        authenticateAdmin,
        joiValidator(orderIdSchema, "query"),
        orderCtrl.deleteOrder
    )


    return router;
};
