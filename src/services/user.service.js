
const model = require('../models/user');
const mailer = require('../utils/mailer')
const _ = require('lodash')

class userService {
    async create(data) {
        return await model.create(data);
    }

    async findByEmail(email) {
        return await model.findOne({ email });
    }

    async find(query) {

        let limit = Number(query.limit) || 10;
        const page = Number(query.pageNumber) || 1

        const options = { page, limit, select: (['-password', '-updatedAt']) }
        query = _.omit(query, ["limit", "pageNumber"])

        return await model.paginate(query, options)

    }
    async update(id, updateQuery) {
        return await model.findByIdAndUpdate(id, updateQuery, { new: true });
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

