const appResponse = require("../../lib/appResponse");
const { BadRequestError, UnAuthorizedError } = require("../../lib/appError");
const adminService = require("../services/admin.services");
const { hashPassword, comparePassword, generateAdminToken } = require("../utils/authHandler");
const { randomPassword } = require("../utils/generatePassword")
const _ = require('lodash')

class AdminController {
    signup = async (req, res) => {
        if (req.admin.type === process.env.TYPE) {
            req.body.email = req.body.email.toLowerCase()

            const existingadmin = await adminService.findByEmail(req.body.email);
            if (existingadmin)
                throw new BadRequestError("This email is already registered");

            let generatePassword = randomPassword(10)
            const password = await hashPassword(generatePassword);

            const admin = await adminService.create({ ...req.body, password, createdBy: req.admin._id }, generatePassword);

            await adminService.sendPasswordMail(admin, generatePassword)
            res.send(
                appResponse("Admin created successfully", _.omit(admin._doc, ['password']))
            );
        }
        else {
            throw new UnAuthorizedError("Admin is not authorized to carry out this operation")
        }
    };

    login = async (req, res) => {
        req.body.email = req.body.email.toLowerCase()

        const validAdmin = await adminService.findByEmail(req.body.email);
        if (!validAdmin) throw new UnAuthorizedError("Invalid email or password");

        const validPassword = await comparePassword(
            req.body.password,
            validAdmin.password
        );
        if (!validPassword)
            throw new UnAuthorizedError("Invalid email or password");

        const authToken = generateAdminToken(validAdmin);
        const adminData = _.omit(validAdmin._doc, ['password', 'updatedAt', 'type'])
        res.send(
            appResponse("admin login successful", { ...adminData, authToken })
        );
    };

    getAll = async (req, res) => {
        const admins = await adminService.getAll()

        res.send(appResponse("all admin", admins))
    }

}

module.exports = new AdminController();
