const router = require("express").Router();
const userCtrl = require('../controllers/user.controller')
const { authenticateAdmin, authenticateUser } = require('../middlewares/authMiddleware')
const joiValidator = require('../validators/index')
const { updateUserSchema, trackOrderSchema } = require('../validators/user.schema')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = function () {

    router.get(
        "/user",
        authenticateAdmin,
        userCtrl.getAll
    );

    router.patch(
        "/user/update",
        authenticateUser,
        upload.single('image'),
        joiValidator(updateUserSchema),
        userCtrl.updateUser
    )

    router.get(
        "/user/order",
        authenticateUser,
        joiValidator(trackOrderSchema),
        userCtrl.trackUsersOrder
    )
    return router;
};
