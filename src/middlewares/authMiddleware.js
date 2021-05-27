const userService = require('../services/user.service')
const adminService = require('../services/admin.services')
const { UnAuthorizedError } = require("../../lib/appError");
const { verifyAuthToken } = require('../utils/authHandler')


exports.authenticateUser = async function (req, res, next) {
    const token = req.headers["x-auth-token"]
    if (!token) throw new UnAuthorizedError
    
    try {
        const decodedUser = await verifyAuthToken(token)
        const user = await userService.findByEmail(decodedUser.email)
        if (!user) throw new UnAuthorizedError()

        req.user = user
        next()

    } catch (err) {
        const errs = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
        if (errs.includes(err?.name)) {
            throw new UnAuthorizedError();
        }
        next(err);
    }
};


exports.authenticateAdmin = async function (req, res, next) {
    const token = req.headers["x-auth-token"]

    if (!token) throw new UnAuthorizedError

    try {
        const decodedAdmin = await verifyAuthToken(token)
        const admin = await adminService.findByEmail(decodedAdmin.email)
        if (!admin) throw new UnAuthorizedError()

        req.admin = admin
        next()

    } catch (error) {
        const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
        if (errors.includes(error?.name)) {
            throw new UnAuthorizedError();
        }
        next(error);
    }
}

exports.authorize = function (req, res, next) {
    //Logic fot authorization goes in here    
}