const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller")
const joiValidator = require("../validators");
const { authSignUpSchema, authLoginSchema } = require("../validators/auth.schema")
const passport = require("passport");
require('../services/passport.service')

module.exports = function () {

    router.post(
        "/auth/login",
        joiValidator(authLoginSchema),
        authCtrl.login
    );

    router.post(
        "/auth/signup",
        joiValidator(authSignUpSchema),
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

    router.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        authCtrl.oAuth
    );


    return router;
};
