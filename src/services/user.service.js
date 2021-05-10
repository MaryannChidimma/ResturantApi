const { resetPassword } = require('../controllers/auth.controller');
const model = require('../models/user')
const mailer = require('../utils/mailer')

class modelService {
    async create(data) {
        return await model.create(data);
    }

    async findByEmail(email) {
        return await model.findOne({ email });
    }

    async findById(id) {
        return await model.findById(id);
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

module.exports = new modelService();

