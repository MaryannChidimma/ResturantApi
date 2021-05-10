const router = require("express").Router();
const CategoriesCtrl = require("../controllers/categories.controller")

module.exports = function () {

    router.post(
        "/categories",
        CategoriesCtrl.create
    );

    router.get(
        "/categories",
        CategoriesCtrl.getAll
    );


    return router;
};
