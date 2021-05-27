const router = require("express").Router();
const menuCtrl = require("../controllers/menu.controllers")
const joiValidator = require('../validators/index')
const { menuSchema, updateMenuSchema, filterMenuSchema } = require('../validators/menu.schema')
const { authenticateAdmin } = require('../middlewares/authMiddleware')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function () {

    router.post(
        "/menu",
        //authenticateAdmin,
        upload.single('image'),
        joiValidator(menuSchema),
        menuCtrl.create
    );

    router.get(
        "/menu",
        joiValidator(filterMenuSchema, "query"),
        menuCtrl.getAll
    );

    router.get(
        "/menu/getOne",
        menuCtrl.getOne

    )

    router.get(
        "/menu/getPopular",
        menuCtrl.getPopular
    )

    router.patch(
        "/menu/update",
        authenticateAdmin,
        joiValidator(updateMenuSchema),
        menuCtrl.update
    )

    router.post(
        "/menu/rating",
        menuCtrl.ratings
    )

    router.delete(
        "/menu/delete",
        authenticateAdmin,
        menuCtrl.delete
    )


    return router;
};
