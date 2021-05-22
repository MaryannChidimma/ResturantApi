
const model = require('../models/user');
const { hashPassword } = require('../utils/authHandler');
const mailer = require('../utils/mailer')

class userService {
    async create(data) {
        return await model.create(data);
    }

    async findByEmail(email) {
        return await model.findOne({ email });
    }

    async find(id) {
        return await model.find({}).select(['-password', '-googleId']);
    }
    async update(id, updateQuery) {
        return await model.findByIdAndUpdate(id, updateQuery);
    }

    async resetPasswordMail(user, token) {
        return await mailer.mailComposer(
            user.email,
            "Reset Password",
            "resetPassword",
            {
                name: user.firstName + " " + user.lastName,
                token
            }

        )
    }


}

module.exports = new userService();

