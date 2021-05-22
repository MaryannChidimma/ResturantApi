const router = require("express").Router();
const userCtrl = require('../controllers/user.controller')

module.exports = function () {

    router.get(
        "/user",
        userCtrl.getAll
    );


    return router;
};
