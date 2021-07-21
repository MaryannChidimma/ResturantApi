const router = require("express").Router();
const contactUsCtrl = require("../controllers/contactUs.controller")
const joiValidator = require("../validators");
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
        joiValidator(replySchema),
        contactUsCtrl.replyMessages
    )

    router.delete(
        "/contactus/delete",
        contactUsCtrl.delete
    )


    return router;
};
