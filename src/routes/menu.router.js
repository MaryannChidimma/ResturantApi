const router = require("express").Router();
const menuCtrl = require("../controllers/menu.controllers")
const joiValidator = require('../validators/index')
const { menuSchema } = require('../validators/menu.schema')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function () {

    router.post(
        "/menu",
        upload.single('image'),
        joiValidator(menuSchema),
        menuCtrl.create
    );

    router.get(
        "/menu",
        menuCtrl.getAll
    );


    return router;
};
