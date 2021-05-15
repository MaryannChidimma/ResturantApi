const router = require("express").Router();
const CategoriesCtrl = require("../controllers/categories.controller")
const joiValidator = require('../validators/index')
const { categoriesSchema } = require('../validators/categories.schema')
const multer = require('multer')
const upload = multer({ dest: "uploads/" })
module.exports = function () {

    router.post(
        "/categories",
        upload.single('image'),
        joiValidator(categoriesSchema),
        CategoriesCtrl.create
    );

    router.get(
        "/categories",
        CategoriesCtrl.getAll
    );


    return router;
};
