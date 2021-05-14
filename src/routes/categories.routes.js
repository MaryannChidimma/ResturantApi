const router = require("express").Router();
const CategoriesCtrl = require("../controllers/categories.controller")
const joiValidator = require('../validators/index')
const { categoriesSchema } = require('../validators/categories.schema')

module.exports = function () {

    router.post(
        "/categories",
        joiValidator(categoriesSchema),
        CategoriesCtrl.create
    );

    router.get(
        "/categories",
        CategoriesCtrl.getAll
    );


    return router;
};
