const userService = require("../services/user.service");
const appResponse = require("../../lib/appResponse");
const { BadRequestError } = require("../../lib/appError");
const { singleUpload } = require('../../lib/cloudinary')
const _ = require("lodash");

class userController {
    async getAll(req, res) {
        const users = await userService.find(req.query);

        res.send(appResponse("All users", users));
    }

    async updateUser(req, res) {

        const data = { ...req.body }

        if (req.file) {
            let fileUpload = await singleUpload(req.file)
            if (!fileUpload) throw new BadRequestError("image upload failed")
            data.image = fileUpload
        }

        const user = await userService.update(req.user._id, data);
        res.send(appResponse("Update sucessful", user));
    }

}

module.exports = new userController();
