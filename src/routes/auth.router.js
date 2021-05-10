const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller")

module.exports = function () {

    router.post(
        "/auth/login",
        authCtrl.login
    );

    router.post(
        "/auth/signup",
        authCtrl.signup
    );

    router.post(
        "/auth/reset-password-mail",
        authCtrl.resetPasswordMail
    )
    router.patch(
        "/auth/reset-password",
        authCtrl.resetPassword
    )


    return router;
};
