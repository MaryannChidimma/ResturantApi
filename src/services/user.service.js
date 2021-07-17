
const User = require('../models/user');
const mailer = require('../utils/mailer')
const _ = require('lodash')

class userService {
    async create(data) {
        return await User.create(data);
    }

    async findByQuery(query) {
        return await User.findOne(query);
    }

    async find(query) {

        let limit = Number(query.limit) || 30;
        const page = Number(query.pageNumber) || 1

        const options = { page, limit, select: (['-password', '-updatedAt']) }
        query = _.omit(query, ["limit", "pageNumber"])

        return await User.paginate(query, options)

    }

    async update(query, updateQuery) {
        return await User.findOneAndUpdate(query, updateQuery, { new: true });
    }

    async resetPasswordMail(user, token) {
        return await mailer.mailComposer(
            user.email,
            "Reset Password",
            "resetPassword",
            {
                name: user.fullName,
                token
            }

        )
    }


}

module.exports = new userService();

