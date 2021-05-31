const router = require("express").Router();

const adminController = require("../controllers/admin.controllers");
const joiValidator = require("../validators");
const { authenticateAdmin } = require("../../src/middlewares/authMiddleware");

const {
    adminSignUpSchema,
    adminLoginSchema,
} = require("../validators/admin.schema");

module.exports = function () {
    router.post(
        "/admin/login",
        joiValidator(adminLoginSchema),
        adminController.login
    );

    router.post(
        "/admin/signup",
        authenticateAdmin,
        joiValidator(adminSignUpSchema),
        adminController.signup
    );

    router.get(
        "/admin",
        authenticateAdmin,
        adminController.getAll
    );

    return router;
};
