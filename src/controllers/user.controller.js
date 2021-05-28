const userService = require("../services/user.service");
const appResponse = require("../../lib/appResponse");
const { ExpectationFailedError,BadRequestError } = require("../../lib/appError");
const { singleUpload } = require('../../lib/cloudinary')
const _ = require("lodash");

class userController {
	async getAll(req, res) {
		const users = await userService.find();
		res.send(appResponse("All users", users));
	}

	async updateUser(req, res) {
        const { fullName, phoneNumber, address } = req.body;
        if (!(fullName && phoneNumber && address))
        throw new ExpectationFailedError();
        
        let fileUpload = null;
        if(req.file){
            fileUpload = await singleUpload(req.file)
            if (!fileUpload) throw new BadRequestError("image upload failed")
        }
		
	
        const data ={ fullName, phoneNumber, address};
        if(fileUpload) data.image = fileUpload;

		const user = await userService.update(req.user._id, data );
		res.send(appResponse("Update sucessful", user));
	}
    
}

module.exports = new userController();
