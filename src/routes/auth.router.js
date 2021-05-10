const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller")

module.exports = function () {

    router.post(
        "/login",
        authCtrl.login
    );

    router.post(
        "/signup",
        authCtrl.signup
    );

    router.post(
        "/reset-password-mail",
        authCtrl.resetPasswordMail
    )
    router.patch(
        "/reset-password",
        authCtrl.resetPassword
    )


    return router;
};
