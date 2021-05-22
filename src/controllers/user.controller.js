const userService = require("../services/user.service")
const appResponse = require("../../lib/appResponse")
const _ = require("lodash")

class userController {
    async getAll(req, res) {
        const users = await userService.find();
        res.send(appResponse("All users", users))
    }
}

module.exports = new userController()