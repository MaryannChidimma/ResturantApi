const userService = require("../services/user.service");
const appResponse = require("../../lib/appResponse");
const { BadRequestError } = require("../../lib/appError");
const { singleUpload } = require("../../lib/cloudinary");
const orderService = require("../services/order.service");
const _ = require("lodash");

class userController {
	async getAll(req, res) {
		const users = await userService.find(req.query);

		res.send(appResponse("All users", users));
	}

	async updateUser(req, res) {
		const data = { ...req.body };

		if (req.file) {
			let fileUpload = await singleUpload(req.file);
			if (!fileUpload) throw new BadRequestError("image upload failed");
			data.image = fileUpload;
		}

		const user = await userService.update(req.user._id, data);
		res.send(appResponse("Update sucessful", user));
	}

	async trackUsersOrder(req, res) {
		const q =
			req.query.status === "active"
				? {
						$and: [
							{ user: req.user._id },
							{ status: { $ne: "delivered" } },
							{ status: { $ne: "cancelled" } },
						],
				  }
				: { user: req.user._id, ...req.query };
		const userOrder = await orderService.find(q, true);
		res.send(appResponse("user order details gotten successfully", userOrder));
	}
}

module.exports = new userController();
