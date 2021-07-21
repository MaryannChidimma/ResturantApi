const router = require("express").Router();
const contactUsCtrl = require("../controllers/contactUs.controller")
const joiValidator = require("../validators");
const { authenticateAdmin } = require("../middlewares/authMiddleware")
const { messageSchema, replySchema } = require("../validators/contactUs.schema")


module.exports = function () {

    router.post(
        "/contactus",
        joiValidator(messageSchema),
        contactUsCtrl.create
    );

    router.get(
        "/contactus",
        contactUsCtrl.getAll
    );

    router.post(
        "/contactus/reply",
        authenticateAdmin,
        joiValidator(replySchema),
        contactUsCtrl.replyMessages
    )

    router.delete(
        "/contactus/delete",
        contactUsCtrl.delete
    )


    return router;
};
