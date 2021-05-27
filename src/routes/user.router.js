const router = require("express").Router();
const userCtrl = require('../controllers/user.controller')
const { authenticateAdmin,authenticateUser } = require('../middlewares/authMiddleware')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function () {

    router.get(
        "/user",
        authenticateAdmin,
        userCtrl.getAll
    );

    router.patch(
        "/user",
        authenticateUser,
        upload.single('image'),
        userCtrl.updateUser
    )

    return router;
};
