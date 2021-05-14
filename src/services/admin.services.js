const model = require("../models/admin");
const jwt = require("jsonwebtoken");

class adminService {
    async create(data) {
        return await model.create(data);
    }

    async findByEmail(email) {
        return await model.findOne({ email });
    }
    async find(id) {
        return await model.findById(id);
    }

    async generateAuthToken(admin, expiresIn = "24h") {
        return jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn }
        );
    }
}

module.exports = new adminService();
