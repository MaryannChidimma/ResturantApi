const model = require("../models/admin");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/mailer")

class adminService {
    async create(data) {
        return await model.create(data);
    }

    async findByEmail(email) {
        return await model.findOne({ email });
    }
    async getAll() {
        return await model.find({}).select(['-password', '-updatedAt', '-type']);
    }

    async sendPasswordMail(admin, password) {
        return await mailer.mailComposer(
            admin.email,
            "eva-kitchen Password",
            "adminLoginPassword",
            {
                name: admin.fullName,
                token: "",
                password: password
            }

        )
    }

    async delete(id) {
        return await model.remove({ _id: id })
    }

}


module.exports = new adminService();
