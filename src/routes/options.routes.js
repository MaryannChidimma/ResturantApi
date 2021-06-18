const router = require("express").Router();
const optionsCtrl = require("../controllers/options.controller")
const joiValidator = require('../validators/index')
const { optionsSchema, updateoptionsSchema, validateId, filterCategorySchema }
    = require('../validators/options.schema')
const multer = require('multer')
const { authenticateAdmin } = require('../middlewares/authMiddleware')
const upload = multer({ dest: "uploads/" })
module.exports = function () {

    router.post(
        "/options",
        upload.single('image'),
        authenticateAdmin,
        joiValidator(optionsSchema),
        optionsCtrl.create
    );

    router.get(
        "/options",
        joiValidator(filterCategorySchema, "query"),
        optionsCtrl.getAll
    );

    router.patch(
        "/options/update",
        upload.single('image'),
        joiValidator(updateoptionsSchema),
        joiValidator(validateId, "query"),
        optionsCtrl.update
    )

    router.delete(
        "/options/delete",
        joiValidator(validateId, "query"),
        optionsCtrl.delete
    )


    return router;
};
