const appResponse = require("../../lib/appResponse");
const { BadRequestError, UnAuthorizedError } = require("../../lib/appError");
const adminService = require("../services/admin.services");
const { hashPassword, comparePassword, generateToken } = require("../utils/authHandler");

class AdminController {
    signup = async (req, res) => {
        const existingadmin = await adminService.findByEmail(req.body.email);
        if (existingadmin)
            throw new BadRequestError("This email is already registered");

        req.body.password = await hashPassword(req.body.password);

        await adminService.create({ ...req.body, createdBy: req.admin._id });
        res.send(appResponse("admin created successfully"));
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
        res.send(appResponse("admin login successful", { authToken }));
    };
}

module.exports = new AdminController();
