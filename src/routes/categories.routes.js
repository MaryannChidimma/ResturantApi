const router = require("express").Router();
const CategoriesCtrl = require("../controllers/categories.controller")
const joiValidator = require('../validators/index')
const { categoriesSchema, updateCategoriesSchema, validateId } = require('../validators/categories.schema')
const multer = require('multer')
const { authenticateAdmin } = require('../middlewares/authMiddleware')
const upload = multer({ dest: "uploads/" })
module.exports = function () {

    router.post(
        "/categories",
        upload.single('image'),
        authenticateAdmin,
        joiValidator(categoriesSchema),
        CategoriesCtrl.create
    );

    router.get(
        "/categories",
        CategoriesCtrl.getAll
    );

    router.patch(
        "/categories/update",
        upload.single('image'),
        joiValidator(updateCategoriesSchema),
        joiValidator(validateId, "query"),
        CategoriesCtrl.update
    )

    router.delete(
        "/categories/delete",
        joiValidator(validateId, "query"),
        CategoriesCtrl.delete
    )


    return router;
};
