const router = require("express").Router();
const userCtrl = require('../controllers/user.controller')
const { authenticateAdmin } = require('../middlewares/authMiddleware')

module.exports = function () {

    router.get(
        "/user",
        authenticateAdmin,
        userCtrl.getAll
    );


    return router;
};
