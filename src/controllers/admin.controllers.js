const appResponse = require("../../lib/appResponse");
const { BadRequestError, UnAuthorizedError } = require("../../lib/appError");
const adminService = require("../services/admin.services");
const { hashPassword, comparePassword, generateToken } = require("../utils/authHandler");
const _ = require('lodash')

class AdminController {
    signup = async (req, res) => {
        const existingadmin = await adminService.findByEmail(req.body.email);
        if (existingadmin)
            throw new BadRequestError("This email is already registered");

        req.body.password = await hashPassword(req.body.password);

        const admin = await adminService.create({ ...req.body, createdBy: req.admin._id });
        res.send(
            appResponse("Admin created successfully", _.omit(admin._doc, ['password']))
        );
    };

    login = async (req, res) => {
        const validAdmin = await adminService.findByEmail(req.body.email);
        if (!validAdmin) throw new UnAuthorizedError("Invalid email or password");

        const validPassword = await comparePassword(
            req.body.password,
            validAdmin.password
        );
        if (!validPassword)
            throw new UnAuthorizedError("Invalid email or password");

        const authToken = generateToken(validAdmin);
        const adminData = _.omit(validAdmin._doc, ['password', 'updatedAt'])
        res.send(
            appResponse("admin login successful", { ...adminData, authToken })
        );
    };
}

module.exports = new AdminController();
