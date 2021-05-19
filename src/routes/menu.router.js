const router = require("express").Router();
const menuCtrl = require("../controllers/menu.controllers")
const joiValidator = require('../validators/index')
const { menuSchema, updateMenuSchema } = require('../validators/menu.schema')
const { authenticateAdmin } = require('../middlewares/authMiddleware')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function () {

    router.post(
        "/menu",
        authenticateAdmin,
        upload.single('image'),
        joiValidator(menuSchema),
        menuCtrl.create
    );

    router.get(
        "/menu",
        menuCtrl.getAll
    );

    router.get(
        "/menu/getOne",
        menuCtrl.getOne

    )

    router.patch(
        "/menu/update",
        authenticateAdmin,
        joiValidator(updateMenuSchema),
        menuCtrl.update
    )

    router.delete(
        "/menu/delete",
        authenticateAdmin,
        menuCtrl.delete
    )


    return router;
};
